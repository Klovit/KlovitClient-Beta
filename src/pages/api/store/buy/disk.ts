import type { APIRoute } from "astro";
import { supabase } from "../../../../lib/supabase";
import chalk from "chalk";
import db from '../../../../database';
import { Response } from "node-fetch";
import config from '../../../../config';
import { ExpressRoute } from '../../../lib/endpoints';
import doubleCsrfProtection from "../../../../middleware";
import restype from "src/restype";

const router = new ExpressRoute();
router.use(doubleCsrfProtection)

export const POST: APIRoute = async function POST({ request, cookies, redirect }) {
  // Session Validation.
const accessToken = cookies.get("sb-access-token");
const refreshToken = cookies.get("sb-refresh-token");
if (!accessToken || !refreshToken) {
  return redirect("/auth/signin");
}
const { data, error } = await supabase.auth.setSession({
  refresh_token: refreshToken.value,
  access_token: accessToken.value,
});
if (error) {
console.log(error)
return redirect("/auth/signin")
}
// Fetching data from SupaBase and giving it an identifier.
const {
  data: { user },
} = await supabase.auth.getUser()
const metadata = user.user_metadata
const username = metadata.full_name
const email = data?.user?.email
const resconf = restype.restype
 
// Getting data from Request
const formData = await request.formData();
const amount = formData.get("amount")?.toString()
if (amount) {
try {
  const currentinfo = await db.get("user-" + email)
  const number = Number(amount) / config.coins.store.disk.per
  const cost = config.coins.store.disk.cost * number
  const oldbalance = currentinfo.balance
  if (oldbalance < cost) {
      return redirect(`/store?error=You have insufficient Coins`)
  } else {
  const newbalance = oldbalance - cost
  let extra;
  extra = ('extraresources' in currentinfo && 
    'ram' in currentinfo.extraresources &&
    'disk' in currentinfo.extraresources &&
    'cpu' in currentinfo.extraresources &&
    'servers' in currentinfo.extraresources) 
  ? currentinfo.extraresources 
  : { ram: 0, disk: 0, cpu: 0, servers: 0 };
  const newextradisk = +extra.disk + +amount
  const newextra = {
    ram: extra.ram,
    disk: newextradisk,
    cpu: extra.cpu,
    servers: extra.servers 
  }
    const newinfo = {
    package: currentinfo.package,
    balance: newbalance,
    permission: currentinfo.permssion,
    invoices: currentinfo.invoices,
    tickets: currentinfo.tickets,
    servers: currentinfo.servers,
    password: currentinfo.password,
    extraresources: newextra
  } 
  await db.set("user-" + email, newinfo)
    return redirect(`/store?success=You have successfully bought ${amount} ${resconf} Disk for ${cost} Coins`)
    }
}
catch(err) {
  console.log(err)
  return redirect(`/store?error=` + err);
}
} else {
  return redirect(`/store?error=A Field is missing.`);
}
}


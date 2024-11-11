import type { APIRoute } from "astro";
import db from '../../../database';
import config from '../../../config';
import { supabase } from "../../../lib/supabase";
import { ExpressRoute } from '../../../lib/endpoints';
import doubleCsrfProtection from "../../../middleware";
import restype from "src/restype";

const router = new ExpressRoute();
router.use(doubleCsrfProtection)

export const POST: APIRoute = async function POST({ request, cookies, redirect }) {

const installed = await db.get("installed")

if (installed == true) {
  return redirect('/?error=KlovitClient is already Installed')
}

const formData = await request.formData();
const token = formData.get("token")?.toString()
const firstname = formData.get("firstname")?.toString()
const lastname = formData.get("lastname")?.toString()
const username = formData.get("username")?.toString()
const email = formData.get("email")?.toString()
const password = formData.get("password")?.toString()
const confirmpassword = formData.get("confirmpassword")?.toString()
const starttoken = await db.get("starttoken")
if (token != starttoken) {
  return redirect("/installer/start?error=Invalid Token.")
}

if (password != confirmpassword) {
  return redirect("/installer/finish?token=" + token + "&error=Passwords do not match.")
}



const config_website = await db.get("config_website");
const config_currencyandstore = await db.get("config_currencyandstore");
const config_packages = await db.get("config_packages");

const config_nodesandeggs = {
  locations: {
    "1": {
      name: "Default Location 1",
      package: null,
    },
  },
  eggs: {
    klovitegg: {
      display: "MultiEgg | KlovitEgg",
      image: "https://i.imgur.com/zqGM5VI.png",
      limits: {
        minimum: { ram: 1, disk: 1, cpu: 1 },
        maximum: { ram: null, disk: null, cpu: null },
        feature: { databases: 1, backups: 1, allocations: 1 },
      },
      info: {
        egg: 15,
        docker_image: "ghcr.io/beastgamer81/klovitegg:latest",
        startup: "./install.sh\"",
        environment: {
          NODE_VERSION: "latest",
          PMMP_VERSION: "PM5",
          NODE_MAIN_FILE: "index.js",
          HIBERNATE_STATUS: "true",
        },
      },
    },
  },
};

const config = {
  ...config_website,
  ...config_currencyandstore,
  ...config_nodesandeggs,
  ...config_packages,
};
const fullname = `${firstname} ${lastname}`
const { error } = await supabase.auth.signUp({
  email,
  password,
  options: {
    data: {
      first_name: firstname,
      last_name: lastname,
      full_name: fullname,
      avatar: "https://i.imgur.com/zqGM5VI.png"
    },
  },
});

if (error) {
  return redirect(`/installer/finish?token=${token}&error=${error.message}`);
}

    let accountjson = await fetch(
      config.pterodactyl.url + "/api/application/users",
      {
        method: "post",
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${config.pterodactyl.api}`
        },
        body: JSON.stringify({
          username: username,
          email: email,
          first_name: firstname,
          last_name: lastname,
          password: password
        })
      }
    );
      let accountlistjson = await fetch(
        config.pterodactyl.url + "/api/application/users?include=servers&filter[email]=" + encodeURIComponent(email),
        {
          method: "get",
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${config.pterodactyl.api}`
          }
        }
      );
      let currentinfo = await db.get("user-" + email);
      let info;
  
      if (typeof currentinfo == "object") {
          info = currentinfo;
      } else {
          info = {
            package: config.packages.default,
            balance: 0,
            permission: 10,
            invoices: {},
            tickets: {},
            servers: {},
            password: password,
            extraresources: {
              ram: 0,
              disk: 0,
              cpu: 0,
              servers: 0
            }
          }
      }
      let accountlist = await accountlistjson.json();
      let user = accountlist.data.filter(acc => acc.attributes.email == email);
      if (user.length == 1) {
          await db.set("user-" + email, info);
        }
       else {
        console.log(`An error has occured when attempting to create ${email}'s account account.`);
        return redirect("/installer/finish?error=`An error has occured when attempting to create ${email}'s account account.&token=" + token)
      };
      await db.set("installed", true)
      await db.set("config", config)
      return redirect("/signin?success=Successfully installed KlovitClient")
      
}
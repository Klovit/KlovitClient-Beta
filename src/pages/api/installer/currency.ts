import { APIRoute } from 'astro';
import chalk from "chalk";
import db from '../../../database';
import { Response } from "node-fetch";
import { ExpressRoute } from '../../../lib/endpoints';
import doubleCsrfProtection from "../../../middleware";

const router = new ExpressRoute();
router.use(doubleCsrfProtection)
export const POST: APIRoute = async function POST({ request, cookies, redirect }) {
// Getting data from Request
const formData = await request.formData();
const token = formData.get("token")?.toString()
const gifting = formData.get("gifting")
const coins = formData.get("coinsenabled")
const store = formData.get("storenabled")
const ramprice = formData.get("ram")?.toString()
const cpuprice = formData.get("cpu")?.toString()
const storageprice = formData.get("storage")?.toString()
const slotsprice = formData.get("slots")?.toString()
const pcoinsprice = formData.get("pcoinsprice")?.toString()
const pcoins = formData.get("pcoinsenabled")?.toString()
const payments = formData.get("payments")
const currency_code = formData.get("currency_code")

if (await db.get("installed") === true) {
    return redirect(`/?error=KlovitClient is already installed.`)
}
const config_website = await db.get("config_website")
const restype = config_website.resource_type
let perramdisk;
let percpu;
if (restype === "GB") {
    perramdisk = 1
    percpu = 1
} else if (restype === "MB") {
    perramdisk = 1024
    percpu = 100
} else {
    perramdisk = 1
    percpu = 1
}
// Verifying token
const starttoken = await db.get("starttoken")
if (token != starttoken) {
    return redirect("/installer/start?error=Invalid Token")
}
const trueboolean = true
const falseboolean = false
let giftingenabled;
let storenabled;
let paymentsenabled;
let pcoinsenabled;
let coinsenabled;
if (gifting === "on") {
  giftingenabled = true
} else {
  giftingenabled = false
}
if (payments === "on") {
  paymentsenabled = true
} else {
  paymentsenabled = false
}
if (coins === "on") {
  coinsenabled = true
  if (store === "on") {
    storenabled = true
  } else {
    storenabled = false
  }
  if (pcoins === "on") {
    pcoinsenabled = true
  } else {
    pcoinsenabled = false
  }
} else {
    coinsenabled = false
    storenabled = false
    pcoinsenabled = false
}

const config_currencyandstore = {
    "gifting": {
      "enabled": giftingenabled
    },
    "coins": {
      "enabled": coinsenabled,
      "earn": {
        "enabled": false,
        "links": {
          "atglinks": {
            "enabled": false,
            "api": "XXXXXXXXXXX",
            "amount": "5",
            "dailylimit": null,
            "minimumTime": "100"
          }
        }
      },
      "store": {
        "enabled": storenabled,
        "ram": {
          "cost": ramprice,
          "per": perramdisk
        },
        "disk": {
          "cost": storageprice,
          "per": perramdisk
        },
        "cpu": {
          "cost": cpuprice,
          "per": percpu
        },
        "servers": {
          "cost": slotsprice,
          "per": 1
        },
        "coins": {
          "cost": pcoinsprice,
          "per": 100
        }
      }
    },
    "payments": {
        "enabled": paymentsenabled,
        "methods": {
            "paypal": {
                "email": "user@example.com"
            }
        },
        "coins": {
            "enabled": pcoinsenabled,
            "price": pcoinsprice
        }
    }
  }
  console.log(config_currencyandstore)
await db.set("config_currencyandstore", config_currencyandstore)

return redirect(`/installer/finish?token=${token}`)
};

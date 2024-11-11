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
const kcname = formData.get("kcname")?.toString()
const resource_type = formData.get("resource_type")?.toString()
const website_url = formData.get("website_url")?.toString()
const website_description = formData.get("website_description")?.toString()
const website_logo = formData.get("website_logo")?.toString()
const pterodactyl_url = formData.get("pterodactyl_url")?.toString()
const pterodactyl_api = formData.get("pterodactyl_api")?.toString()
const pterodactyl_client_api = formData.get("pterodactyl_client_api")?.toString()
const supabase_url = formData.get("supabase_url")?.toString()
const supabase_key = formData.get("supabase_key")?.toString()
const google_oauth = formData.get("google_oauth")?.toString() ?? false
const github_oauth = formData.get("github_oauth")?.toString() ?? false
const discord_oauth = formData.get("discord_oauth")?.toString() ?? false

if (await db.get("installed") === true) {
    return redirect(`/?error=KlovitClient is already installed.`)
}

// Verifying token
const starttoken = await db.get("starttoken")
if (token != starttoken) {
    return redirect("/installer/start?error=Invalid Token")
}

function makeid(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;  
    }
    let website_secret = null;
    website_secret = makeid(8);
let google_oauthenabled;
let discord_oauthenabled;
let github_oauthenabled;
if (google_oauth === "on") {
  google_oauthenabled = true
} else {
  google_oauthenabled = false
}
if (discord_oauth === "on") {
  discord_oauthenabled = true
} else {
  discord_oauthenabled = false
}
if (github_oauth === "on") {
  github_oauthenabled = true
} else {
  github_oauthenabled = false
}

const blacklisted_users = []
console.log(resource_type)
const config_website = {
    "name": kcname,
    "resource_type": resource_type,
    "website": {
      "secret": website_secret,
      "url": website_url,
      "description": website_description,
      "icon": website_logo
    },
  "pterodactyl": {
    "url": pterodactyl_url,
    "api": pterodactyl_api,
    "client_api": pterodactyl_client_api
  },
  "blacklist": {
    "enabled": false,
    "users": blacklisted_users,
    "discord": {
      "enabled": false,
      "servers": []
    }
  },
  "auth": {
    "supabase": {
      "supabase_url": supabase_url,
      "supabase_anon_key": supabase_key,
      "oauth2": {
        "google": {
          "enabled": google_oauthenabled
        },
        "github": {
          "enabled": github_oauthenabled
        },
        "discord": {
          "enabled": discord_oauthenabled,
          "bot": {
            "enabled": false,
            "token" : "Discord Bot Token here",
            "force_join": {
              "enabled": false,
              "servers": ["server1", "server2"]
            },
            "role_packages": {
              "enabled": false,
              "list": {
                "role_id": "package"
              }
            }
          }
        }
      }
    }
}
}
await db.set("config_website",config_website)

return redirect(`/installer/packages?token=${token}`)
};

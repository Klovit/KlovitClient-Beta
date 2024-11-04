import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";
import db from '../../../database';
import type { Provider } from "@supabase/supabase-js";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const formData = await request.formData();
  const rawusername = formData.get("username")?.toString();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const provider = formData.get("provider")?.toString();
  const config = await db.get("config")
  
  const discordScopes = ["identify", "email"];
  if (config.blacklist.enabled) {
    discordScopes.push("guilds");
  }
  if (config.auth.forcejoin.enabled) {
    discordScopes.push("guilds.join");
  }

  const validProviders: Provider[] = [];
  if (config.auth.supabase.oauth2.google.enabled) validProviders.push("google");
  if (config.auth.supabase.oauth2.discord.enabled) validProviders.push("discord");
  if (config.auth.supabase.oauth2.github.enabled) validProviders.push("github");

  if (provider && validProviders.includes(provider as Provider)) {
    const options = {
      redirectTo: `${config.website.url}/api/auth/callback`,
    };
    
    if (provider === "discord") {
      options["scopes"] = discordScopes.join(" ");
    }

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider as Provider,
      options,
    });


    
    if (error) {
      cookies.delete("sb-access-token", {
        path: "/",
      });
      cookies.delete("sb-refresh-token", {
        path: "/",
      });
    
      return redirect("/signin");
    }
    

    if (error) {
      return redirect(`/signin?error="${error.message}"`);
    }


    return redirect(data.url);
    
  }

  if (!rawusername || !password) {
    return redirect(`/register?error="Username and password are required."`);
  }
  if (!rawusername || !email) {
    return redirect(`/register?error="Username and email is required."`);
  }
  if (!password || !email) {
    return redirect(`/register?error="Password and email is required."`);
  }
  if (!email) {
    return redirect(`/register?error="Email is required"`);
  }
  if (!password) {
    return redirect(`/register?error="Password is required"`);
  }
  if (!rawusername) {
    return redirect(`/register?error="Username is required."`);
  }

const full_name = rawusername

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: full_name,
        avatar: "https://i.imgur.com/zqGM5VI.png"
      },
    },
  });

  if (error) {
    return redirect(`/register?error=${error.message}`);
  }
  function sanitizeUsername(username: string): string {
    return username.replace(/[^a-zA-Z0-9._-]/g, (char) => {
      return char.charCodeAt(0).toString();
    });
  }

      const username = sanitizeUsername(rawusername);
      let genpassword = null;
      genpassword = makeid(16);
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
            first_name: username,
            last_name: username,
            password: genpassword
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
              password: genpassword,
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
        };


  
  function makeid(length) {
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;  
}
return redirect(`/signin?registered="true"`);
}

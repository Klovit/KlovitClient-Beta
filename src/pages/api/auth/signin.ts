import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";
import type { Provider } from "@supabase/supabase-js";
import db from '../../../database';
export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const formData = await request.formData();
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
      cookies.delete("sb-access-token", { path: "/" });
      cookies.delete("sb-refresh-token", { path: "/" });
      return redirect(`/signin?error=${error.message}`);
    }

    return redirect(data?.url || "/signin");
  }

  if (!email || !password) {
    return redirect(`/signin?error=Email and password are required`);
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return redirect(`/signin?error=${error.message}`);
  }

  const { access_token, refresh_token } = data.session;
  cookies.set("sb-access-token", access_token, { path: "/" });
  cookies.set("sb-refresh-token", refresh_token, { path: "/" });

  return redirect("/");
};

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export default function WebsiteForm({ inputstarttoken }: { inputstarttoken: string }) {
  const [googleOAuth, setGoogleOAuth] = useState(false);
  const [githubOAuth, setGithubOAuth] = useState(false);
  const [discordOAuth, setDiscordOAuth] = useState(false);

  return (
    <form method="POST" action="/api/installer/website" className="space-y-8">
      <input type="hidden" name="token" value={inputstarttoken} />
      <h1 className="text-center text-2xl font-bold">Step 1 - Website Settings</h1>
      <h2 className="text-center text-xl font-bold">General Settings</h2>

      <div className="form-item">
        <label className="form-label">Website's Name</label>
        <Input name="kcname" placeholder="ExampleNodes" required />
      </div>

      <div className="form-item">
        <label className="form-label">Resource type</label>
        <Select name="resource_type" required>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Resource type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="GB">GB</SelectItem>
            <SelectItem value="MB">MB</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="form-item">
        <label className="form-label">Website URL</label>
        <Input name="website_url" placeholder="https://client.example.com" required />
      </div>

      <div className="form-item">
        <label className="form-label">Website description</label>
        <Input name="website_description" placeholder="The #1 Hosting service" required />
      </div>

      <div className="form-item">
        <label className="form-label">Website's Logo URL</label>
        <Input name="website_logo" placeholder="https://cdn.example.com/logo.png" required />
      </div>

      <h2 className="text-center text-xl font-bold">Pterodactyl Settings</h2>

      <div className="form-item">
        <label className="form-label">Pterodactyl Panel's URL</label>
        <Input name="pterodactyl_url" placeholder="https://panel.example.com" required />
      </div>

      <div className="form-item">
        <label className="form-label">Pterodactyl Panel's Admin API</label>
        <Input name="pterodactyl_api" placeholder="ptla_" required />
      </div>

      <div className="form-item">
        <label className="form-label">Pterodactyl Panel's Client API</label>
        <Input name="pterodactyl_client_api" placeholder="ptlc_" required />
      </div>

      <h2 className="text-center text-xl font-bold">Auth Settings</h2>

      <div className="form-item">
        <label className="form-label">Supabase Auth URL</label>
        <Input name="supabase_url" placeholder="https://example.supabase.co" required />
      </div>

      <div className="form-item">
        <label className="form-label">Supabase Anon Key</label>
        <Input name="supabase_key" placeholder="Anon Key" required />
      </div>

      <div className="form-item flex items-center">
        <label className="form-label">Google OAuth</label>
        <Checkbox
          name="google_oauth"
          checked={googleOAuth}
          onCheckedChange={(checked) => setGoogleOAuth(checked)}
          value={googleOAuth ? "true" : "false"}
        />
      </div>

      <div className="form-item flex items-center">
        <label className="form-label">Github OAuth</label>
        <Checkbox
          name="github_oauth"
          checked={githubOAuth}
          onCheckedChange={(checked) => setGithubOAuth(checked)}
          value={githubOAuth ? "true" : "false"}
        />
      </div>

      <div className="form-item flex items-center">
        <label className="form-label">Discord OAuth</label>
        <Checkbox
          name="discord_oauth"
          checked={discordOAuth}
          onCheckedChange={(checked) => setDiscordOAuth(checked)}
          value={discordOAuth ? "true" : "false"}
        />
      </div>

      <Button variant="outline" type="submit" className="mt-2">
        Next
      </Button>
    </form>
  );
}

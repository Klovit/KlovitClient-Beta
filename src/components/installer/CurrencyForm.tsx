import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export default function PackagesForm({ inputstarttoken }: { inputstarttoken: string }) {

  return (
    <form className="grid grid-cols-1" action="/api/installer/currency" method="POST">
      <input type="hidden" value={inputstarttoken} name="token" />
      <h1 className="text-center text-2xl font-bold">Step 3 - Currency and Store</h1>
      <h1 className="text-center text-xl font-bold">Virtual Currency</h1>
      <div className="w-full grid grid-cols-2 mb-1">
        <label className="ml-1">Enable Gifting of resources and coins:</label>
        <Checkbox name="payments" />
      </div>
      <div className="w-full grid grid-cols-2 mb-1">
        <label className="ml-1">Enable Payment Settings:</label>
        <Checkbox name="payments" />
      </div>
      <div className="w-full grid grid-cols-2 mb-1">
        <label className="ml-1">RAM per GB:</label>
        <Input
          required
          name="ram"
          type="number"
        />
      </div>

      <div className="w-full grid grid-cols-2 mb-1">
        <label className="ml-1">CPU:</label>
        <Input
          required
          name="cpu"
          type="number"
        />
      </div>

      <div className="w-full grid grid-cols-2 mb-1">
        <label className="ml-1">Storage:</label>
        <Input
          required
          name="storage"
          type="number"
        />
      </div>

      <div className="w-full grid grid-cols-2 mb-1">
        <label className="ml-1">Server slots:</label>
        <Input
          required
          name="slots"
          type="number"
        />
      </div>

      <h2 className="text-center text-xl font-bold">Payment Settings</h2>

      <div className="w-full grid grid-cols-2 mb-1">
        <label className="ml-1">Enable Payment Settings:</label>
        <Checkbox name="payments" />
      </div>

      <div className="w-full grid grid-cols-2 mb-1">
        <label className="ml-1">Currency Short Code:</label>
        <Input
          name="currency_code"
          maxLength={3}
          placeholder="USD"
        />
      </div>

      <div className="w-full grid grid-cols-2 mb-1">
        <label className="ml-1">Enable PayPal integration:</label>
        <Checkbox name="paypal_integration" />
      </div>

      <div className="w-full grid grid-cols-2 mb-1">
        <label className="ml-1">PayPal Email:</label>
        <Input
          name="paypal_email"
          placeholder="email@example.com"
        />
      </div>

      <Button type="submit" className="mt-2">
        Next
      </Button>
    </form>
  );
}

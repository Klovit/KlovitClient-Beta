import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from "react";
import db from "@/database";

export default function PackagesForm() {
  const [ramvalue, setRamValue] = useState('');
  const [cpuvalue, setCpuValue] = useState('');
  const [storagevalue, setStorageValue] = useState('');
  const [slotsvalue, setSlotsValue] = useState('');
  const [paymentsvalue, setPaymentsValue] = useState(false);
  const [currencyvalue, setCurrencyValue] = useState('');
  const [paypalintvalue, setPaypalIntValue] = useState(false);
  const [paypalemailvalue, setPaypalEmailValue] = useState('');
  const [ramph, setRamPh] = useState('');
  const [diskph, setDiskPh] = useState('');
  const [cpuph, setCpuPh] = useState('');
  const [slotph, setSlotPh] = useState('');
  const [inputstarttoken, setInputStartToken] = useState('');

  useEffect(() => {
    async function fetchConfig() {
      const config_website = await db.get("config_website");
      const restype = config_website?.resource_type;

    }

    fetchConfig();
  }, []);

  return (
    <form className="grid grid-cols-1" action="/api/installer/packages" method="POST">
      <input type="hidden" value={inputstarttoken} name="inputtoken" />
      <h1 className="text-center text-2xl font-bold">Step 2 - Package and Payment Settings</h1>
      <h1 className="text-center text-xl font-bold">Default Package</h1>

      <div className="w-full grid grid-cols-2 mb-1">
        <label className="ml-1">RAM: </label>
        <Input
          required
          name="ram"
          type="number"
          placeholder={ramph}
        />
      </div>

      <div className="w-full grid grid-cols-2 mb-1">
        <label className="ml-1">CPU: </label>
        <Input
          required
          name="cpu"
          type="number"
          placeholder={cpuph}
        />
      </div>

      <div className="w-full grid grid-cols-2 mb-1">
        <label className="ml-1">Storage: </label>
        <Input
          required
          name="storage"
          type="number"
          placeholder={diskph}
        />
      </div>

      <div className="w-full grid grid-cols-2 mb-1">
        <label className="ml-1">Server slots: </label>
        <Input
          required
          name="slots"
          type="number"
          placeholder={slotph}
        />
      </div>

      <h2 className="text-center text-xl font-bold">Payment Settings</h2>

      <div className="w-full grid grid-cols-2 mb-1">
        <label className="ml-1">Enable Payment Settings: </label>
        <Checkbox
          name="payments"
        />
      </div>

      <div className="w-full grid grid-cols-2 mb-1">
        <label className="ml-1">Currency Short Code: </label>
        <Input
          name="currency_code"
          maxLength={3}
          placeholder="USD"
        />
      </div>

      <div className="w-full grid grid-cols-2 mb-1">
        <label className="ml-1">Enable PayPal integration: </label>
        <Checkbox
          name="paypal_integration"
        />
      </div>

      <div className="w-full grid grid-cols-2 mb-1">
        <label className="ml-1">PayPal Email: </label>
        <Input
          name="paypal_email"
          placeholder="email@example.com"
        />
      </div>

      <input hidden type="text" name="token" required value={inputstarttoken} />
      
      <Button type="submit" className="mt-2">
        Next
      </Button>
    </form>
  );
}

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export default function CurrencyForm({ inputstarttoken, restype }: { inputstarttoken: string; restype: string }) {
  const [enableCoins, setEnableCoins] = useState(false);
  const [enableStore, setEnableStore] = useState(false);
  const [enablePayments, setEnablePayments] = useState(false);
  const [enablePCoins, setEnablePCoins] = useState(false);

  let cpu;
  if (restype === 'GB') {
    cpu = 'Core(s)';
  } else if (restype === 'MB') {
    cpu = '%';
  } else {
    cpu = 'Unit(s)';
  }

  return (
    <form className="grid grid-cols-1 mb-3" action="/api/installer/currency" method="POST">
      <input type="hidden" value={inputstarttoken} name="token" />
      <h1 className="text-center text-2xl font-bold">Step 3 - Currency and Store</h1>
      <h1 className="text-center text-xl font-bold">Virtual Currency and Store</h1>
      
      <div className="w-full grid grid-cols-2 mb-1">
        <label className="ml-1">Enable coins:</label>
        <Checkbox
          name="coinsenabled"
          checked={enableCoins}
          onCheckedChange={(checked) => setEnableCoins(checked)}
        />
      </div>
      
      {enableCoins && (
        <>
          <h1 className="text-center text-xl font-bold">Store</h1>
          <div className="w-full grid grid-cols-2 mb-1">
            <label className="ml-1">Enable Store:</label>
            <Checkbox
              name="storeenabled"
              checked={enableStore}
              onCheckedChange={(checked) => setEnableStore(checked)}
            />
          </div>
        </>
      )}

      {enableCoins && enableStore && (
        <>
          <h1 className="text-center text-sm font-bold">Prices</h1>
          <div className="w-full grid grid-cols-2 mb-1">
            <label className="ml-1 mt-2">RAM {restype}(s):</label>
            <Input required name="ram" type="number" />
          </div>
          <div className="w-full grid grid-cols-2 mb-1">
            <label className="ml-1 mt-2">CPU {cpu}:</label>
            <Input required name="cpu" type="number" />
          </div>
          <div className="w-full grid grid-cols-2 mb-1">
            <label className="ml-1 mt-2">Storage {restype}(s):</label>
            <Input required name="storage" type="number" />
          </div>
          <div className="w-full grid grid-cols-2 mb-1">
            <label className="ml-1 mt-2">Server slots:</label>
            <Input required name="slots" type="number" />
          </div>
        </>
      )}
      
      <h2 className="text-center text-xl font-bold">Payment Settings</h2>
      <div className="w-full grid grid-cols-2 mb-1">
        <label className="ml-1">Enable Payment Settings:</label>
        <Checkbox
          name="payments"
          checked={enablePayments}
          onCheckedChange={(checked) => setEnablePayments(checked)}
        />
      </div>
      {enablePayments && (
        <>
          <div className="w-full grid grid-cols-2 mb-1">
            <label className="ml-1 mt-2">Currency Short Code:</label>
            <Input name="currency_code" maxLength={3} placeholder="e.g. USD" />
          </div>
          <div className="w-full grid grid-cols-2 mb-1">
            <label className="ml-1">Enable purchasable Coins:</label>
            <Checkbox
              className="mt-4"
              name="pcoinsenabled"
              checked={enablePCoins}
              onCheckedChange={(checked) => setEnablePCoins(checked)}
            />
          </div>
          {enablePCoins && (
            <div className="w-full grid grid-cols-2 mb-1">
              <label className="ml-1 mt-2">Price per 100 coins:</label>
              <Input name="pcoinsprice" placeholder="1" />
            </div>
          )}
        </>
      )}

      <Button variant="outline" type="submit" className="mt-2">
        Next
      </Button>
    </form>
  );
}

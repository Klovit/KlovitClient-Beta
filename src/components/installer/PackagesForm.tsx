import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import db from "@/database";

export default function PackagesForm({ inputstarttoken }: { inputstarttoken: string }) {
  const [restype, setRestype] = useState<string>('');

  useEffect(() => {
    const fetchResourceType = async () => {
      const resourceType = await db.get("resource_type");
 console.log(resourceType)
      if (resourceType) {
        setRestype(resourceType === "GB" ? "GB" : resourceType === "MB" ? "MB" : "");
         console.log(restype)
console.log(setRestype)
      }
    };

    fetchResourceType();
  }, []);

    console.log(restype)

  return (
    <form className="grid grid-cols-1" action="/api/installer/packages" method="POST">
      <input type="hidden" value={inputstarttoken} name="token" />
      <h1 className="text-center text-2xl font-bold">Step 2 - Package and Payment Settings</h1>
      <h1 className="text-center text-xl font-bold">Default Package</h1>

      <div className="w-full grid grid-cols-2 mb-1">
        <label className="ml-1">RAM:</label>
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

      <Button variant="outline" type="submit" className="mt-2">
        Next
      </Button>
    </form>
  );
}

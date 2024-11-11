import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export default function FinishForm({ inputstarttoken }: { inputstarttoken: string }) {


  return (
    <form className="grid grid-cols-1 mb-3" action="/api/installer/finish" method="POST">
      <input type="hidden" value={inputstarttoken} name="token" />
      <h1 className="text-center text-2xl font-bold">Step 4 - Creating an Admin account</h1>
      <div className="w-full grid grid-cols-2 mb-1">
        <label className="ml-1 mt-2">First Name:</label>
        <Input required name="firstname" type="text" />
      </div>
      <div className="w-full grid grid-cols-2 mb-1">
        <label className="ml-1 mt-2">Last Name:</label>
        <Input required name="lastname" type="text" />
      </div>
      <div className="w-full grid grid-cols-2 mb-1">
        <label className="ml-1 mt-2">Username:</label>
        <Input required name="slots" type="text" />
      </div>      
      <div className="w-full grid grid-cols-2 mb-1">
        <label className="ml-1 mt-2">Email:</label>
        <Input required name="email" type="email" />
      </div>
      <div className="w-full grid grid-cols-2 mb-1">
        <label className="ml-1 mt-2">Password:</label>
        <Input required name="password" type="password" />
      </div>
      <div className="w-full grid grid-cols-2 mb-1">
        <label className="ml-1 mt-2">Confirm Password:</label>
        <Input required name="confirmpassword" type="password" />
      </div>
    
      <Button variant="outline" type="submit" className="dark:text-white text-black mt-2">
        Next
      </Button>
    </form>
  );
}

"use client"



import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";



export function StartForm() {



  return (
      <form action="/installer/website" className="space-y-8 self-center w-fit">
        <h2 className="text-center text-2xl font-bold">
          Start Installing KlovitClient
        </h2>
        <h1 className="text-md">
          Check your console for a token to start the installation.
        </h1>

        <Input required name="token" type="text" />


        <Button variant="outline" type="submit" className="mt-2 rounded-xl">
          Start!
        </Button>
      </form>
  );
}

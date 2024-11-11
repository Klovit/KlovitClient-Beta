import * as React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

export default function DeployServerForm(eggs) {
  const [selectedEgg, setSelectedEgg] = React.useState(null);
  const handleSelect = (egg) => {
    setSelectedEgg(egg);
  };
  const [activeTab, setActiveTab] = React.useState("general");
  
  return (
    <form method="POST" action="/server/create">
      <div className="h-full w-full mt-1 p-2 rounded-xl pr-10">

    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="w-full flex justify-between">
        <TabsTrigger className="border p-2.5 md:px-[132px]" value="Name">Name</TabsTrigger>
        <TabsTrigger className="border p-2.5 md:px-[132px]" value="Resources">Resources</TabsTrigger>
        <TabsTrigger className="border p-2.5 md:px-[132px]" value="Software">Software</TabsTrigger>
        <TabsTrigger className="border p-2.5 md:px-[132px]" value="Location">Location</TabsTrigger>
      </TabsList>

      <TabsContent value="Name">
        <Label htmlFor="srvname" className="ml-1">Server Name:</Label>
        <Input id="srvname" className="p-2 rounded-xl" type="text" name="srvname" maxLength={30} />
        
        <Button 
          variant="outline" 
          onClick={() => setActiveTab("Resources")} 
          className="mt-2 w-full p-2 rounded-lg"
        >
          Next
        </Button>
        </TabsContent>
        <TabsContent value="Resources">
        <Label htmlFor="ram" className="ml-1">RAM:</Label>
        <Input id="ram" className="p-2 rounded-xl" type="number" name="ram" />
        
        <Label htmlFor="disk" className="ml-1">Disk:</Label>
        <Input id="disk" className="p-2 rounded-xl" type="number" name="disk" />
        
        <Label htmlFor="cpu" className="ml-1">CPU:</Label>
        <Input id="cpu" className="p-2 rounded-xl" type="number" name="cpu" />
        <button 
          type="button" 
          onClick={() => setActiveTab("Software")} 
          className="mt-4 px-4 py-2 rounded-lg bg-blue-500 text-white"
        >
          Next
        </button>
        </TabsContent>

          <TabsContent value="Software">
            <Label className="ml-1 mt-1">Server Software:</Label>
            <div className="grid grid-cols-3 gap-4 mt-2">
              {eggs.eggs && Object.keys(eggs.eggs).map((egg) => (
                <div
                key={egg}
                onClick={() => handleSelect(egg)}
                className={`p-4 border rounded-lg cursor-pointer transition ${
                  selectedEgg === egg ? "bg-blue-500 text-white" : ""
                }`}
                >
                  <img src={eggs.eggs[egg].image} alt={eggs.eggs[egg].display} className="w-full h-20 object-cover mb-2 rounded-md" />
                  <p className="text-center">{eggs.eggs[egg].display}</p>
                  </div>
                ))}
                </div>
                <button 
          type="button" 
          onClick={() => setActiveTab("Location")} 
          className="mt-4 px-4 py-2 rounded-lg bg-blue-500 text-white"
        >
          Next
        </button>
                </TabsContent>
                <TabsContent value="Location">
            <Label className="ml-1 mt-1">Server Software:</Label>
            <div className="grid grid-cols-3 gap-4 mt-2">
              {eggs.eggs && Object.keys(eggs.eggs).map((egg) => (
                <div
                key={egg}
                onClick={() => handleSelect(egg)}
                className={`p-4 border rounded-lg cursor-pointer transition ${
                  selectedEgg === egg ? "bg-blue-500 text-white" : "dark bg-gray-200"
                }`}
                >
                  <img src={eggs.eggs[egg].image} alt={eggs.eggs[egg].display} className="w-full h-20 object-cover mb-2 rounded-md" />
                  <p className="text-center">{eggs.eggs[egg].display}</p>
                  </div>
                ))}
                </div>
                <button className="m-2 p-3 w-full rounded-lg border" type="submit">
                      Create
                  </button>
                </TabsContent>
              </Tabs>
            </div>
          </form>
  );
}

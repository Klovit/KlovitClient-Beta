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

export default function DeployServerForm({eggs, locations}) {
  const [selectedEgg, setSelectedEgg] = React.useState(null);
  const [selectedLocation, setSelectedLocation] = React.useState(null);
  const handleSelectEgg = (egg) => {
    setSelectedEgg(egg);
  };
  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
  };
  const [activeTab, setActiveTab] = React.useState("general");


  return (
    <form method="POST" action="/server/create">
      <div className="h-full w-full p-2 rounded-xl pr-10">

    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
    <TabsList className="w-full flex">
  <TabsTrigger className="flex-1 border border-gray-500 border-r" value="Name">Name</TabsTrigger>
  <TabsTrigger className="flex-1 border border-gray-500 border-r" value="Resources">Resources</TabsTrigger>
  <TabsTrigger className="flex-1 border border-gray-500 border-r" value="Software">Software</TabsTrigger>
  <TabsTrigger className="flex-1 border border-gray-500" value="Location">Location</TabsTrigger>
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
        <Button 
          variant="outline"
          type="button" 
          onClick={() => setActiveTab("Software")} 
          className="mt-2 w-full p-2 rounded-lg"
        >
          Next
        </Button>
        </TabsContent>

          <TabsContent value="Software">
            <Label className="ml-1 mt-1">Server Software:</Label>
            <div className="grid grid-cols-3 gap-4 mt-2">
              {eggs && Object.keys(eggs).map((egg) => (
                <div
                key={egg}
                onClick={() => handleSelectEgg(egg)}
                className={`p-4 border rounded-lg cursor-pointer transition ${
                  selectedEgg === egg ? "bg-blue-500 text-white" : ""
                }`}
                >
                  <img src={eggs[egg].image} alt={eggs[egg].display} className="w-full h-20 object-cover mb-2 rounded-md" />
                  <p className="text-center">{eggs[egg].display}</p>
                  </div>
                ))}
                </div>
                <Input className="hidden" hidden value={selectedEgg} name="egg" />
                <Button
                variant="outline" 
                type="button" 
                onClick={() => setActiveTab("Location")} 
                className="mt-2 w-full p-2 rounded-lg"
                >
                  Next
                </Button>
                </TabsContent>
                <TabsContent value="Location">
            <Label className="ml-1 mt-1">Location:</Label>
            <div className="grid grid-cols-3 gap-4 mt-2">
              {locations && Object.keys(locations).map((location) => (
                <div
                key={location}
                onClick={() => handleSelectLocation(location)}
                className={`p-4 border rounded-lg cursor-pointer transition ${
                  selectedLocation === location ? "bg-blue-500 text-white" : ""
                }`}
                >
                  <img src={locations[location].image} alt={locations[location].name} className="w-full h-20 object-cover mb-2 rounded-md" />
                  <p className="text-center">{locations[location].name}</p>
                  </div>
                ))}
                </div>
                <Input className="hidden" hidden value={selectedLocation} name="location" />

                <Button variant="outline" className="m-2 p-3 w-full" type="submit">
                      Create
                  </Button>
                </TabsContent>
              </Tabs>
            </div>
          </form>
  );
}

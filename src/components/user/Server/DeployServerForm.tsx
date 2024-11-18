import * as React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export default function DeployServerForm({ eggs, locations }) {
  const [selectedEgg, setSelectedEgg] = React.useState(null);
  const [selectedLocation, setSelectedLocation] = React.useState(null);
  const [activeTab, setActiveTab] = React.useState("general");

  const [serverName, setServerName] = React.useState("");
  const [ram, setRam] = React.useState("");
  const [disk, setDisk] = React.useState("");
  const [cpu, setCpu] = React.useState("");

  const handleSelectEgg = (egg) => {
    setSelectedEgg(egg);
  };

  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
  };

  return (
    <form method="POST" action="/api/server/deploy">
      {/* Hidden Inputs */}
      <input className="hidden" type="hidden" name="srvname" value={serverName} />
      <input className="hidden" type="hidden" name="ram" value={ram} />
      <input className="hidden" type="hidden" name="disk" value={disk} />
      <input className="hidden" type="hidden" name="cpu" value={cpu} />
      <input className="hidden" type="hidden" name="egg" value={selectedEgg} />
      <input className="hidden" type="hidden" name="location" value={selectedLocation} />

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
            <Input
              id="srvname"
              className="p-2 rounded-xl"
              type="text"
              value={serverName}
              onChange={(e) => setServerName(e.target.value)}
            />
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
            <Input
              id="ram"
              className="p-2 rounded-xl"
              type="number"
              value={ram}
              onChange={(e) => setRam(e.target.value)}
            />

            <Label htmlFor="disk" className="ml-1">Disk:</Label>
            <Input
              id="disk"
              className="p-2 rounded-xl"
              type="number"
              value={disk}
              onChange={(e) => setDisk(e.target.value)}
            />

            <Label htmlFor="cpu" className="ml-1">CPU:</Label>
            <Input
              id="cpu"
              className="p-2 rounded-xl"
              type="number"
              value={cpu}
              onChange={(e) => setCpu(e.target.value)}
            />
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
                  className={`p-4 rounded-lg cursor-pointer transition ${
                    selectedEgg === egg ? "border shadow" : "shadow"
                  }`}
                >
                  <img src={eggs[egg].image} alt={eggs[egg].display} className="w-full h-20 object-cover mb-2 rounded-md" />
                  <p className="text-center">{eggs[egg].display}</p>
                </div>
              ))}
            </div>
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
                  className={`p-4 rounded-lg cursor-pointer transition ${
                    selectedLocation === location ? "border shadow" : "shadow"
                  }`}
                >
                  <img src={locations[location].image} alt={locations[location].name} className="w-full h-20 object-cover mb-2 rounded-md" />
                  <p className="text-center">{locations[location].name}</p>
                </div>
              ))}
            </div>
            <Button variant="outline" className="m-2 p-3 w-full" type="submit">
              Create
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </form>
  );
}
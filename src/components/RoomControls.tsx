
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDesign } from "@/contexts/DesignContext";
import { useState } from "react";
import { toast } from "sonner";

export const RoomControls = () => {
  const { currentRoom, setCurrentRoom, saveCurrentDesign } = useDesign();
  
  const [roomName, setRoomName] = useState(currentRoom?.name || "New Room");
  const [width, setWidth] = useState(currentRoom?.width.toString() || "5");
  const [length, setLength] = useState(currentRoom?.length.toString() || "5");
  const [height, setHeight] = useState(currentRoom?.height.toString() || "3");
  const [wallColor, setWallColor] = useState(currentRoom?.wallColor || "#FFFFFF");
  const [floorColor, setFloorColor] = useState(currentRoom?.floorColor || "#D2B48C");
  const [designName, setDesignName] = useState("");

  const handleUpdateRoom = () => {
    if (!currentRoom) return;
    
    const updatedRoom = {
      ...currentRoom,
      name: roomName,
      width: parseFloat(width),
      length: parseFloat(length),
      height: parseFloat(height),
      wallColor,
      floorColor,
      updatedAt: new Date(),
    };
    
    setCurrentRoom(updatedRoom);
    toast.success("Room updated successfully!");
  };

  const handleSaveDesign = () => {
    if (!designName.trim()) {
      toast.error("Please enter a design name");
      return;
    }
    
    saveCurrentDesign(designName);
    setDesignName("");
    toast.success("Design saved successfully!");
  };

  if (!currentRoom) return null;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Room Configuration</CardTitle>
          <CardDescription>
            Adjust the dimensions and colors of your room
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="roomName">Room Name</Label>
            <Input
              id="roomName"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              placeholder="Enter room name"
            />
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="width">Width (m)</Label>
              <Input
                id="width"
                type="number"
                min="1"
                max="20"
                step="0.1"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="length">Length (m)</Label>
              <Input
                id="length"
                type="number"
                min="1"
                max="20"
                step="0.1"
                value={length}
                onChange={(e) => setLength(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Height (m)</Label>
              <Input
                id="height"
                type="number"
                min="1"
                max="10"
                step="0.1"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="wallColor">Wall Color</Label>
              <div className="flex gap-2">
                <Input
                  id="wallColor"
                  type="color"
                  value={wallColor}
                  onChange={(e) => setWallColor(e.target.value)}
                  className="w-12 h-10 p-1"
                />
                <Input
                  value={wallColor}
                  onChange={(e) => setWallColor(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="floorColor">Floor Color</Label>
              <div className="flex gap-2">
                <Input
                  id="floorColor"
                  type="color"
                  value={floorColor}
                  onChange={(e) => setFloorColor(e.target.value)}
                  className="w-12 h-10 p-1"
                />
                <Input
                  value={floorColor}
                  onChange={(e) => setFloorColor(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
          </div>
          
          <Button onClick={handleUpdateRoom} className="w-full">
            Update Room
          </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Save Design</CardTitle>
          <CardDescription>
            Save your current design for future reference
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="designName">Design Name</Label>
            <Input
              id="designName"
              value={designName}
              onChange={(e) => setDesignName(e.target.value)}
              placeholder="Enter design name"
            />
          </div>
          <Button onClick={handleSaveDesign} className="w-full">
            Save Current Design
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

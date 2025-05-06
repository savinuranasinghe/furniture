
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useDesign } from "@/contexts/DesignContext";
import { Room } from "@/types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { mockRooms } from "@/data/mockData";

const Rooms = () => {
  const { setCurrentRoom } = useDesign();
  const [rooms, setRooms] = useState<Room[]>([]);
  
  useEffect(() => {
    // Load mock rooms data
    setRooms(mockRooms);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">My Rooms</h1>
          
          <div className="flex items-center gap-4">
            <Input className="w-60" placeholder="Search rooms..." />
            <Button>Create New Room</Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <Card key={room.id} className="overflow-hidden">
              <div 
                className="aspect-video flex items-center justify-center"
                style={{ 
                  backgroundColor: room.floorColor,
                  border: `8px solid ${room.wallColor}` 
                }}
              >
                <div className="text-3xl font-bold text-muted">
                  {room.name.slice(0, 2).toUpperCase()}
                </div>
              </div>
              <CardHeader>
                <CardTitle>{room.name}</CardTitle>
                <CardDescription>
                  {room.width}m x {room.length}m x {room.height}m
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Edit</Button>
                <Button onClick={() => {
                  setCurrentRoom(room);
                }}>
                  <Link to="/">Use This Room</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
      
      <footer className="border-t py-4">
        <div className="container text-center text-sm text-muted-foreground">
          Walampoori Room Visualizer &copy; 2025
        </div>
      </footer>
    </div>
  );
};

export default Rooms;

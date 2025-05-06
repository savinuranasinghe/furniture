
import { Header } from "@/components/Header";
import { useDesign } from "@/contexts/DesignContext";
import { useEffect } from "react";
import { Canvas2D } from "@/components/Canvas2D";
import { Canvas3D } from "@/components/Canvas3D";
import { RoomControls } from "@/components/RoomControls";
import { FurnitureCatalog } from "@/components/FurnitureCatalog";
import { PlacedFurnitureList } from "@/components/PlacedFurnitureList";
import { mockFurniture } from "@/data/mockData";
import { ViewModeSelector } from "@/components/ViewModeSelector";

const Index = () => {
  const { viewMode, setFurnitureCatalog } = useDesign();
  
  // Load mock data on component mount
  useEffect(() => {
    setFurnitureCatalog(mockFurniture);
  }, [setFurnitureCatalog]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Room Visualizer</h1>
          <ViewModeSelector />
        </div>
        
        <div className="grid grid-cols-12 gap-6">
          {/* Left sidebar */}
          <div className="col-span-3">
            <RoomControls />
          </div>
          
          {/* Main canvas area */}
          <div className="col-span-6 flex flex-col">
            <div className="bg-white border rounded-md shadow-sm h-[600px] flex items-center justify-center">
              {viewMode === 'twoD' ? <Canvas2D /> : <Canvas3D />}
            </div>
          </div>
          
          {/* Right sidebar */}
          <div className="col-span-3">
            <div className="space-y-6">
              <FurnitureCatalog />
              <PlacedFurnitureList />
            </div>
          </div>
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

export default Index;

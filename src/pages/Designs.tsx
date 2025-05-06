
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
import { Link } from "react-router-dom";

const Designs = () => {
  const { savedDesigns, setCurrentDesign } = useDesign();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">My Designs</h1>
          
          <div className="flex items-center gap-4">
            <Input className="w-60" placeholder="Search designs..." />
            <Button asChild>
              <Link to="/">Create New Design</Link>
            </Button>
          </div>
        </div>
        
        {savedDesigns.length === 0 ? (
          <div className="border rounded-lg p-12 text-center">
            <h3 className="text-xl font-medium mb-2">No designs yet</h3>
            <p className="text-muted-foreground mb-6">
              Create your first room design to see it here
            </p>
            <Button asChild>
              <Link to="/">Create Design</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedDesigns.map((design) => (
              <Card key={design.id} className="overflow-hidden">
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <div className="text-3xl font-bold text-muted-foreground">
                    {design.name.slice(0, 2).toUpperCase()}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>{design.name}</CardTitle>
                  <CardDescription>
                    {design.updatedAt?.toLocaleDateString() || "Unknown date"}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentDesign(design)}>
                    <Link to="/">Edit</Link>
                  </Button>
                  <Button>View</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
      
      <footer className="border-t py-4">
        <div className="container text-center text-sm text-muted-foreground">
          Walampoori Room Visualizer &copy; 2025
        </div>
      </footer>
    </div>
  );
};

export default Designs;

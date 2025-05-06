
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useDesign } from "@/contexts/DesignContext";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

export const Header = () => {
  const { viewMode, setViewMode } = useDesign();

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container flex h-14 items-center">
        <div className="flex items-center mr-4">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-2xl text-furniture-primary">Walampoori</span>
          </Link>
        </div>

        <div className="flex items-center justify-between flex-1 space-x-2">
          <nav className="flex items-center space-x-4 lg:space-x-6">
            <Link to="/" className="flex items-center text-sm font-medium transition-colors hover:text-primary">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <Link to="/designs" className="text-sm font-medium transition-colors hover:text-primary">
              My Designs
            </Link>
            <Link to="/rooms" className="text-sm font-medium transition-colors hover:text-primary">
              Rooms
            </Link>
          </nav>

          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'twoD' ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode('twoD')}
            >
              2D View
            </Button>
            <Button
              variant={viewMode === 'threeD' ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode('threeD')}
            >
              3D View
            </Button>
          </div>
        </div>
      </div>
      <Separator />
    </header>
  );
};

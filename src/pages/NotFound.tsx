
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-5">
        <h1 className="text-6xl font-bold text-furniture-primary">404</h1>
        <h2 className="text-2xl font-medium">Page Not Found</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Button size="lg" asChild className="mt-6">
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;

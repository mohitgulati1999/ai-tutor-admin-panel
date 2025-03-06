
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileQuestion } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="glass-card p-8 max-w-md w-full text-center animate-fade-in">
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
            <FileQuestion className="h-10 w-10 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4 text-gradient">404</h1>
        <p className="text-xl mb-6">Oops! Page not found</p>
        <p className="text-muted-foreground mb-8">
          We couldn't find the page you were looking for. It might have been moved or doesn't exist.
        </p>
        <Button asChild className="min-w-[200px]">
          <Link to="/">Return to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;

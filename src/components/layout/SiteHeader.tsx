import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";

const SiteHeader = () => {
  return (
    <header className="border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2" aria-label="Vinayak Supermarket Home">
          <span className="text-lg font-semibold tracking-tight">Vinayak Supermarket</span>
        </Link>
        <nav aria-label="Main navigation" className="flex items-center gap-1">
          <NavLink to="/" className={({ isActive }) => `px-3 py-2 rounded-md text-sm ${isActive ? 'bg-secondary text-secondary-foreground' : 'hover:bg-accent hover:text-accent-foreground'}`}>
            Home
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => `px-3 py-2 rounded-md text-sm ${isActive ? 'bg-secondary text-secondary-foreground' : 'hover:bg-accent hover:text-accent-foreground'}`}>
            About
          </NavLink>
          <NavLink to="/admin" className={({ isActive }) => `px-3 py-2 rounded-md text-sm ${isActive ? 'bg-secondary text-secondary-foreground' : 'hover:bg-accent hover:text-accent-foreground'}`}>
            Admin
          </NavLink>
          <Button asChild variant="hero" size="sm" className="ml-2">
            <Link to="/">Shop now</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default SiteHeader;

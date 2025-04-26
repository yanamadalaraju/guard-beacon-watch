
import { Button } from "@/components/ui/button";
import { Bell, Menu } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [activeAlerts, setActiveAlerts] = useState(1);
  const navigate = useNavigate();

  const navItems = [
    { name: "Dashboard", path: "/" },
    { name: "Guards", path: "/guards" },
    { name: "Locations", path: "/locations" },
    { name: "Tasks", path: "/tasks" },
    { name: "Reports", path: "/reports" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex h-16 items-center px-4 sm:px-6">
        <div className="flex items-center gap-2 mr-auto">
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[250px] px-2 pt-10">
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <Button
                    key={item.path}
                    variant="ghost"
                    className="justify-start"
                    onClick={() => {
                      navigate(item.path);
                    }}
                  >
                    {item.name}
                  </Button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-primary">Guard Beacon</h1>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-1 mx-6">
          {navItems.map((item) => (
            <Button
              key={item.path}
              variant="ghost"
              onClick={() => {
                navigate(item.path);
              }}
              className={cn(
                "text-muted-foreground",
                window.location.pathname === item.path && "text-foreground bg-accent"
              )}
            >
              {item.name}
            </Button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="relative" onClick={() => navigate("/alerts")}>
            <Bell className="h-5 w-5" />
            {activeAlerts > 0 && (
              <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-destructive">
                {activeAlerts}
              </Badge>
            )}
          </Button>
          <Button className="ml-2" onClick={() => navigate("/scan")}>
            Scan
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

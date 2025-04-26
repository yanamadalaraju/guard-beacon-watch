
import { useNavigate } from "react-router-dom";
import { Guard } from "@/types";
import { Avatar, AvatarFallback } from "./ui/avatar";
import StatusBadge from "./StatusBadge";
import { MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface GuardItemProps {
  guard: Guard;
  className?: string;
  showActions?: boolean;
}

const GuardItem = ({ guard, className, showActions = false }: GuardItemProps) => {
  const navigate = useNavigate();
  
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };
  
  const getLastUpdateText = () => {
    if (!guard.currentLocation) return "No location data";
    
    const lastUpdate = new Date(guard.currentLocation.lastUpdated);
    const now = new Date();
    const diffMs = now.getTime() - lastUpdate.getTime();
    const diffMins = Math.round(diffMs / 60000);
    
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} min ago`;
    return lastUpdate.toLocaleTimeString();
  };

  return (
    <div className={cn("p-3 rounded-lg border flex items-center", className)}>
      <Avatar className="h-10 w-10 mr-3">
        {guard.avatar ? (
          <img src={guard.avatar} alt={guard.name} />
        ) : (
          <AvatarFallback>{getInitials(guard.name)}</AvatarFallback>
        )}
      </Avatar>
      
      <div className="flex-grow">
        <div className="flex justify-between items-center">
          <span className="font-medium">{guard.name}</span>
          <StatusBadge status={guard.status} className="text-xs" />
        </div>
        
        {guard.currentLocation && (
          <div className="flex items-center text-xs text-muted-foreground mt-1">
            <MapPin className="h-3 w-3 mr-1" />
            <span>{getLastUpdateText()}</span>
          </div>
        )}
      </div>
      
      {showActions && (
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => navigate(`/guards/${guard.id}`)}
        >
          Details
        </Button>
      )}
    </div>
  );
};

export default GuardItem;

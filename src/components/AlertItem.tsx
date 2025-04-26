
import { Alert } from "@/types";
import StatusBadge from "./StatusBadge";
import { Button } from "./ui/button";
import { Bell, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface AlertItemProps {
  alert: Alert;
  onStatusChange?: (alertId: string, newStatus: Alert['status']) => void;
  className?: string;
}

const AlertItem = ({ alert, onStatusChange, className }: AlertItemProps) => {
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString();
  };

  const getAlertTypeIcon = (type: Alert['type']) => {
    switch (type) {
      case 'sos':
        return <span className="text-destructive animate-ping-slow inline-flex h-3 w-3 rounded-full bg-destructive opacity-75 mr-2" />;
      default:
        return <Bell className="h-4 w-4 mr-2" />;
    }
  };

  const handleStatusChange = (newStatus: Alert['status']) => {
    if (onStatusChange) {
      onStatusChange(alert.id, newStatus);
    }
  };

  return (
    <div className={cn("p-4 rounded-lg border", 
      alert.status === 'active' ? 'bg-destructive/5 border-destructive/20' : 'bg-background',
      className
    )}>
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center">
          {getAlertTypeIcon(alert.type)}
          <span className="font-medium">{alert.type.toUpperCase()} Alert</span>
        </div>
        <StatusBadge status={alert.status} />
      </div>
      
      <div className="text-sm mb-3">
        {alert.notes}
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center text-xs text-muted-foreground">
          {alert.coordinates && <MapPin className="h-3 w-3 mr-1" />}
          <span>{formatTime(alert.timestamp)}</span>
        </div>
        
        {alert.status === 'active' && (
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => handleStatusChange('acknowledged')}
            >
              Acknowledge
            </Button>
            <Button 
              size="sm" 
              variant="default"
              onClick={() => handleStatusChange('resolved')}
            >
              Resolve
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertItem;


import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  // Define badge styles based on status
  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      // Activity statuses
      case 'active':
        return 'bg-success text-success-foreground';
      case 'inactive':
        return 'bg-muted text-muted-foreground';
      case 'on-break':
        return 'bg-warning text-warning-foreground';
        
      // Task statuses
      case 'assigned':
        return 'bg-info text-info-foreground';
      case 'in-progress':
        return 'bg-warning text-warning-foreground';
      case 'completed':
        return 'bg-success text-success-foreground';
      case 'canceled':
        return 'bg-destructive/70 text-destructive-foreground';
        
      // Alert statuses
      case 'acknowledged':
        return 'bg-warning text-warning-foreground';
      case 'resolved':
        return 'bg-success text-success-foreground';
        
      // Priority/Severity
      case 'low':
        return 'bg-info/30 text-info-foreground border border-info';
      case 'medium':
        return 'bg-warning/30 text-warning-foreground border border-warning';
      case 'high':
        return 'bg-destructive/30 text-destructive-foreground border border-destructive';
      case 'urgent':
      case 'critical':
        return 'bg-destructive text-destructive-foreground animate-pulse-slow';
        
      // Alert types
      case 'sos':
        return 'bg-destructive text-destructive-foreground animate-pulse-slow';
      case 'geofence':
        return 'bg-warning text-warning-foreground';
      case 'missed-checkpoint':
        return 'bg-warning text-warning-foreground';
        
      // Default
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <Badge className={cn(getStatusStyle(status), className)}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

export default StatusBadge;

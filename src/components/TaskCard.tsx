
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/StatusBadge";
import { Task } from "@/types";
import { Clock } from "lucide-react";

interface TaskCardProps {
  task: Task;
  onStatusChange?: (taskId: string, newStatus: Task['status']) => void;
  className?: string;
}

const TaskCard = ({ task, onStatusChange, className }: TaskCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const handleStatusChange = (newStatus: Task['status']) => {
    if (onStatusChange) {
      onStatusChange(task.id, newStatus);
    }
  };

  const isPastDue = new Date(task.dueDate) < new Date() && task.status !== 'completed';

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{task.title}</CardTitle>
          <StatusBadge status={task.priority} />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span className={isPastDue ? "text-destructive font-semibold" : ""}>
            Due: {formatDate(task.dueDate)}
          </span>
        </div>
        <div className="mt-3 flex justify-between items-center">
          <StatusBadge status={task.status} />
          {task.completedAt && (
            <span className="text-xs text-muted-foreground">
              Completed: {formatDate(task.completedAt)}
            </span>
          )}
        </div>
      </CardContent>
      {task.status !== 'completed' && task.status !== 'canceled' && (
        <CardFooter className="flex gap-2 pt-0">
          {task.status === 'assigned' && (
            <Button 
              size="sm" 
              variant="outline" 
              className="w-full"
              onClick={() => handleStatusChange('in-progress')}
            >
              Start Task
            </Button>
          )}
          {task.status === 'in-progress' && (
            <Button 
              size="sm" 
              variant="default" 
              className="w-full"
              onClick={() => handleStatusChange('completed')}
            >
              Mark Complete
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
};

export default TaskCard;

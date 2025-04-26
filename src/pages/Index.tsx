import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatusBadge from "@/components/StatusBadge";
import Map from "@/components/Map";
import GuardItem from "@/components/GuardItem";
import TaskCard from "@/components/TaskCard";
import AlertItem from "@/components/AlertItem";
import { guards, locations, tasks, alerts } from "@/data/mockData";
import { Alert, Guard, Task } from "@/types";
import { MapPin, CheckCircle, AlertTriangle, CheckSquare, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";

const Dashboard = () => {
  const [activeGuards, setActiveGuards] = useState<Guard[]>([]);
  const [activeTasks, setActiveTasks] = useState<Task[]>([]);
  const [activeAlerts, setActiveAlerts] = useState<Alert[]>([]);
  
  useEffect(() => {
    setActiveGuards(guards.filter(g => g.status === 'active' || g.status === 'on-break'));
    setActiveTasks(tasks.filter(t => t.status === 'assigned' || t.status === 'in-progress'));
    setActiveAlerts(alerts.filter(a => a.status === 'active'));
  }, []);
  
  const handleTaskStatusChange = (taskId: string, newStatus: Task['status']) => {
    setActiveTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { ...task, status: newStatus, completedAt: newStatus === 'completed' ? new Date().toISOString() : undefined } 
          : task
      )
    );
  };
  
  const handleAlertStatusChange = (alertId: string, newStatus: Alert['status']) => {
    setActiveAlerts(prevAlerts => 
      prevAlerts.map(alert => 
        alert.id === alertId 
          ? { ...alert, status: newStatus } 
          : alert
      )
    );
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="flex-1 container py-4 max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <Button onClick={() => alert("SOS Alert Triggered!")} variant="destructive">
            <AlertTriangle className="h-4 w-4 mr-2" /> SOS Alert
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-primary" />
                Guard Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-success">{guards.filter(g => g.status === 'active').length}</p>
                  <p className="text-sm text-muted-foreground">Active</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-warning">{guards.filter(g => g.status === 'on-break').length}</p>
                  <p className="text-sm text-muted-foreground">On Break</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-muted-foreground">{guards.filter(g => g.status === 'inactive').length}</p>
                  <p className="text-sm text-muted-foreground">Inactive</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => window.location.href = '/guards'}>
                View All Guards
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <CheckSquare className="h-5 w-5 mr-2 text-primary" />
                Task Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-info">{tasks.filter(t => t.status === 'assigned').length}</p>
                  <p className="text-sm text-muted-foreground">Assigned</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-warning">{tasks.filter(t => t.status === 'in-progress').length}</p>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-success">{tasks.filter(t => t.status === 'completed').length}</p>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => window.location.href = '/tasks'}>
                Manage Tasks
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-primary" />
                Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-destructive">{alerts.filter(a => a.status === 'active').length}</p>
                  <p className="text-sm text-muted-foreground">Active</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-warning">{alerts.filter(a => a.status === 'acknowledged').length}</p>
                  <p className="text-sm text-muted-foreground">Acknowledged</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-success">{alerts.filter(a => a.status === 'resolved').length}</p>
                  <p className="text-sm text-muted-foreground">Resolved</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => window.location.href = '/alerts'}>
                View All Alerts
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Live Map</CardTitle>
              <CardDescription>Current guard locations and patrol areas</CardDescription>
            </CardHeader>
            <CardContent>
              <Map 
                guards={activeGuards} 
                locations={locations} 
                showGeofencing={true}
                height="400px"
              />
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-primary" />
                Active Guards
              </CardTitle>
            </CardHeader>
            <CardContent>
              {activeGuards.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">No active guards</p>
              ) : (
                <div className="space-y-2">
                  {activeGuards.map(guard => (
                    <GuardItem 
                      key={guard.id} 
                      guard={guard} 
                      showActions={true}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          
          <Tabs defaultValue="tasks">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <TabsList>
                    <TabsTrigger value="tasks" className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      <span>Tasks</span>
                    </TabsTrigger>
                    <TabsTrigger value="alerts" className="flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      <span>Alerts</span>
                    </TabsTrigger>
                  </TabsList>
                </div>
              </CardHeader>
              <CardContent>
                <TabsContent value="tasks" className="mt-0">
                  {activeTasks.length === 0 ? (
                    <p className="text-center text-muted-foreground py-4">No active tasks</p>
                  ) : (
                    <div className="space-y-4">
                      {activeTasks.map(task => (
                        <TaskCard 
                          key={task.id} 
                          task={task} 
                          onStatusChange={handleTaskStatusChange}
                        />
                      ))}
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="alerts" className="mt-0">
                  {activeAlerts.length === 0 ? (
                    <p className="text-center text-muted-foreground py-4">No active alerts</p>
                  ) : (
                    <div className="space-y-4">
                      {activeAlerts.map(alert => (
                        <AlertItem 
                          key={alert.id} 
                          alert={alert} 
                          onStatusChange={handleAlertStatusChange}
                        />
                      ))}
                    </div>
                  )}
                </TabsContent>
              </CardContent>
            </Card>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

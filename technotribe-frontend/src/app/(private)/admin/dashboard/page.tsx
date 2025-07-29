"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  Briefcase,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Shield,
  Activity,
  Settings,
} from "lucide-react";
import { toast } from "sonner";

interface DashboardStats {
  totalUsers: number;
  totalJobs: number;
  totalApplications: number;
  activeRecruiters: number;
  activeDevelopers: number;
  pendingApprovals: number;
  systemHealth: string;
  revenue: number;
}

interface RecentActivity {
  id: string;
  type: string;
  message: string;
  timestamp: string;
  status: "success" | "warning" | "error" | "info";
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalJobs: 0,
    totalApplications: 0,
    activeRecruiters: 0,
    activeDevelopers: 0,
    pendingApprovals: 0,
    systemHealth: "healthy",
    revenue: 0,
  });

  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Simulate API calls
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStats({
        totalUsers: 1247,
        totalJobs: 89,
        totalApplications: 342,
        activeRecruiters: 156,
        activeDevelopers: 1091,
        pendingApprovals: 12,
        systemHealth: "healthy",
        revenue: 45600,
      });

      setRecentActivity([
        {
          id: "1",
          type: "user_registration",
          message: "New developer registered: John Doe",
          timestamp: "2 minutes ago",
          status: "success",
        },
        {
          id: "2",
          type: "job_posted",
          message: "New job posted: Senior React Developer at TechCorp",
          timestamp: "15 minutes ago",
          status: "info",
        },
        {
          id: "3",
          type: "system_alert",
          message: "High server load detected",
          timestamp: "1 hour ago",
          status: "warning",
        },
        {
          id: "4",
          type: "payment_received",
          message: "Payment received from RecruiterPro Inc.",
          timestamp: "2 hours ago",
          status: "success",
        },
        {
          id: "5",
          type: "user_suspended",
          message: "User account suspended: spam@example.com",
          timestamp: "3 hours ago",
          status: "error",
        },
      ]);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "info":
        return <Activity className="h-4 w-4 text-blue-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getSystemHealthColor = (health: string) => {
    switch (health) {
      case "healthy":
        return "text-green-600 bg-green-100";
      case "warning":
        return "text-yellow-600 bg-yellow-100";
      case "critical":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  if (loading) {
    return (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
    );
  }

  return (
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Monitor and manage the TechnoTribe platform
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalJobs}</div>
              <p className="text-xs text-muted-foreground">
                +5 new this week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Applications</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalApplications}</div>
              <p className="text-xs text-muted-foreground">
                +23% from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.revenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +8% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                User Breakdown
              </CardTitle>
              <CardDescription>Active users by role</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Developers</span>
                <Badge variant="secondary">{stats.activeDevelopers}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Recruiters</span>
                <Badge variant="secondary">{stats.activeRecruiters}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Pending Approvals</span>
                <Badge variant="destructive">{stats.pendingApprovals}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* System Health */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                System Health
              </CardTitle>
              <CardDescription>Platform status and performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Status</span>
                <Badge className={getSystemHealthColor(stats.systemHealth)}>
                  {stats.systemHealth}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Uptime</span>
                <span className="text-sm font-medium">99.9%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Response Time</span>
                <span className="text-sm font-medium">120ms</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Quick Actions
              </CardTitle>
              <CardDescription>Common admin tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Manage Users
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Briefcase className="h-4 w-4 mr-2" />
                Review Jobs
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <AlertTriangle className="h-4 w-4 mr-2" />
                View Reports
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Settings className="h-4 w-4 mr-2" />
                System Settings
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest platform activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center gap-3 p-3 rounded-lg border">
                  {getStatusIcon(activity.status)}
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
  );
} 
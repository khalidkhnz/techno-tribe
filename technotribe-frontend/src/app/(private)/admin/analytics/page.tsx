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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  Briefcase,
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  Calendar,
  Globe,
  Target,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

interface AnalyticsData {
  totalUsers: number;
  totalJobs: number;
  totalApplications: number;
  totalRevenue: number;
  userGrowth: number;
  jobGrowth: number;
  applicationGrowth: number;
  revenueGrowth: number;
  topSkills: Array<{ skill: string; count: number }>;
  topLocations: Array<{ location: string; count: number }>;
  monthlyStats: Array<{ month: string; users: number; jobs: number; applications: number }>;
}

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<AnalyticsData>({
    totalUsers: 0,
    totalJobs: 0,
    totalApplications: 0,
    totalRevenue: 0,
    userGrowth: 0,
    jobGrowth: 0,
    applicationGrowth: 0,
    revenueGrowth: 0,
    topSkills: [],
    topLocations: [],
    monthlyStats: [],
  });
  const [timeRange, setTimeRange] = useState("30d");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalyticsData();
  }, [timeRange]);

  const fetchAnalyticsData = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setData({
        totalUsers: 1247,
        totalJobs: 89,
        totalApplications: 342,
        totalRevenue: 45600,
        userGrowth: 12.5,
        jobGrowth: 8.3,
        applicationGrowth: 23.1,
        revenueGrowth: 15.7,
        topSkills: [
          { skill: "React", count: 156 },
          { skill: "JavaScript", count: 142 },
          { skill: "Python", count: 98 },
          { skill: "Node.js", count: 87 },
          { skill: "TypeScript", count: 76 },
        ],
        topLocations: [
          { location: "San Francisco, CA", count: 89 },
          { location: "New York, NY", count: 76 },
          { location: "Remote", count: 65 },
          { location: "Austin, TX", count: 43 },
          { location: "Seattle, WA", count: 38 },
        ],
        monthlyStats: [
          { month: "Jan", users: 1200, jobs: 85, applications: 320 },
          { month: "Feb", users: 1250, jobs: 92, applications: 345 },
          { month: "Mar", users: 1300, jobs: 88, applications: 310 },
          { month: "Apr", users: 1350, jobs: 95, applications: 380 },
          { month: "May", users: 1400, jobs: 102, applications: 420 },
          { month: "Jun", users: 1450, jobs: 98, applications: 395 },
        ],
      });
    } catch (error) {
      console.error("Error fetching analytics data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getGrowthIcon = (growth: number) => {
    if (growth > 0) {
      return <ArrowUpRight className="h-4 w-4 text-green-500" />;
    } else {
      return <ArrowDownRight className="h-4 w-4 text-red-500" />;
    }
  };

  const getGrowthColor = (growth: number) => {
    if (growth > 0) {
      return "text-green-600";
    } else {
      return "text-red-600";
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
            <p className="text-muted-foreground mt-2">
              Platform performance and insights
            </p>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.totalUsers.toLocaleString()}</div>
              <div className="flex items-center gap-1 text-xs">
                {getGrowthIcon(data.userGrowth)}
                <span className={getGrowthColor(data.userGrowth)}>
                  {data.userGrowth > 0 ? "+" : ""}{data.userGrowth}%
                </span>
                <span className="text-muted-foreground">from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.totalJobs}</div>
              <div className="flex items-center gap-1 text-xs">
                {getGrowthIcon(data.jobGrowth)}
                <span className={getGrowthColor(data.jobGrowth)}>
                  {data.jobGrowth > 0 ? "+" : ""}{data.jobGrowth}%
                </span>
                <span className="text-muted-foreground">from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Applications</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.totalApplications}</div>
              <div className="flex items-center gap-1 text-xs">
                {getGrowthIcon(data.applicationGrowth)}
                <span className={getGrowthColor(data.applicationGrowth)}>
                  {data.applicationGrowth > 0 ? "+" : ""}{data.applicationGrowth}%
                </span>
                <span className="text-muted-foreground">from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${data.totalRevenue.toLocaleString()}</div>
              <div className="flex items-center gap-1 text-xs">
                {getGrowthIcon(data.revenueGrowth)}
                <span className={getGrowthColor(data.revenueGrowth)}>
                  {data.revenueGrowth > 0 ? "+" : ""}{data.revenueGrowth}%
                </span>
                <span className="text-muted-foreground">from last month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Skills */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Top Skills in Demand
              </CardTitle>
              <CardDescription>Most requested skills by recruiters</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.topSkills.map((skill, index) => (
                  <div key={skill.skill} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs">
                        {index + 1}
                      </Badge>
                      <span className="font-medium">{skill.skill}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${(skill.count / data.topSkills[0].count) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-muted-foreground w-12 text-right">
                        {skill.count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Locations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Top Job Locations
              </CardTitle>
              <CardDescription>Most popular job locations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.topLocations.map((location, index) => (
                  <div key={location.location} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs">
                        {index + 1}
                      </Badge>
                      <span className="font-medium">{location.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${(location.count / data.topLocations[0].count) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-muted-foreground w-12 text-right">
                        {location.count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Monthly Trends
            </CardTitle>
            <CardDescription>Platform growth over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-6 gap-4">
              {data.monthlyStats.map((stat) => (
                <div key={stat.month} className="text-center">
                  <div className="text-lg font-semibold text-foreground">{stat.month}</div>
                  <div className="space-y-2 mt-2">
                    <div className="text-sm">
                      <div className="text-muted-foreground">Users</div>
                      <div className="font-medium">{stat.users}</div>
                    </div>
                    <div className="text-sm">
                      <div className="text-muted-foreground">Jobs</div>
                      <div className="font-medium">{stat.jobs}</div>
                    </div>
                    <div className="text-sm">
                      <div className="text-muted-foreground">Applications</div>
                      <div className="font-medium">{stat.applications}</div>
                    </div>
                  </div>
                </div>
              ))}
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
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <Users className="h-6 w-6" />
                <span>User Reports</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <Briefcase className="h-6 w-6" />
                <span>Job Analytics</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <TrendingUp className="h-6 w-6" />
                <span>Performance</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
  );
} 
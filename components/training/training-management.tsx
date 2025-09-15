"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  CheckCircle,
  Clock,
  XCircle,
  DollarSign,
  BookOpen,
  Award,
  TrendingUp,
  AlertCircle,
  Mail,
  Eye,
} from "lucide-react"

interface TrainingRequest {
  id: string
  employeeName: string
  employeeEmail: string
  courseName: string
  provider: string
  cost: number
  duration: string
  reason: string
  status: "pending" | "approved" | "rejected"
  requestDate: string
  manager: string
  priority: "high" | "medium" | "low"
}

interface TrainingProgress {
  id: string
  employeeName: string
  courseName: string
  provider: string
  progress: number
  startDate: string
  expectedCompletion: string
  status: "in-progress" | "completed" | "overdue"
}

export function TrainingManagement() {
  const [activeTab, setActiveTab] = useState("requests")

  // Mock training requests
  const [trainingRequests] = useState<TrainingRequest[]>([
    {
      id: "1",
      employeeName: "Sarah Johnson",
      employeeEmail: "sarah.johnson@company.com",
      courseName: "AWS Solutions Architect Professional",
      provider: "AWS Training",
      cost: 300,
      duration: "40 hours",
      reason: "Required for upcoming cloud migration project",
      status: "pending",
      requestDate: "2024-01-15",
      manager: "Mike Chen",
      priority: "high",
    },
    {
      id: "2",
      employeeName: "David Rodriguez",
      employeeEmail: "david.rodriguez@company.com",
      courseName: "Advanced React Patterns",
      provider: "Tech Academy",
      cost: 0,
      duration: "8 hours",
      reason: "Skill enhancement for current project",
      status: "approved",
      requestDate: "2024-01-14",
      manager: "Lisa Park",
      priority: "medium",
    },
    {
      id: "3",
      employeeName: "Emily Chen",
      employeeEmail: "emily.chen@company.com",
      courseName: "Machine Learning Fundamentals",
      provider: "DataCamp",
      cost: 500,
      duration: "60 hours",
      reason: "Career development - transitioning to ML role",
      status: "rejected",
      requestDate: "2024-01-10",
      manager: "Mike Chen",
      priority: "low",
    },
  ])

  // Mock training progress
  const [trainingProgress] = useState<TrainingProgress[]>([
    {
      id: "1",
      employeeName: "David Rodriguez",
      courseName: "Advanced React Patterns",
      provider: "Tech Academy",
      progress: 65,
      startDate: "2024-01-16",
      expectedCompletion: "2024-01-30",
      status: "in-progress",
    },
    {
      id: "2",
      employeeName: "Alex Thompson",
      courseName: "TypeScript Masterclass",
      provider: "Code Academy",
      progress: 100,
      startDate: "2024-01-01",
      expectedCompletion: "2024-01-15",
      status: "completed",
    },
    {
      id: "3",
      employeeName: "Maria Garcia",
      courseName: "Project Management Professional",
      provider: "PMI",
      progress: 30,
      startDate: "2023-12-01",
      expectedCompletion: "2024-01-10",
      status: "overdue",
    },
  ])

  const handleApproval = (requestId: string, action: "approve" | "reject") => {
    // Simulate approval/rejection
    alert(`Training request ${action}d successfully`)
  }

  const sendReminder = (progressId: string) => {
    // Simulate sending reminder
    alert("Reminder sent to employee")
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-orange-600" />
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "in-progress":
        return <BookOpen className="h-4 w-4 text-blue-600" />
      case "completed":
        return <Award className="h-4 w-4 text-green-600" />
      case "overdue":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-orange-100 text-orange-800"
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Training Management</h2>
          <p className="text-muted-foreground">Manage training requests and track employee progress</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="requests">Training Requests</TabsTrigger>
          <TabsTrigger value="progress">Progress Tracking</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="requests" className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
                <Clock className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {trainingRequests.filter((r) => r.status === "pending").length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Approved This Month</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {trainingRequests.filter((r) => r.status === "approved").length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
                <DollarSign className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${trainingRequests.filter((r) => r.status === "approved").reduce((sum, r) => sum + r.cost, 0)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">High Priority</CardTitle>
                <AlertCircle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {trainingRequests.filter((r) => r.priority === "high" && r.status === "pending").length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Training Requests */}
          <Card>
            <CardHeader>
              <CardTitle>Training Requests</CardTitle>
              <CardDescription>Review and approve employee training requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trainingRequests.map((request) => (
                  <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback>
                          {request.employeeName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium">{request.employeeName}</h4>
                          <Badge className={getPriorityColor(request.priority)}>{request.priority}</Badge>
                          <Badge className={getStatusColor(request.status)}>
                            {getStatusIcon(request.status)} {request.status}
                          </Badge>
                        </div>
                        <p className="text-sm font-medium text-blue-600">{request.courseName}</p>
                        <p className="text-sm text-muted-foreground">
                          {request.provider} • {request.duration}
                        </p>
                        <p className="text-sm text-muted-foreground">{request.reason}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-sm text-muted-foreground">Cost: ${request.cost}</span>
                          <span className="text-sm text-muted-foreground">Requested: {request.requestDate}</span>
                          <span className="text-sm text-muted-foreground">Manager: {request.manager}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {request.status === "pending" && (
                        <>
                          <Button size="sm" onClick={() => handleApproval(request.id, "approve")}>
                            Approve
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleApproval(request.id, "reject")}>
                            Reject
                          </Button>
                        </>
                      )}
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3 mr-1" />
                        Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          {/* Progress Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">In Progress</CardTitle>
                <BookOpen className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {trainingProgress.filter((p) => p.status === "in-progress").length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed</CardTitle>
                <Award className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {trainingProgress.filter((p) => p.status === "completed").length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overdue</CardTitle>
                <AlertCircle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {trainingProgress.filter((p) => p.status === "overdue").length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Training Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Training Progress</CardTitle>
              <CardDescription>Track employee training completion and send reminders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trainingProgress.map((progress) => (
                  <div key={progress.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback>
                          {progress.employeeName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium">{progress.employeeName}</h4>
                          <Badge className={getStatusColor(progress.status)}>
                            {getStatusIcon(progress.status)} {progress.status}
                          </Badge>
                        </div>
                        <p className="text-sm font-medium text-blue-600">{progress.courseName}</p>
                        <p className="text-sm text-muted-foreground">{progress.provider}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <div className="flex items-center space-x-2">
                            <Progress value={progress.progress} className="w-32" />
                            <span className="text-sm font-medium">{progress.progress}%</span>
                          </div>
                          <span className="text-sm text-muted-foreground">Started: {progress.startDate}</span>
                          <span className="text-sm text-muted-foreground">Due: {progress.expectedCompletion}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {progress.status === "overdue" && (
                        <Button size="sm" variant="outline" onClick={() => sendReminder(progress.id)}>
                          <Mail className="h-3 w-3 mr-1" />
                          Send Reminder
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-blue-600" />
                Training Analytics
              </CardTitle>
              <CardDescription>Insights and metrics on training effectiveness</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Completion Rates by Department</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Engineering</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={85} className="w-20" />
                        <span className="text-sm">85%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Marketing</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={72} className="w-20" />
                        <span className="text-sm">72%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Sales</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={90} className="w-20" />
                        <span className="text-sm">90%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Popular Training Categories</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Technical Skills</span>
                      <span className="text-sm font-medium">45%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Leadership</span>
                      <span className="text-sm font-medium">25%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Certifications</span>
                      <span className="text-sm font-medium">20%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Soft Skills</span>
                      <span className="text-sm font-medium">10%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

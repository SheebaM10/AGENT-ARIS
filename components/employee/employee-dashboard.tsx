"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  User,
  GraduationCap,
  TrendingUp,
  Bell,
  Settings,
  Search,
  Award,
  BookOpen,
  Target,
  CheckCircle,
  Clock,
  Star,
  ArrowRight,
} from "lucide-react"
import { Input } from "@/components/ui/input"

export function EmployeeDashboard() {
  const [activeTab, setActiveTab] = useState("profile")

  // Mock employee data
  const employee = {
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    role: "Senior Frontend Developer",
    department: "Engineering",
    competencyScore: 85,
    currentProject: "E-commerce Platform Redesign",
    skills: [
      { name: "React", level: 90, verified: true },
      { name: "TypeScript", level: 85, verified: true },
      { name: "Node.js", level: 75, verified: false },
      { name: "AWS", level: 60, verified: false },
    ],
    certifications: [
      { name: "AWS Solutions Architect", status: "completed", date: "2024-01-15" },
      { name: "React Advanced Patterns", status: "in-progress", progress: 65 },
    ],
    careerPath: {
      current: "Senior Frontend Developer",
      next: "Lead Frontend Developer",
      readiness: 75,
      requiredSkills: ["Team Leadership", "System Architecture", "Mentoring"],
    },
  }

  const notifications = [
    {
      id: 1,
      type: "shortlist",
      title: "You've been shortlisted!",
      description: "Mobile App Development Project - React Native",
      time: "2 hours ago",
      status: "new",
    },
    {
      id: 2,
      type: "training",
      title: "Training approved",
      description: "AWS Certification course has been approved by your manager",
      time: "1 day ago",
      status: "read",
    },
    {
      id: 3,
      type: "career",
      title: "Career path update",
      description: "New skills identified for Lead Developer role",
      time: "3 days ago",
      status: "read",
    },
  ]

  const recommendedTraining = [
    {
      id: 1,
      title: "Advanced React Patterns",
      provider: "Tech Academy",
      duration: "8 hours",
      type: "free",
      rating: 4.8,
      relevance: 95,
    },
    {
      id: 2,
      title: "AWS Solutions Architect",
      provider: "AWS Training",
      duration: "40 hours",
      type: "paid",
      rating: 4.9,
      relevance: 85,
    },
    {
      id: 3,
      title: "Team Leadership Fundamentals",
      provider: "Leadership Institute",
      duration: "16 hours",
      type: "paid",
      rating: 4.7,
      relevance: 80,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="flex h-16 items-center px-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold">AGENT ARIS</h1>
            <Badge variant="outline">Employee Portal</Badge>
          </div>

          <div className="ml-auto flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search training, skills..." className="pl-8 w-64" />
            </div>
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4" />
              {notifications.filter((n) => n.status === "new").length > 0 && (
                <span className="ml-1 bg-red-500 text-white text-xs rounded-full px-1">
                  {notifications.filter((n) => n.status === "new").length}
                </span>
              )}
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-card min-h-[calc(100vh-4rem)]">
          <nav className="p-4 space-y-2">
            <Button
              variant={activeTab === "profile" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("profile")}
            >
              <User className="mr-2 h-4 w-4" />
              Profile Dashboard
            </Button>
            <Button
              variant={activeTab === "training" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("training")}
            >
              <GraduationCap className="mr-2 h-4 w-4" />
              Training Center
            </Button>
            <Button
              variant={activeTab === "career" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("career")}
            >
              <TrendingUp className="mr-2 h-4 w-4" />
              Career Path
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Profile Dashboard</h2>
              </div>

              {/* Profile Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src="/placeholder.svg?height=64&width=64" />
                        <AvatarFallback>SJ</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-xl">{employee.name}</CardTitle>
                        <CardDescription className="text-base">{employee.role}</CardDescription>
                        <p className="text-sm text-muted-foreground">{employee.department}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">Current Project</p>
                        <p className="text-sm text-muted-foreground">{employee.currentProject}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Competency Score</p>
                        <div className="flex items-center space-x-2">
                          <Progress value={employee.competencyScore} className="flex-1" />
                          <span className="text-sm font-medium">{employee.competencyScore}%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Bell className="mr-2 h-4 w-4" />
                      Notifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {notifications.slice(0, 3).map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-3 rounded-lg border ${
                            notification.status === "new" ? "bg-blue-50 border-blue-200" : "bg-gray-50"
                          }`}
                        >
                          <h4 className="font-medium text-sm">{notification.title}</h4>
                          <p className="text-xs text-muted-foreground">{notification.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Skills Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>Skills & Competencies</CardTitle>
                  <CardDescription>Your current skill levels and verifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {employee.skills.map((skill, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{skill.name}</span>
                            {skill.verified && <CheckCircle className="h-4 w-4 text-green-600" />}
                          </div>
                          <Progress value={skill.level} className="mt-2" />
                        </div>
                        <span className="text-sm font-medium ml-4">{skill.level}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Certifications */}
              <Card>
                <CardHeader>
                  <CardTitle>Certifications</CardTitle>
                  <CardDescription>Your completed and in-progress certifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {employee.certifications.map((cert, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Award className="h-5 w-5 text-blue-600" />
                          <div>
                            <h4 className="font-medium">{cert.name}</h4>
                            {cert.status === "completed" && (
                              <p className="text-sm text-muted-foreground">Completed on {cert.date}</p>
                            )}
                            {cert.status === "in-progress" && (
                              <div className="flex items-center space-x-2 mt-1">
                                <Progress value={cert.progress} className="w-32" />
                                <span className="text-sm">{cert.progress}%</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <Badge variant={cert.status === "completed" ? "default" : "secondary"}>
                          {cert.status === "completed" ? "Completed" : "In Progress"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "training" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Training Center</h2>
              </div>

              {/* Recommended Training */}
              <Card>
                <CardHeader>
                  <CardTitle>Recommended for You</CardTitle>
                  <CardDescription>AI-curated training based on your career goals and skill gaps</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {recommendedTraining.map((course) => (
                      <Card key={course.id} className="cursor-pointer hover:shadow-md transition-shadow">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <CardTitle className="text-base">{course.title}</CardTitle>
                            <Badge variant={course.type === "free" ? "secondary" : "outline"}>{course.type}</Badge>
                          </div>
                          <CardDescription>{course.provider}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Duration: {course.duration}</span>
                              <div className="flex items-center">
                                <Star className="h-3 w-3 text-yellow-500 mr-1" />
                                <span>{course.rating}</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Relevance</span>
                              <span className="font-medium">{course.relevance}%</span>
                            </div>
                            <Button className="w-full mt-3" size="sm">
                              {course.type === "free" ? "Enroll Now" : "Request Approval"}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Current Training */}
              <Card>
                <CardHeader>
                  <CardTitle>Current Training</CardTitle>
                  <CardDescription>Your ongoing training programs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <BookOpen className="h-5 w-5 text-blue-600" />
                        <div>
                          <h4 className="font-medium">React Advanced Patterns</h4>
                          <p className="text-sm text-muted-foreground">Tech Academy</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Progress value={65} className="w-24" />
                          <span className="text-sm">65%</span>
                        </div>
                        <Button size="sm">Continue</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "career" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Career Path</h2>
              </div>

              {/* Career Progression */}
              <Card>
                <CardHeader>
                  <CardTitle>Career Progression</CardTitle>
                  <CardDescription>Your path to the next level</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4 p-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                        <User className="h-8 w-8 text-blue-600" />
                      </div>
                      <p className="font-medium">{employee.careerPath.current}</p>
                      <p className="text-sm text-muted-foreground">Current Role</p>
                    </div>
                    <ArrowRight className="h-6 w-6 text-muted-foreground" />
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
                        <Target className="h-8 w-8 text-green-600" />
                      </div>
                      <p className="font-medium">{employee.careerPath.next}</p>
                      <p className="text-sm text-muted-foreground">Next Role</p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Readiness</span>
                      <span className="text-sm font-medium">{employee.careerPath.readiness}%</span>
                    </div>
                    <Progress value={employee.careerPath.readiness} />
                  </div>
                </CardContent>
              </Card>

              {/* Required Skills */}
              <Card>
                <CardHeader>
                  <CardTitle>Skills for Next Level</CardTitle>
                  <CardDescription>Skills you need to develop for promotion</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {employee.careerPath.requiredSkills.map((skill, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Clock className="h-4 w-4 text-orange-600" />
                          <span className="font-medium">{skill}</span>
                        </div>
                        <Button size="sm" variant="outline">
                          Find Training
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Career Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle>Career Recommendations</CardTitle>
                  <CardDescription>AI-powered suggestions for your career development</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-medium text-blue-900">Leadership Training Recommended</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Based on your career path, we recommend completing leadership fundamentals training.
                      </p>
                      <Button size="sm" className="mt-2">
                        View Training Options
                      </Button>
                    </div>
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="font-medium text-green-900">Mentoring Opportunity</h4>
                      <p className="text-sm text-green-700 mt-1">
                        Consider mentoring junior developers to build leadership experience.
                      </p>
                      <Button size="sm" variant="outline" className="mt-2 bg-transparent">
                        Learn More
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

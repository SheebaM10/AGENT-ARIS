"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  TrendingUp,
  Users,
  Target,
  Brain,
  Mail,
  Eye,
  CheckCircle,
  Clock,
  AlertTriangle,
  BookOpen,
  Star,
} from "lucide-react"

interface Employee {
  id: string
  name: string
  email: string
  currentRole: string
  department: string
  experience: number
  performanceScore: number
  skills: string[]
  certifications: string[]
  readinessScore: number
  nextRole?: string
  skillGaps: string[]
  manager: string
  promotionReadiness: "ready" | "developing" | "not-ready"
}

interface CareerRole {
  id: string
  title: string
  department: string
  level: number
  requiredSkills: string[]
  requiredExperience: number
  requiredCertifications: string[]
  description: string
}

export function CareerPathModeling() {
  const [activeTab, setActiveTab] = useState("analysis")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [selectedRole, setSelectedRole] = useState("")

  // Mock career roles
  const [careerRoles] = useState<CareerRole[]>([
    {
      id: "1",
      title: "Lead Frontend Developer",
      department: "Engineering",
      level: 4,
      requiredSkills: ["React", "TypeScript", "Team Leadership", "System Architecture", "Mentoring"],
      requiredExperience: 5,
      requiredCertifications: ["AWS Solutions Architect"],
      description: "Lead frontend development initiatives and mentor junior developers",
    },
    {
      id: "2",
      title: "Engineering Manager",
      department: "Engineering",
      level: 5,
      requiredSkills: ["Team Management", "Strategic Planning", "Technical Leadership", "Budget Management"],
      requiredExperience: 7,
      requiredCertifications: ["PMP", "Leadership Certification"],
      description: "Manage engineering teams and drive technical strategy",
    },
    {
      id: "3",
      title: "Senior Product Manager",
      department: "Product",
      level: 4,
      requiredSkills: ["Product Strategy", "Market Analysis", "Stakeholder Management", "Data Analysis"],
      requiredExperience: 5,
      requiredCertifications: ["Product Management Certification"],
      description: "Drive product strategy and roadmap execution",
    },
  ])

  // Mock employee analysis results
  const [employees] = useState<Employee[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      currentRole: "Senior Frontend Developer",
      department: "Engineering",
      experience: 5,
      performanceScore: 92,
      skills: ["React", "TypeScript", "Node.js", "AWS"],
      certifications: ["AWS Solutions Architect"],
      readinessScore: 85,
      nextRole: "Lead Frontend Developer",
      skillGaps: ["Team Leadership", "Mentoring"],
      manager: "Mike Chen",
      promotionReadiness: "ready",
    },
    {
      id: "2",
      name: "David Rodriguez",
      email: "david.rodriguez@company.com",
      currentRole: "Frontend Developer",
      department: "Engineering",
      experience: 3,
      performanceScore: 88,
      skills: ["React", "JavaScript", "CSS"],
      certifications: [],
      readinessScore: 65,
      nextRole: "Senior Frontend Developer",
      skillGaps: ["TypeScript", "System Architecture", "AWS"],
      manager: "Lisa Park",
      promotionReadiness: "developing",
    },
    {
      id: "3",
      name: "Emily Chen",
      email: "emily.chen@company.com",
      currentRole: "Junior Developer",
      department: "Engineering",
      experience: 1,
      performanceScore: 75,
      skills: ["JavaScript", "HTML", "CSS"],
      certifications: [],
      readinessScore: 35,
      nextRole: "Frontend Developer",
      skillGaps: ["React", "TypeScript", "Testing", "Version Control"],
      manager: "Mike Chen",
      promotionReadiness: "not-ready",
    },
  ])

  const handleAnalysis = async () => {
    setIsAnalyzing(true)
    // Simulate AI analysis
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsAnalyzing(false)
  }

  const sendShortlistEmail = (employee: Employee) => {
    alert(`Shortlist email sent to ${employee.name} for ${employee.nextRole} position`)
  }

  const sendTrainingPlan = (employee: Employee) => {
    alert(`Training plan sent to ${employee.name} for skill development`)
  }

  const getReadinessColor = (readiness: Employee["promotionReadiness"]) => {
    switch (readiness) {
      case "ready":
        return "bg-green-100 text-green-800"
      case "developing":
        return "bg-yellow-100 text-yellow-800"
      case "not-ready":
        return "bg-red-100 text-red-800"
    }
  }

  const getReadinessIcon = (readiness: Employee["promotionReadiness"]) => {
    switch (readiness) {
      case "ready":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "developing":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "not-ready":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Career Path Modeling</h2>
          <p className="text-muted-foreground">AI-powered career development and promotion readiness analysis</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="analysis">Role Analysis</TabsTrigger>
          <TabsTrigger value="candidates">Promotion Candidates</TabsTrigger>
          <TabsTrigger value="pipeline">Leadership Pipeline</TabsTrigger>
        </TabsList>

        <TabsContent value="analysis" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="mr-2 h-5 w-5 text-blue-600" />
                Career Role Analysis
              </CardTitle>
              <CardDescription>Upload career role requirements for AI-powered employee matching</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role-title">Role Title</Label>
                  <Input id="role-title" placeholder="e.g., Lead Frontend Developer" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input id="department" placeholder="e.g., Engineering" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role-requirements">Role Requirements</Label>
                <Textarea
                  id="role-requirements"
                  placeholder="Enter required skills, experience, certifications..."
                  className="min-h-32"
                />
              </div>

              <Button onClick={handleAnalysis} disabled={isAnalyzing}>
                {isAnalyzing ? (
                  <>
                    <Brain className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing Candidates...
                  </>
                ) : (
                  <>
                    <Target className="mr-2 h-4 w-4" />
                    Analyze Career Readiness
                  </>
                )}
              </Button>

              {isAnalyzing && (
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>AI Career Analysis in Progress</span>
                        <span>Processing...</span>
                      </div>
                      <Progress value={75} className="w-full" />
                      <p className="text-xs text-muted-foreground">
                        Analyzing employee profiles and career readiness...
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>

          {/* Available Roles */}
          <Card>
            <CardHeader>
              <CardTitle>Available Career Roles</CardTitle>
              <CardDescription>Predefined career paths and role requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {careerRoles.map((role) => (
                  <Card key={role.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">{role.title}</CardTitle>
                      <CardDescription>
                        {role.department} • Level {role.level}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium mb-1">Required Skills</p>
                          <div className="flex flex-wrap gap-1">
                            {role.requiredSkills.slice(0, 3).map((skill, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {role.requiredSkills.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{role.requiredSkills.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Experience: {role.requiredExperience}+ years</span>
                        </div>
                        <Button size="sm" className="w-full">
                          Analyze Candidates
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="candidates" className="space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ready for Promotion</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {employees.filter((e) => e.promotionReadiness === "ready").length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Developing</CardTitle>
                <Clock className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {employees.filter((e) => e.promotionReadiness === "developing").length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Needs Development</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {employees.filter((e) => e.promotionReadiness === "not-ready").length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Readiness</CardTitle>
                <TrendingUp className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(employees.reduce((sum, e) => sum + e.readinessScore, 0) / employees.length)}%
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Promotion Candidates */}
          <Card>
            <CardHeader>
              <CardTitle>Promotion Candidates</CardTitle>
              <CardDescription>Employees analyzed for career advancement opportunities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {employees.map((employee) => (
                  <div key={employee.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback>
                          {employee.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium">{employee.name}</h4>
                          <Badge className={getReadinessColor(employee.promotionReadiness)}>
                            {getReadinessIcon(employee.promotionReadiness)}
                            {employee.promotionReadiness.replace("-", " ")}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {employee.currentRole} → {employee.nextRole}
                        </p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-sm text-muted-foreground">
                            Performance: {employee.performanceScore}%
                          </span>
                          <span className="text-sm text-muted-foreground">Experience: {employee.experience} years</span>
                          <div className="flex items-center space-x-1">
                            <span className="text-sm text-muted-foreground">Readiness:</span>
                            <Progress value={employee.readinessScore} className="w-16" />
                            <span className="text-sm font-medium">{employee.readinessScore}%</span>
                          </div>
                        </div>
                        {employee.skillGaps.length > 0 && (
                          <div className="mt-2">
                            <p className="text-sm text-orange-600">Skill Gaps: {employee.skillGaps.join(", ")}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {employee.promotionReadiness === "ready" && (
                        <Button size="sm" onClick={() => sendShortlistEmail(employee)}>
                          <Mail className="mr-1 h-3 w-3" />
                          Shortlist
                        </Button>
                      )}
                      <Button size="sm" variant="outline" onClick={() => sendTrainingPlan(employee)}>
                        <BookOpen className="mr-1 h-3 w-3" />
                        Training Plan
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="mr-1 h-3 w-3" />
                        Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pipeline" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-blue-600" />
                Leadership Pipeline
              </CardTitle>
              <CardDescription>Track leadership development and succession planning</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Pipeline Visualization */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="text-center">
                      <CardTitle className="text-lg">Individual Contributors</CardTitle>
                      <CardDescription>Senior level employees</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600 mb-2">12</div>
                        <p className="text-sm text-muted-foreground">Ready for leadership roles</p>
                        <div className="mt-4 space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Engineering</span>
                            <span className="font-medium">8</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span>Product</span>
                            <span className="font-medium">2</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span>Design</span>
                            <span className="font-medium">2</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="text-center">
                      <CardTitle className="text-lg">Team Leads</CardTitle>
                      <CardDescription>First-line managers</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600 mb-2">6</div>
                        <p className="text-sm text-muted-foreground">Ready for senior management</p>
                        <div className="mt-4 space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Engineering</span>
                            <span className="font-medium">4</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span>Product</span>
                            <span className="font-medium">1</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span>Design</span>
                            <span className="font-medium">1</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="text-center">
                      <CardTitle className="text-lg">Senior Managers</CardTitle>
                      <CardDescription>Department heads</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600 mb-2">3</div>
                        <p className="text-sm text-muted-foreground">Ready for executive roles</p>
                        <div className="mt-4 space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Engineering</span>
                            <span className="font-medium">2</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span>Product</span>
                            <span className="font-medium">1</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* High Potential Employees */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Star className="mr-2 h-4 w-4 text-yellow-500" />
                      High Potential Employees
                    </CardTitle>
                    <CardDescription>Top performers identified for accelerated development</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {employees
                        .filter((e) => e.performanceScore >= 90)
                        .map((employee) => (
                          <div key={employee.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                                <AvatarFallback className="text-xs">
                                  {employee.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-medium text-sm">{employee.name}</h4>
                                <p className="text-xs text-muted-foreground">{employee.currentRole}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant="secondary" className="text-xs">
                                {employee.performanceScore}% Performance
                              </Badge>
                              <Button size="sm" variant="outline">
                                Development Plan
                              </Button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

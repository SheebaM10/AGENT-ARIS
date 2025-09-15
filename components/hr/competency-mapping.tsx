"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Brain, CheckCircle, Clock, AlertCircle, UserPlus, Mail, FileText, Calendar } from "lucide-react"

interface Employee {
  id: string
  name: string
  email: string
  currentProject?: string
  skills: string[]
  experience: number
  availability: "available" | "busy"
  matchPercentage: number
  category: "ready-now" | "ready-2weeks" | "ready-4weeks" | "recruitment-needed"
  gaps?: string[]
  manager?: string
}

export function CompetencyMapping() {
  const [activeTab, setActiveTab] = useState("upload")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [projectRequirements, setProjectRequirements] = useState("")
  const [projectTitle, setProjectTitle] = useState("")

  // Mock employee data
  const [employees] = useState<Employee[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      skills: ["React", "TypeScript", "Node.js", "AWS"],
      experience: 5,
      availability: "available",
      matchPercentage: 95,
      category: "ready-now",
      manager: "Mike Chen",
    },
    {
      id: "2",
      name: "David Rodriguez",
      email: "david.rodriguez@company.com",
      currentProject: "E-commerce Platform",
      skills: ["React", "JavaScript", "MongoDB"],
      experience: 3,
      availability: "busy",
      matchPercentage: 85,
      category: "ready-now",
      manager: "Lisa Park",
    },
    {
      id: "3",
      name: "Emily Chen",
      email: "emily.chen@company.com",
      skills: ["JavaScript", "HTML", "CSS"],
      experience: 2,
      availability: "available",
      matchPercentage: 70,
      category: "ready-2weeks",
      gaps: ["TypeScript", "React Hooks"],
      manager: "Mike Chen",
    },
    {
      id: "4",
      name: "Alex Thompson",
      email: "alex.thompson@company.com",
      skills: ["Python", "Django", "PostgreSQL"],
      experience: 4,
      availability: "available",
      matchPercentage: 45,
      category: "ready-4weeks",
      gaps: ["React", "TypeScript", "Frontend Development"],
      manager: "Sarah Wilson",
    },
  ])

  const handleAnalysis = async () => {
    setIsAnalyzing(true)
    // Simulate AI analysis
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsAnalyzing(false)
    setAnalysisComplete(true)
    setActiveTab("results")
  }

  const getCategoryIcon = (category: Employee["category"]) => {
    switch (category) {
      case "ready-now":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "ready-2weeks":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "ready-4weeks":
        return <Calendar className="h-4 w-4 text-orange-600" />
      case "recruitment-needed":
        return <UserPlus className="h-4 w-4 text-red-600" />
    }
  }

  const getCategoryColor = (category: Employee["category"]) => {
    switch (category) {
      case "ready-now":
        return "bg-green-100 text-green-800"
      case "ready-2weeks":
        return "bg-blue-100 text-blue-800"
      case "ready-4weeks":
        return "bg-orange-100 text-orange-800"
      case "recruitment-needed":
        return "bg-red-100 text-red-800"
    }
  }

  const categorizedEmployees = {
    "ready-now": employees.filter((e) => e.category === "ready-now"),
    "ready-2weeks": employees.filter((e) => e.category === "ready-2weeks"),
    "ready-4weeks": employees.filter((e) => e.category === "ready-4weeks"),
    "recruitment-needed": [],
  }

  const sendManagerEmail = (employee: Employee) => {
    // Simulate sending email to manager
    alert(`Email sent to ${employee.manager} for approval of ${employee.name}`)
  }

  const sendShortlistEmail = (employee: Employee) => {
    // Simulate sending shortlist email to employee
    alert(`Shortlist email sent to ${employee.name}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Competency Mapping</h2>
          <p className="text-muted-foreground">AI-powered skill matching and employee categorization</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="upload">Upload Requirements</TabsTrigger>
          <TabsTrigger value="results" disabled={!analysisComplete}>
            Analysis Results
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="mr-2 h-5 w-5 text-blue-600" />
                Project Requirements Analysis
              </CardTitle>
              <CardDescription>
                Upload your project requirements and let AI match them with employee skills
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="project-title">Project Title</Label>
                <Input
                  id="project-title"
                  placeholder="e.g., Mobile App Development"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="requirements">Skills & Requirements</Label>
                <Textarea
                  id="requirements"
                  placeholder="Enter required skills, certifications, and experience level..."
                  className="min-h-32"
                  value={projectRequirements}
                  onChange={(e) => setProjectRequirements(e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-4">
                <Button onClick={handleAnalysis} disabled={isAnalyzing || !projectTitle || !projectRequirements}>
                  {isAnalyzing ? (
                    <>
                      <Brain className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Start AI Analysis
                    </>
                  )}
                </Button>
              </div>

              {isAnalyzing && (
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>AI Analysis in Progress</span>
                        <span>Processing...</span>
                      </div>
                      <Progress value={66} className="w-full" />
                      <p className="text-xs text-muted-foreground">Comparing requirements with employee database...</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Analysis Results: {projectTitle}</CardTitle>
              <CardDescription>AI has categorized employees based on project requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{categorizedEmployees["ready-now"].length}</div>
                  <div className="text-sm text-muted-foreground">Ready Now</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{categorizedEmployees["ready-2weeks"].length}</div>
                  <div className="text-sm text-muted-foreground">Ready in 2 Weeks</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {categorizedEmployees["ready-4weeks"].length}
                  </div>
                  <div className="text-sm text-muted-foreground">Ready in 4 Weeks</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">1</div>
                  <div className="text-sm text-muted-foreground">Recruitment Needed</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ready Now */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
                Ready Now ({categorizedEmployees["ready-now"].length})
              </CardTitle>
              <CardDescription>Employees who fully match the skill requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categorizedEmployees["ready-now"].map((employee) => (
                  <div key={employee.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium">{employee.name}</h4>
                        <Badge className={getCategoryColor(employee.category)}>{employee.matchPercentage}% match</Badge>
                        {employee.availability === "busy" && (
                          <Badge variant="outline" className="text-red-600">
                            On Project: {employee.currentProject}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{employee.email}</p>
                      <p className="text-sm text-muted-foreground">
                        Skills: {employee.skills.join(", ")} • {employee.experience} years experience
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      {employee.availability === "available" ? (
                        <>
                          <Button size="sm" onClick={() => sendManagerEmail(employee)}>
                            <Mail className="mr-1 h-3 w-3" />
                            Request Manager Approval
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => sendShortlistEmail(employee)}>
                            Shortlist
                          </Button>
                        </>
                      ) : (
                        <Badge variant="secondary">Unavailable</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Ready in 2 Weeks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5 text-blue-600" />
                Ready in 2 Weeks ({categorizedEmployees["ready-2weeks"].length})
              </CardTitle>
              <CardDescription>Employees with minor skill gaps that can be filled quickly</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categorizedEmployees["ready-2weeks"].map((employee) => (
                  <div key={employee.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium">{employee.name}</h4>
                        <Badge className={getCategoryColor(employee.category)}>{employee.matchPercentage}% match</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{employee.email}</p>
                      <p className="text-sm text-muted-foreground">Current Skills: {employee.skills.join(", ")}</p>
                      {employee.gaps && (
                        <p className="text-sm text-orange-600">Skill Gaps: {employee.gaps.join(", ")}</p>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" onClick={() => sendManagerEmail(employee)}>
                        <Mail className="mr-1 h-3 w-3" />
                        Request Approval + Training
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Ready in 4 Weeks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-orange-600" />
                Ready in 4 Weeks ({categorizedEmployees["ready-4weeks"].length})
              </CardTitle>
              <CardDescription>Employees requiring significant upskilling</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categorizedEmployees["ready-4weeks"].map((employee) => (
                  <div key={employee.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium">{employee.name}</h4>
                        <Badge className={getCategoryColor(employee.category)}>{employee.matchPercentage}% match</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{employee.email}</p>
                      <p className="text-sm text-muted-foreground">Current Skills: {employee.skills.join(", ")}</p>
                      {employee.gaps && (
                        <p className="text-sm text-red-600">Major Skill Gaps: {employee.gaps.join(", ")}</p>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" onClick={() => sendManagerEmail(employee)}>
                        <Mail className="mr-1 h-3 w-3" />
                        Request Extended Training
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recruitment Needed */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserPlus className="mr-2 h-5 w-5 text-red-600" />
                Recruitment Needed
              </CardTitle>
              <CardDescription>No suitable internal candidates found</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <AlertCircle className="mx-auto h-12 w-12 text-red-600 mb-4" />
                <h3 className="text-lg font-medium mb-2">External Recruitment Required</h3>
                <p className="text-muted-foreground mb-4">
                  No internal employees match the required skill set for this project.
                </p>
                <Button>
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Job Description
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

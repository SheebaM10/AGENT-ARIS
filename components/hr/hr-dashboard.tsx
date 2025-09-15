"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Target,
  TrendingUp,
  FileText,
  Brain,
  GraduationCap,
  BarChart3,
  Settings,
  Bell,
  Search,
  Plus,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { CompetencyMapping } from "./competency-mapping"
import { TrainingManagement } from "../training/training-management"
import { CareerPathModeling } from "../career/career-path-modeling"
import { TrendsAnalytics } from "../analytics/trends-analytics"

export function HRDashboard() {
  // Excel upload state
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null)

  // Handle Excel file upload
  const handleExcelUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploading(true)
    setUploadError(null)
    setUploadSuccess(null)
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const XLSX = await import("xlsx")
      const reader = new FileReader()
      reader.onload = async (evt) => {
        const data = new Uint8Array(evt.target?.result as ArrayBuffer)
        const workbook = XLSX.read(data, { type: "array" })
        const sheetName = workbook.SheetNames[0]
        const sheet = workbook.Sheets[sheetName]
        const rows = XLSX.utils.sheet_to_json(sheet)
        // Insert each row into Supabase
        const { supabase } = await import("@/lib/supabaseClient")
        const { error } = await supabase.from("employee_details").insert(rows)
        if (error) setUploadError("Upload failed: " + error.message)
        else setUploadSuccess("Employee data uploaded successfully!")
        setUploading(false)
      }
      reader.readAsArrayBuffer(file)
    } catch (err) {
      setUploadError("Upload failed")
      setUploading(false)
    }
  }
  const [activeTab, setActiveTab] = useState("overview")
  const [employeeDetails, setEmployeeDetails] = useState<any[]>([])
  const [loadingDetails, setLoadingDetails] = useState(false)
  const [detailsError, setDetailsError] = useState<string | null>(null)

  // Fetch employee details on mount
  React.useEffect(() => {
    if (activeTab === "overview") {
      setLoadingDetails(true)
      setDetailsError(null)
      import("@/lib/supabaseClient").then(({ supabase }) => {
        supabase
          .from("employee_details")
          .select("id, employee_id, name, department, position, contact, skills, certifications")
          .then(({ data, error }) => {
            if (error) setDetailsError("Failed to load employee details")
            else setEmployeeDetails(data || [])
            setLoadingDetails(false)
          })
      })
    }
  }, [activeTab])

  const stats = [
    {
      title: "Total Employees",
      value: employeeDetails.length.toString(),
      change: "",
      icon: Users,
      color: "text-blue-600",
    }
  ]

  const recentActivities = [
    {
      id: 1,
      type: "competency",
      title: "New project requirements uploaded",
      description: "Mobile App Development - React Native",
      time: "2 hours ago",
      status: "processing",
    },
    {
      id: 2,
      type: "career",
      title: "Career path analysis completed",
      description: "Senior Developer positions - 12 candidates identified",
      time: "4 hours ago",
      status: "completed",
    },
    {
      id: 3,
      type: "training",
      title: "Training approval requested",
      description: "AWS Certification - 5 employees",
      time: "1 day ago",
      status: "pending",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="flex h-16 items-center px-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold">AGENT ARIS</h1>
            <Badge variant="secondary">HR Portal</Badge>
          </div>

          <div className="ml-auto flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search employees, projects..." className="pl-8 w-64" />
            </div>
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4" />
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
              variant={activeTab === "overview" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("overview")}
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              Overview
            </Button>
            <Button
              variant={activeTab === "competency" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("competency")}
            >
              <Brain className="mr-2 h-4 w-4" />
              Competency Mapping
            </Button>
            <Button
              variant={activeTab === "training" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("training")}
            >
              <GraduationCap className="mr-2 h-4 w-4" />
              Training Management
            </Button>
            <Button
              variant={activeTab === "career" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("career")}
            >
              <TrendingUp className="mr-2 h-4 w-4" />
              Career Path Modeling
            </Button>
            <Button
              variant={activeTab === "trends" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("trends")}
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              Trends & Insights
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Excel Upload Section */}
              <Card className="mb-6 p-4 rounded-xl shadow-md border border-gray-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl font-semibold">Upload Employee Data (Excel)</CardTitle>
                  <CardDescription className="text-gray-600">Import employees in bulk using an .xlsx file</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center gap-4">
                    <label htmlFor="excel-upload" className="w-full cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-lg p-6 bg-gray-50 hover:bg-gray-100 transition">
                      <span className="text-lg font-medium text-gray-700 mb-2">Drag & drop or click to select Excel file</span>
                      <span className="text-xs text-gray-500">Accepted format: .xlsx</span>
                      <input id="excel-upload" type="file" accept=".xlsx" onChange={handleExcelUpload} disabled={uploading} className="hidden" />
                    </label>
                    {uploading && <div className="mt-2 text-blue-600">Uploading...</div>}
                    {uploadError && <div className="mt-2 text-red-600">{uploadError}</div>}
                    {uploadSuccess && <div className="mt-2 text-green-600">{uploadSuccess}</div>}
                    <div className="mt-2 text-xs text-muted-foreground text-center">Columns should match: <b>id, employee_id, name, department, position, contact, skills, certifications</b></div>
                    <a
                      href="/employee_template.csv"
                      download
                      className="inline-block mt-2 text-blue-600 hover:underline text-sm"
                    >
                      Download sample CSV template
                    </a>
                  </div>
                </CardContent>
              </Card>
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Dashboard Overview</h2>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Project Analysis
                </Button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                      <stat.icon className={`h-4 w-4 ${stat.color}`} />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <p className="text-xs text-muted-foreground">
                        <span className={stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}>
                          {stat.change}
                        </span>{" "}
                        from last month
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Recent Activities */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                  <CardDescription>Latest AI-powered analysis and system activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium">{activity.title}</h4>
                          <p className="text-sm text-muted-foreground">{activity.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                        </div>
                        <Badge
                          variant={
                            activity.status === "completed"
                              ? "default"
                              : activity.status === "processing"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {activity.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Employee Details Table */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Employee Details</CardTitle>
                  <CardDescription>All employees in the system</CardDescription>
                </CardHeader>
                <CardContent>
                  {loadingDetails ? (
                    <div>Loading...</div>
                  ) : detailsError ? (
                    <div className="text-red-500">{detailsError}</div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-sm">
                        <thead>
                          <tr>
                            <th className="px-2 py-1 text-left">ID</th>
                            <th className="px-2 py-1 text-left">Employee ID</th>
                            <th className="px-2 py-1 text-left">Name</th>
                            <th className="px-2 py-1 text-left">Department</th>
                            <th className="px-2 py-1 text-left">Position</th>
                            <th className="px-2 py-1 text-left">Contact</th>
                            <th className="px-2 py-1 text-left">Skills</th>
                            <th className="px-2 py-1 text-left">Certifications</th>
                          </tr>
                        </thead>
                        <tbody>
                          {employeeDetails.map((emp) => (
                            <tr key={emp.id}>
                              <td className="px-2 py-1">{emp.id}</td>
                              <td className="px-2 py-1">{emp.employee_id}</td>
                              <td className="px-2 py-1">{emp.name}</td>
                              <td className="px-2 py-1">{emp.department}</td>
                              <td className="px-2 py-1">{emp.position}</td>
                              <td className="px-2 py-1">{emp.contact}</td>
                              <td className="px-2 py-1">{emp.skills || ""}</td>
                              <td className="px-2 py-1">{emp.certifications || ""}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </CardContent>
              </Card>
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Brain className="mr-2 h-5 w-5 text-blue-600" />
                      Competency Analysis
                    </CardTitle>
                    <CardDescription>Upload project requirements for AI-powered skill matching</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full">Start Analysis</Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="mr-2 h-5 w-5 text-green-600" />
                      Career Planning
                    </CardTitle>
                    <CardDescription>Identify promotion-ready employees and skill gaps</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-transparent" variant="outline">
                      View Candidates
                    </Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="mr-2 h-5 w-5 text-purple-600" />
                      Generate JD
                    </CardTitle>
                    <CardDescription>AI-generated job descriptions for recruitment needs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-transparent" variant="outline">
                      Create JD
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "competency" && <CompetencyMapping />}

          {activeTab === "training" && <TrainingManagement />}

          {activeTab === "career" && <CareerPathModeling />}

          {activeTab === "trends" && <TrendsAnalytics />}
        </main>
      </div>
    </div>
  )
}

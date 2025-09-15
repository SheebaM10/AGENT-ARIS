"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  Activity,
  Globe,
  Zap,
  Users,
  Target,
  Brain,
  Award,
  Download,
  RefreshCw,
} from "lucide-react"

interface TrendData {
  category: string
  trend: "up" | "down" | "stable"
  percentage: number
  description: string
  impact: "high" | "medium" | "low"
}

interface SkillDemand {
  skill: string
  demand: number
  growth: number
  salary: string
  jobs: number
}

export function TrendsAnalytics() {
  const [activeTab, setActiveTab] = useState("industry")
  const [timeRange, setTimeRange] = useState("6months")
  const [department, setDepartment] = useState("all")

  // Mock industry trends data
  const industryTrends: TrendData[] = [
    {
      category: "AI & Machine Learning",
      trend: "up",
      percentage: 45,
      description: "Explosive growth in AI adoption across industries",
      impact: "high",
    },
    {
      category: "Remote Work Technologies",
      trend: "up",
      percentage: 32,
      description: "Continued investment in remote collaboration tools",
      impact: "high",
    },
    {
      category: "Cybersecurity",
      trend: "up",
      percentage: 28,
      description: "Increasing focus on security infrastructure",
      impact: "high",
    },
    {
      category: "Cloud Computing",
      trend: "up",
      percentage: 25,
      description: "Migration to cloud-first architectures",
      impact: "medium",
    },
    {
      category: "Legacy System Maintenance",
      trend: "down",
      percentage: -15,
      description: "Declining demand for legacy technologies",
      impact: "medium",
    },
  ]

  // Mock skill demand data
  const skillDemand: SkillDemand[] = [
    { skill: "Python", demand: 95, growth: 23, salary: "$95k-$140k", jobs: 12500 },
    { skill: "React", demand: 88, growth: 18, salary: "$80k-$120k", jobs: 8900 },
    { skill: "AWS", demand: 92, growth: 35, salary: "$90k-$135k", jobs: 11200 },
    { skill: "TypeScript", demand: 85, growth: 42, salary: "$85k-$125k", jobs: 7800 },
    { skill: "Docker", demand: 78, growth: 28, salary: "$88k-$130k", jobs: 6500 },
    { skill: "Kubernetes", demand: 82, growth: 38, salary: "$95k-$145k", jobs: 5900 },
  ]

  // Mock company metrics
  const companyMetrics = {
    skillAlignment: 78,
    trainingEffectiveness: 85,
    careerProgression: 72,
    employeeRetention: 89,
    skillGapReduction: 15,
    promotionRate: 12,
  }

  const getTrendIcon = (trend: TrendData["trend"]) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      case "stable":
        return <Activity className="h-4 w-4 text-blue-600" />
    }
  }

  const getTrendColor = (trend: TrendData["trend"]) => {
    switch (trend) {
      case "up":
        return "text-green-600"
      case "down":
        return "text-red-600"
      case "stable":
        return "text-blue-600"
    }
  }

  const getImpactColor = (impact: TrendData["impact"]) => {
    switch (impact) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Trends & Analytics</h2>
          <p className="text-muted-foreground">Industry insights and organizational analytics</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">3 Months</SelectItem>
              <SelectItem value="6months">6 Months</SelectItem>
              <SelectItem value="1year">1 Year</SelectItem>
              <SelectItem value="2years">2 Years</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-1" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" />
            Export
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="industry">Industry Trends</TabsTrigger>
          <TabsTrigger value="skills">Skill Demand</TabsTrigger>
          <TabsTrigger value="company">Company Analytics</TabsTrigger>
          <TabsTrigger value="predictions">AI Predictions</TabsTrigger>
        </TabsList>

        <TabsContent value="industry" className="space-y-6">
          {/* Industry Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Trending Technologies</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+3</span> from last quarter
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Market Growth</CardTitle>
                <BarChart3 className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">28%</div>
                <p className="text-xs text-muted-foreground">Average industry growth</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Job Openings</CardTitle>
                <Users className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.3M</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+15%</span> from last year
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Salary Growth</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12%</div>
                <p className="text-xs text-muted-foreground">Average salary increase</p>
              </CardContent>
            </Card>
          </div>

          {/* Industry Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="mr-2 h-5 w-5 text-blue-600" />
                Industry Trends
              </CardTitle>
              <CardDescription>Latest market trends and technology adoption patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {industryTrends.map((trend, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      {getTrendIcon(trend.trend)}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium">{trend.category}</h4>
                          <Badge className={getImpactColor(trend.impact)}>{trend.impact} impact</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{trend.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${getTrendColor(trend.trend)}`}>
                        {trend.percentage > 0 ? "+" : ""}
                        {trend.percentage}%
                      </div>
                      <p className="text-xs text-muted-foreground">vs last period</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Technology Adoption */}
          <Card>
            <CardHeader>
              <CardTitle>Technology Adoption Rates</CardTitle>
              <CardDescription>How quickly new technologies are being adopted</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Artificial Intelligence</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={78} className="w-32" />
                    <span className="text-sm">78%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Cloud Computing</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={85} className="w-32" />
                    <span className="text-sm">85%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">DevOps Practices</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={72} className="w-32" />
                    <span className="text-sm">72%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Microservices</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={65} className="w-32" />
                    <span className="text-sm">65%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="space-y-6">
          {/* Skill Demand Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Most In-Demand</CardTitle>
                <Zap className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Python</div>
                <p className="text-xs text-muted-foreground">95% demand score</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Fastest Growing</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">TypeScript</div>
                <p className="text-xs text-muted-foreground">+42% growth</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Highest Salary</CardTitle>
                <Award className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Kubernetes</div>
                <p className="text-xs text-muted-foreground">$95k-$145k</p>
              </CardContent>
            </Card>
          </div>

          {/* Skill Demand Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="mr-2 h-5 w-5 text-blue-600" />
                Skill Demand Analysis
              </CardTitle>
              <CardDescription>Current market demand and growth trends for key skills</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {skillDemand.map((skill, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="font-bold text-blue-600">{skill.skill.charAt(0)}</span>
                      </div>
                      <div>
                        <h4 className="font-medium">{skill.skill}</h4>
                        <p className="text-sm text-muted-foreground">{skill.jobs.toLocaleString()} job openings</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <div className="text-sm font-medium">Demand</div>
                        <div className="flex items-center space-x-1">
                          <Progress value={skill.demand} className="w-16" />
                          <span className="text-sm">{skill.demand}%</span>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium">Growth</div>
                        <div className="text-sm font-bold text-green-600">+{skill.growth}%</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium">Salary Range</div>
                        <div className="text-sm font-bold">{skill.salary}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="company" className="space-y-6">
          {/* Company Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Skill Alignment</CardTitle>
                <CardDescription>How well employee skills match market demand</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <Progress value={companyMetrics.skillAlignment} className="h-3" />
                  </div>
                  <div className="text-2xl font-bold">{companyMetrics.skillAlignment}%</div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  <span className="text-green-600">+5%</span> from last quarter
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Training Effectiveness</CardTitle>
                <CardDescription>Success rate of training programs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <Progress value={companyMetrics.trainingEffectiveness} className="h-3" />
                  </div>
                  <div className="text-2xl font-bold">{companyMetrics.trainingEffectiveness}%</div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  <span className="text-green-600">+8%</span> from last quarter
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Career Progression</CardTitle>
                <CardDescription>Employee advancement rate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <Progress value={companyMetrics.careerProgression} className="h-3" />
                  </div>
                  <div className="text-2xl font-bold">{companyMetrics.careerProgression}%</div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  <span className="text-green-600">+3%</span> from last quarter
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Department Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Department Performance</CardTitle>
              <CardDescription>Skill development and career progression by department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Skill Gap Reduction</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Engineering</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={85} className="w-20" />
                          <span className="text-sm">85%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Product</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={72} className="w-20" />
                          <span className="text-sm">72%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Design</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={78} className="w-20" />
                          <span className="text-sm">78%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Marketing</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={65} className="w-20" />
                          <span className="text-sm">65%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">Training Completion Rate</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Engineering</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={92} className="w-20" />
                          <span className="text-sm">92%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Product</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={88} className="w-20" />
                          <span className="text-sm">88%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Design</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={95} className="w-20" />
                          <span className="text-sm">95%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Marketing</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={82} className="w-20" />
                          <span className="text-sm">82%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="mr-2 h-5 w-5 text-purple-600" />
                AI-Powered Predictions
              </CardTitle>
              <CardDescription>Machine learning insights and future trend predictions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Skill Demand Forecast</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">AI/ML Skills</span>
                          <Badge className="bg-green-100 text-green-800">+65% by 2025</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Cloud Architecture</span>
                          <Badge className="bg-blue-100 text-blue-800">+45% by 2025</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">DevSecOps</span>
                          <Badge className="bg-purple-100 text-purple-800">+38% by 2025</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Career Path Predictions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Ready for Promotion</span>
                          <Badge className="bg-green-100 text-green-800">8 employees</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Skill Gap Closure</span>
                          <Badge className="bg-blue-100 text-blue-800">3-6 months</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Training ROI</span>
                          <Badge className="bg-purple-100 text-purple-800">285%</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h4 className="font-medium text-blue-900">Invest in AI Training</h4>
                        <p className="text-sm text-blue-700 mt-1">
                          High demand growth predicted. Consider upskilling 15+ employees in AI/ML technologies.
                        </p>
                      </div>
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <h4 className="font-medium text-green-900">Accelerate Cloud Migration Skills</h4>
                        <p className="text-sm text-green-700 mt-1">
                          Strong market demand. Focus on AWS/Azure certifications for engineering team.
                        </p>
                      </div>
                      <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                        <h4 className="font-medium text-purple-900">Leadership Development Pipeline</h4>
                        <p className="text-sm text-purple-700 mt-1">
                          8 employees ready for promotion. Implement leadership training program.
                        </p>
                      </div>
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

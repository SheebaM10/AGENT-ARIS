"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Lock, Building2, User } from "lucide-react"

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (role: "hr" | "employee") => {
    setIsLoading(true)
    setError(null)
    let email = ""
    let password = ""
    if (role === "hr") {
      email = (document.getElementById("hr-email") as HTMLInputElement)?.value
      password = (document.getElementById("hr-password") as HTMLInputElement)?.value
    } else {
      email = (document.getElementById("employee-email") as HTMLInputElement)?.value
      password = (document.getElementById("employee-password") as HTMLInputElement)?.value
    }
    try {
      const { supabase } = await import("@/lib/supabaseClient")
      const table = role === "hr" ? "hr" : "employee"
      const { data, error } = await supabase
        .from(table)
        .select()
        .eq("email", email)
        .eq("password", password)
        .single()
      if (error || !data) {
        setError("Invalid credentials")
      } else {
        window.location.href = role === "hr" ? "/hr/dashboard" : "/employee/dashboard"
      }
    } catch (err) {
      setError("Login failed")
    }
    setIsLoading(false)
  }

  return (
    <Card className="w-full">
      {error && (
        <div className="text-red-500 text-center mb-2">{error}</div>
      )}
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Sign in to ARIS</CardTitle>
        <CardDescription className="text-center">Choose your role to access the appropriate portal</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="hr" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="hr" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              HR
            </TabsTrigger>
            <TabsTrigger value="employee" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Employee
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hr" className="space-y-4 mt-6">
            <div className="space-y-2">
              <Label htmlFor="hr-email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="hr-email" type="email" placeholder="hr@company.com" className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="hr-password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="hr-password" type="password" className="pl-10" />
              </div>
            </div>
            <Button className="w-full" onClick={() => handleLogin("hr")} disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in as HR"}
            </Button>
          </TabsContent>

          <TabsContent value="employee" className="space-y-4 mt-6">
            <div className="space-y-2">
              <Label htmlFor="employee-email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="employee-email" type="email" placeholder="employee@company.com" className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="employee-password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="employee-password" type="password" className="pl-10" />
              </div>
            </div>
            <Button className="w-full" onClick={() => handleLogin("employee")} disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in as Employee"}
            </Button>
          </TabsContent>
        </Tabs>

      </CardContent>
      <div className="mt-4 text-center">
        <a href="/signup" className="text-blue-600 hover:underline">Don't have an account? Sign up</a>
      </div>
    </Card>
  )
}

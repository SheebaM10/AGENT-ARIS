"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Lock, Building2, User } from "lucide-react"

export function SignupForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleSignup = async (role: "hr" | "employee") => {
    setIsLoading(true)
    setError(null)
    setSuccess(null)
    let email = ""
    let password = ""
    if (role === "hr") {
      email = (document.getElementById("hr-signup-email") as HTMLInputElement)?.value
      password = (document.getElementById("hr-signup-password") as HTMLInputElement)?.value
    } else {
      email = (document.getElementById("employee-signup-email") as HTMLInputElement)?.value
      password = (document.getElementById("employee-signup-password") as HTMLInputElement)?.value
    }
    try {
      const { supabase } = await import("@/lib/supabaseClient")
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) {
        setError("Signup failed: " + error.message)
      } else {
        setSuccess("Signup successful! Please check your email to confirm registration.")
      }
    } catch (err) {
      setError("Signup failed")
    }
    setIsLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 p-6">
      <Card className="w-full max-w-lg rounded-2xl shadow-2xl p-8 border border-gray-200">
        {error && (
          <div className="text-red-500 text-center mb-2">{error}</div>
        )}
        {success && (
          <div className="text-green-500 text-center mb-2">{success}</div>
        )}
        <CardHeader className="space-y-2 pb-0">
          <CardTitle className="text-3xl font-bold text-center">Sign up for ARIS</CardTitle>
          <CardDescription className="text-center text-base text-gray-600">Choose your role to create an account</CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          <Tabs defaultValue="employee" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="hr" className="flex items-center gap-2 py-2 text-lg">
                <Building2 className="h-5 w-5" />
                HR
              </TabsTrigger>
              <TabsTrigger value="employee" className="flex items-center gap-2 py-2 text-lg">
                <User className="h-5 w-5" />
                Employee
              </TabsTrigger>
            </TabsList>
            <TabsContent value="hr" className="space-y-4 mt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="hr-signup-email" className="font-medium">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input id="hr-signup-email" type="email" placeholder="hr@company.com" className="pl-12 py-3 text-base" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hr-signup-password" className="font-medium">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input id="hr-signup-password" type="password" className="pl-12 py-3 text-base" />
                  </div>
                </div>
                <Button className="w-full py-3 text-base font-semibold rounded-lg bg-black text-white hover:bg-gray-800 transition" onClick={() => handleSignup("hr")} disabled={isLoading}>
                  {isLoading ? "Signing up..." : "Sign up as HR"}
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="employee" className="space-y-4 mt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="employee-signup-email" className="font-medium">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input id="employee-signup-email" type="email" placeholder="employee@company.com" className="pl-12 py-3 text-base" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employee-signup-password" className="font-medium">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input id="employee-signup-password" type="password" className="pl-12 py-3 text-base" />
                  </div>
                </div>
                <Button className="w-full py-3 text-base font-semibold rounded-lg bg-black text-white hover:bg-gray-800 transition" onClick={() => handleSignup("employee")} disabled={isLoading}>
                  {isLoading ? "Signing up..." : "Sign up as Employee"}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <div className="mt-4 text-center">
          <a href="/" className="text-blue-600 hover:underline">Already signed up? Sign in</a>
        </div>
      </Card>
    </div>
  )
}

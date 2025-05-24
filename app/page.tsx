"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckSquare, Calendar, Quote, Timer, ArrowLeft } from "lucide-react"
import TodoSection from "@/components/todo-section"
import PlannerSection from "@/components/planner-section"
import QuotesSection from "@/components/quotes-section"
import PomodoroSection from "@/components/pomodoro-section"

type Section = "dashboard" | "todo" | "planner" | "quotes" | "pomodoro"

export default function ProductivityDashboard() {
  const [currentSection, setCurrentSection] = useState<Section>("dashboard")
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const sections = [
    {
      id: "todo" as Section,
      title: "To-Do List",
      description: "Manage your daily tasks",
      icon: CheckSquare,
      gradient: "from-blue-500 to-blue-600",
    },
    {
      id: "planner" as Section,
      title: "Daily Planner",
      description: "Schedule your day",
      icon: Calendar,
      gradient: "from-green-500 to-green-600",
    },
    {
      id: "quotes" as Section,
      title: "Motivation Quotes",
      description: "Get inspired",
      icon: Quote,
      gradient: "from-purple-500 to-purple-600",
    },
    {
      id: "pomodoro" as Section,
      title: "Pomodoro Timer",
      description: "Focus sessions",
      icon: Timer,
      gradient: "from-red-500 to-red-600",
    },
  ]

  if (currentSection !== "dashboard") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
        <div className="max-w-6xl mx-auto">
          <Button onClick={() => setCurrentSection("dashboard")} variant="outline" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>

          {currentSection === "todo" && <TodoSection />}
          {currentSection === "planner" && <PlannerSection />}
          {currentSection === "quotes" && <QuotesSection />}
          {currentSection === "pomodoro" && <PomodoroSection />}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Productivity Dashboard
          </h1>
          <div className="space-y-2">
            <div className="text-2xl font-semibold text-slate-700">
              {currentTime.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <div className="text-3xl font-mono text-slate-600">{currentTime.toLocaleTimeString()}</div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sections.map((section) => {
            const Icon = section.icon
            return (
              <Card
                key={section.id}
                className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl group overflow-hidden"
                onClick={() => setCurrentSection(section.id)}
              >
                <div className={`h-32 bg-gradient-to-br ${section.gradient} relative`}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon className="w-12 h-12 text-white" />
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{section.title}</CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="ghost"
                    className="w-full justify-start p-0 h-auto text-sm text-muted-foreground hover:text-foreground"
                  >
                    Click to open →
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Today's Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">8 completed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Focus Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2h 30m</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Productivity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85%</div>
              <p className="text-xs text-muted-foreground">Weekly average</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

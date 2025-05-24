"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, RotateCcw, Coffee } from "lucide-react"

export default function PomodoroSection() {
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [isBreak, setIsBreak] = useState(false)
  const [sessions, setSessions] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const totalSeconds = isBreak ? 5 * 60 : 25 * 60
  const currentSeconds = minutes * 60 + seconds
  const progress = ((totalSeconds - currentSeconds) / totalSeconds) * 100

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Timer finished
            setIsActive(false)
            if (isBreak) {
              // Break finished, start work session
              setIsBreak(false)
              setMinutes(25)
              setSeconds(0)
            } else {
              // Work session finished, start break
              setSessions((prev) => prev + 1)
              setIsBreak(true)
              setMinutes(5)
              setSeconds(0)
            }
            // Play notification sound (browser notification)
            if ("Notification" in window && Notification.permission === "granted") {
              new Notification(isBreak ? "Break time over!" : "Work session complete!")
            }
          } else {
            setMinutes((prev) => prev - 1)
            setSeconds(59)
          }
        } else {
          setSeconds((prev) => prev - 1)
        }
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isActive, minutes, seconds, isBreak])

  const startTimer = () => {
    setIsActive(true)
    // Request notification permission
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission()
    }
  }

  const pauseTimer = () => {
    setIsActive(false)
  }

  const resetTimer = () => {
    setIsActive(false)
    if (isBreak) {
      setMinutes(5)
      setSeconds(0)
    } else {
      setMinutes(25)
      setSeconds(0)
    }
  }

  const formatTime = (mins: number, secs: number) => {
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            ⏰ Pomodoro Timer
            {isBreak && (
              <Badge variant="secondary">
                <Coffee className="w-3 h-3 mr-1" />
                Break Time
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-6xl md:text-8xl font-mono font-bold text-slate-700 mb-4">
              {formatTime(minutes, seconds)}
            </div>
            <Progress value={progress} className="h-3 mb-4" />
            <div className="text-sm text-muted-foreground">
              {isBreak ? "Break time - relax and recharge" : "Focus time - stay concentrated"}
            </div>
          </div>

          <div className="flex justify-center gap-4">
            {!isActive ? (
              <Button onClick={startTimer} size="lg" className="bg-green-600 hover:bg-green-700">
                <Play className="w-5 h-5 mr-2" />
                Start
              </Button>
            ) : (
              <Button onClick={pauseTimer} size="lg" variant="outline">
                <Pause className="w-5 h-5 mr-2" />
                Pause
              </Button>
            )}
            <Button onClick={resetTimer} size="lg" variant="outline">
              <RotateCcw className="w-5 h-5 mr-2" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{sessions}</div>
            <div className="text-sm text-muted-foreground">Sessions Today</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{sessions * 25}m</div>
            <div className="text-sm text-muted-foreground">Focus Time</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{Math.floor(sessions / 4)}</div>
            <div className="text-sm text-muted-foreground">Long Breaks</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">How Pomodoro Works</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
            <li>Work for 25 minutes with full focus</li>
            <li>Take a 5-minute break</li>
            <li>Repeat the cycle</li>
            <li>After 4 cycles, take a longer 15-30 minute break</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  )
}

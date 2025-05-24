"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Trash2, Plus, Edit, Copy } from "lucide-react"

interface PlannerTask {
  id: string
  name: string
  from: string
  to: string
  completed: boolean
  date: string
}

interface DefaultTask {
  id: string
  name: string
  from: string
  to: string
}

export default function PlannerSection() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [tasks, setTasks] = useState<PlannerTask[]>([])
  const [defaultTasks, setDefaultTasks] = useState<DefaultTask[]>([
    { id: "1", name: "Morning Workout", from: "07:00", to: "08:00" },
    { id: "2", name: "Breakfast", from: "08:00", to: "08:30" },
    { id: "3", name: "Focus Work", from: "09:00", to: "12:00" },
  ])
  const [newTask, setNewTask] = useState({ name: "", from: "", to: "" })
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingDefault, setEditingDefault] = useState<DefaultTask | null>(null)

  useEffect(() => {
    const savedDefaults = localStorage.getItem("defaultTasks")
    if (savedDefaults) {
      setDefaultTasks(JSON.parse(savedDefaults))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("defaultTasks", JSON.stringify(defaultTasks))
  }, [defaultTasks])

  useEffect(() => {
    loadTasksForDate(selectedDate)
  }, [selectedDate])

  const loadTasksForDate = (date: string) => {
    const saved = localStorage.getItem(`planner_${date}`)
    if (saved) {
      setTasks(JSON.parse(saved))
    } else {
      setTasks([])
    }
  }

  const saveTasks = (tasksToSave: PlannerTask[]) => {
    localStorage.setItem(`planner_${selectedDate}`, JSON.stringify(tasksToSave))
    setTasks(tasksToSave)
  }

  const addTask = () => {
    if (newTask.name && newTask.from && newTask.to) {
      const task: PlannerTask = {
        id: Date.now().toString(),
        ...newTask,
        completed: false,
        date: selectedDate,
      }
      const updatedTasks = [...tasks, task]
      saveTasks(updatedTasks)
      setNewTask({ name: "", from: "", to: "" })
    }
  }

  const toggleTaskCompletion = (id: string) => {
    const updatedTasks = tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    saveTasks(updatedTasks)
  }

  const deleteTask = (id: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== id)
    saveTasks(updatedTasks)
  }

  const copyDefaultTasks = () => {
    const newTasks = defaultTasks.map((defaultTask) => ({
      id: Date.now().toString() + Math.random(),
      ...defaultTask,
      completed: false,
      date: selectedDate,
    }))
    const updatedTasks = [...tasks, ...newTasks]
    saveTasks(updatedTasks)
  }

  const addDefaultTask = () => {
    const newDefault: DefaultTask = {
      id: Date.now().toString(),
      name: "New Task",
      from: "09:00",
      to: "10:00",
    }
    setDefaultTasks([...defaultTasks, newDefault])
  }

  const updateDefaultTask = (id: string, updates: Partial<DefaultTask>) => {
    setDefaultTasks(defaultTasks.map((task) => (task.id === id ? { ...task, ...updates } : task)))
  }

  const deleteDefaultTask = (id: string) => {
    setDefaultTasks(defaultTasks.filter((task) => task.id !== id))
  }

  const completedCount = tasks.filter((task) => task.completed).length
  const totalTasks = tasks.length

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📅 Daily Planner
            <Badge variant="secondary">{totalTasks} tasks</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <Input
              placeholder="Task name"
              value={newTask.name}
              onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
            />
            <Input
              type="time"
              value={newTask.from}
              onChange={(e) => setNewTask({ ...newTask, from: e.target.value })}
            />
            <Input type="time" value={newTask.to} onChange={(e) => setNewTask({ ...newTask, to: e.target.value })} />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button onClick={addTask}>
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </Button>
            <Button variant="outline" onClick={copyDefaultTasks}>
              <Copy className="w-4 h-4 mr-2" />
              Copy Defaults
            </Button>
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Defaults
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Edit Default Tasks</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {defaultTasks.map((task) => (
                    <div key={task.id} className="grid grid-cols-12 gap-2 items-center">
                      <Input
                        className="col-span-6"
                        value={task.name}
                        onChange={(e) => updateDefaultTask(task.id, { name: e.target.value })}
                      />
                      <Input
                        className="col-span-2"
                        type="time"
                        value={task.from}
                        onChange={(e) => updateDefaultTask(task.id, { from: e.target.value })}
                      />
                      <Input
                        className="col-span-2"
                        type="time"
                        value={task.to}
                        onChange={(e) => updateDefaultTask(task.id, { to: e.target.value })}
                      />
                      <Button
                        className="col-span-2"
                        variant="outline"
                        size="sm"
                        onClick={() => deleteDefaultTask(task.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button onClick={addDefaultTask} variant="outline" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Default Task
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {totalTasks > 0 && (
            <div className="text-sm text-muted-foreground">
              Progress: {completedCount}/{totalTasks} tasks completed
            </div>
          )}
        </CardContent>
      </Card>

      <div className="space-y-3">
        {tasks.map((task) => (
          <Card key={task.id} className={`transition-all ${task.completed ? "opacity-60" : ""}`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  <Checkbox checked={task.completed} onCheckedChange={() => toggleTaskCompletion(task.id)} />
                  <div className="flex-1">
                    <div className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                      {task.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {task.from} - {task.to}
                    </div>
                  </div>
                  {task.completed && <Badge variant="secondary">Completed</Badge>}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteTask(task.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {tasks.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              No tasks scheduled for this date. Add a task or copy from defaults!
            </CardContent>
          </Card>
        )}
      </div>

      {/* Real-time Task Completion Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Task Completion Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{totalTasks}</div>
              <div className="text-sm text-muted-foreground">Total Tasks</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{completedCount}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{totalTasks - completedCount}</div>
              <div className="text-sm text-muted-foreground">Remaining</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0}%
              </div>
              <div className="text-sm text-muted-foreground">Completion Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

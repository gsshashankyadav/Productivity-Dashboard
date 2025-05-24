"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trash2, Star } from "lucide-react"

interface Todo {
  id: string
  text: string
  done: boolean
  important: boolean
  createdAt: Date
}

export default function TodoSection() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState("")
  const [isImportant, setIsImportant] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("todos")
    if (saved) {
      setTodos(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo: Todo = {
        id: Date.now().toString(),
        text: newTodo.trim(),
        done: false,
        important: isImportant,
        createdAt: new Date(),
      }
      setTodos([...todos, todo])
      setNewTodo("")
      setIsImportant(false)
    }
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)))
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const completedCount = todos.filter((todo) => todo.done).length
  const progressPercentage = todos.length > 0 ? (completedCount / todos.length) * 100 : 0

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📝 To-Do List
            <Badge variant="secondary">{todos.length} tasks</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new task..."
              onKeyDown={(e) => e.key === "Enter" && addTodo()}
              className="flex-1"
            />
            <Button onClick={addTodo} className="sm:w-auto w-full">
              Add Task
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="important"
              checked={isImportant}
              onCheckedChange={(checked) => setIsImportant(checked as boolean)}
            />
            <label
              htmlFor="important"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Mark as important
            </label>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Progress</span>
              <span>
                {completedCount}/{todos.length} completed
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {todos.map((todo) => (
          <Card key={todo.id} className={`transition-all ${todo.done ? "opacity-60" : ""}`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  <Checkbox checked={todo.done} onCheckedChange={() => toggleTodo(todo.id)} />
                  <div className="flex-1">
                    <span className={`${todo.done ? "line-through text-muted-foreground" : ""}`}>{todo.text}</span>
                    {todo.important && (
                      <Badge variant="destructive" className="ml-2">
                        <Star className="w-3 h-3 mr-1" />
                        Important
                      </Badge>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteTodo(todo.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {todos.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              No tasks yet. Add your first task above!
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

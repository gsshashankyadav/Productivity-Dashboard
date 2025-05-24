"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCw, Heart } from "lucide-react"

const quotes = [
  "Push yourself, because no one else is going to do it for you.",
  "Great things never come from comfort zones.",
  "Success doesn't just find you. You have to go out and get it.",
  "Dream bigger. Do bigger.",
  "The way to get started is to quit talking and begin doing.",
  "Innovation distinguishes between a leader and a follower.",
  "Your limitation—it's only your imagination.",
  "Sometimes later becomes never. Do it now.",
  "Don't wait for opportunity. Create it.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
]

export default function QuotesSection() {
  const [currentQuote, setCurrentQuote] = useState("")
  const [isLiked, setIsLiked] = useState(false)

  const generateNewQuote = () => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
    setCurrentQuote(randomQuote)
    setIsLiked(false)
  }

  useEffect(() => {
    generateNewQuote()
  }, [])

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="text-center">
        <CardHeader>
          <CardTitle className="text-2xl">💡 Daily Motivation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="min-h-[120px] flex items-center justify-center">
            <blockquote className="text-xl md:text-2xl font-medium italic text-slate-700 leading-relaxed">
              "{currentQuote}"
            </blockquote>
          </div>

          <div className="flex justify-center gap-4">
            <Button onClick={generateNewQuote} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              New Quote
            </Button>
            <Button
              onClick={() => setIsLiked(!isLiked)}
              variant={isLiked ? "default" : "outline"}
              className={isLiked ? "bg-red-500 hover:bg-red-600" : ""}
            >
              <Heart className={`w-4 h-4 mr-2 ${isLiked ? "fill-current" : ""}`} />
              {isLiked ? "Liked" : "Like"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">127</div>
            <div className="text-sm text-muted-foreground">Quotes Read</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">23</div>
            <div className="text-sm text-muted-foreground">Quotes Liked</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">7</div>
            <div className="text-sm text-muted-foreground">Day Streak</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

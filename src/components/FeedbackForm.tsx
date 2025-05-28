"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Send } from "lucide-react"

export function FeedbackForm() {
  const [feedbackType, setFeedbackType] = useState("general")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")

  const handleSendFeedback = () => {
    const emailSubject = `[OllamaDiffuser] ${feedbackType.charAt(0).toUpperCase() + feedbackType.slice(1)}: ${subject || 'Feedback'}`
    const emailBody = `Hi OllamaDiffuser Team,\n\nFeedback Type: ${feedbackType.charAt(0).toUpperCase() + feedbackType.slice(1)}\n\nMessage:\n${message}\n\nBest regards`
    
    window.location.href = `mailto:feedback@ollamadiffuser.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Mail className="h-5 w-5 text-green-500" />
          <span>Contact Form</span>
        </CardTitle>
        <CardDescription>
          Send us your feedback directly (opens your email client)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="feedback-type">Feedback Type</Label>
          <select 
            id="feedback-type"
            value={feedbackType}
            onChange={(e) => setFeedbackType(e.target.value)}
            className="w-full p-2 border border-slate-200 dark:border-slate-700 rounded-md bg-background text-foreground"
          >
            <option value="general">General Feedback</option>
            <option value="bug">Bug Report</option>
            <option value="feature">Feature Request</option>
            <option value="documentation">Documentation</option>
            <option value="performance">Performance Issue</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="feedback-subject">Subject</Label>
          <Input 
            id="feedback-subject" 
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Brief description of your feedback"
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="feedback-message">Message</Label>
          <Textarea 
            id="feedback-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Please provide detailed feedback..."
            className="w-full min-h-[120px]"
          />
        </div>
        
        <Button 
          className="w-full" 
          onClick={handleSendFeedback}
        >
          <Send className="h-4 w-4 mr-2" />
          Send Feedback
        </Button>
        
        <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
          This will open your default email client
        </p>
      </CardContent>
    </Card>
  )
} 
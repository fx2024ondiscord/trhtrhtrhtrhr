"use client"

import { useState } from "react"
import { useChat } from "ai/react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Settings, Send, Loader2 } from "lucide-react"
import SettingsMenu from "./SettingsMenu"

export default function Chat() {
  const [language, setLanguage] = useState<"en" | "ti">("en")
  const [showSettings, setShowSettings] = useState(false)

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    body: { language },
  })

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      <header className="flex justify-between items-center p-4 border-b border-blue-500">
        <h1 className="text-2xl font-bold">Tigrinya AI Chatbot</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span>EN</span>
            <Switch checked={language === "ti"} onCheckedChange={(checked) => setLanguage(checked ? "ti" : "en")} />
            <span>ትግርኛ</span>
          </div>
          <Button variant="outline" size="icon" onClick={() => setShowSettings(!showSettings)}>
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <div className="flex-grow overflow-auto p-4 space-y-4">
        {messages.map((message) => (
          <Card
            key={message.id}
            className={`${message.role === "user" ? "bg-blue-600" : "bg-indigo-600"} border-none shadow-glow`}
          >
            <CardContent className="p-3">
              <p className="text-sm">{message.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-blue-500">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder={language === "ti" ? "መልእኽትኻ ኣብዚ ጽሓፍ..." : "Type your message here..."}
            className="flex-grow bg-blue-800 border-blue-500 text-white placeholder-blue-300"
          />
          <Button type="submit" disabled={isLoading} className="bg-blue-500 hover:bg-blue-600">
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </div>
      </form>

      {showSettings && <SettingsMenu onClose={() => setShowSettings(false)} />}
    </div>
  )
}


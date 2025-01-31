import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"

interface SettingsMenuProps {
  onClose: () => void
}

export default function SettingsMenu({ onClose }: SettingsMenuProps) {
  const [autoTranslate, setAutoTranslate] = useState(false)
  const [responseLength, setResponseLength] = useState(50)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-96 bg-gray-800 border-blue-500 shadow-glow">
        <CardHeader>
          <CardTitle className="text-white">Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="auto-translate" className="text-white">
              Auto Translate
            </Label>
            <Switch id="auto-translate" checked={autoTranslate} onCheckedChange={setAutoTranslate} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="response-length" className="text-white">
              Response Length
            </Label>
            <Slider
              id="response-length"
              min={10}
              max={100}
              step={10}
              value={[responseLength]}
              onValueChange={(value) => setResponseLength(value[0])}
              className="bg-blue-500"
            />
            <p className="text-sm text-blue-300">{responseLength}%</p>
          </div>
          <button
            onClick={onClose}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Close
          </button>
        </CardContent>
      </Card>
    </div>
  )
}


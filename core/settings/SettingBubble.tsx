import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"

interface SettingFontSizeProps {
  value: number
  onChange: (value: number) => void
}

export const DEFAULT_FONT_SIZE_RATIO = 100

export function SettingFontSize({ value, onChange }: SettingFontSizeProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="font-size">Font Size Ratio</Label>
      <div className="flex items-center gap-4">
        <Slider
          id="font-size"
          min={50}
          max={200}
          step={10}
          value={[value]}
          onValueChange={(v) => onChange(v[0])}
          className="flex-grow"
        />
        <span className="w-12 text-right">{value}%</span>
      </div>
    </div>
  )
}
import { BaseSetting } from "./BaseSetting";
import { Slider } from "@/components/ui/slider";
import { SettingId } from "~types/settings";

export function SettingFontSize() {
  return (
    <BaseSetting<number>
      id={SettingId.FONT_SIZE}
      defaultValue={100}
      label="Font Size Ratio"
      description="Adjust the font size of the interface"
      render={(value, onChange) => (
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
      )}
    />
  );
} 
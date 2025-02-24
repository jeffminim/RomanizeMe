import { Button } from "@/components/ui/button"
import { useLanguagePanel } from "@/core/language-panel"
import { ConversionStatus } from "~types/conversion-status"

export function ScriptButton({ script, label, activeScript, handleScriptToggle }: {
  script: string
  label: string
  activeScript: string | null
  handleScriptToggle: (script: string) => void
}) {
  const { setActiveScript, currentStatus } = useLanguagePanel()

  const isDisabled = currentStatus === ConversionStatus.PROCESSING || 
                    currentStatus === ConversionStatus.COMPLETED

  const handleClick = () => {
    if (activeScript !== script && !isDisabled) {
      handleScriptToggle(script)
      setActiveScript(script)
    }
  }

  return (
    <Button
      variant={activeScript === script ? "default" : "outline"}
      className={`inline-flex items-center justify-center border ${
        activeScript === script
          ? "border-blue-300 bg-blue-100 text-blue-700 hover:bg-blue-200 hover:text-blue-800"
          : "border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
      } rounded-md text-sm font-medium px-3 py-1.5`}
      onClick={handleClick}
      disabled={isDisabled}
    >
      {label}
    </Button>
  )
} 
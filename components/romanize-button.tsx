import { Button } from "@/components/ui/button"
import { Languages, Loader2 } from "lucide-react"
import { useLanguagePanel } from "@/core/language-panel"
import { scriptPanelGroups } from "@/types/languages"
import { ConversionStatus } from "~types/conversion-status"
import { useI18n } from "@/hooks/useI18n"

export function RomanizeButton({ className, disabled, ...props }) {
  const { getUIText } = useI18n()
  const { activeScript, currentStatus } = useLanguagePanel()

  const handleClick = () => {
    if (!activeScript || currentStatus === ConversionStatus.PROCESSING) {
      return
    }

    const selectedLanguage = scriptPanelGroups
      .flatMap(group => group.languages)
      .find(lang => lang.code === activeScript)

    if (!selectedLanguage || !selectedLanguage.writtenScript?.length) {
      return
    }

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 0 || !tabs[0].id) {
        return
      }

      const tabId = tabs[0].id
      chrome.tabs.sendMessage(tabId, {
        type: "START_CONVERSION",
        language: selectedLanguage
      })
    })
  }

  return (
    <Button 
      className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-bold ${className || ""}`}
      size="sm"
      onClick={handleClick}
      disabled={disabled || currentStatus === ConversionStatus.PROCESSING}
      {...props}
    >
      <div className="flex items-center justify-center gap-2">
        {currentStatus === ConversionStatus.PROCESSING ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Languages className="w-5 h-5" />
        )}
        <span className="text-base">
          {currentStatus === ConversionStatus.PROCESSING ? getUIText("btnProcessing") : getUIText("btnRomanize")}
        </span>
      </div>
    </Button>
  )
} 
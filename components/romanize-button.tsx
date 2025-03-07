import { Button } from "@/components/ui/button"
import { Languages, Loader2 } from "lucide-react"
import { useLanguagePanel } from "@/core/language-panel"
import { scriptPanelGroups } from "@/types/languages"
import { ConversionStatus } from "~types/conversion-status"
import { useI18n } from "@/hooks/useI18n"
import { useMemo } from "react"

export function RomanizeButton({ className, disabled, ...props }) {
  const { getUIText, currentLang } = useI18n()
  const { activeScript, currentStatus } = useLanguagePanel()
  
  // 检查文本是否过长需要垂直布局
  const needsVerticalLayout = useMemo(() => {
    const text = currentStatus === ConversionStatus.PROCESSING 
      ? getUIText("btnProcessing") 
      : getUIText("btnRomanize")
    return currentLang === "ru" || text.length > 10
  }, [currentStatus, getUIText, currentLang])

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
      <div className={`flex items-center justify-center ${needsVerticalLayout ? 'flex-col py-1' : 'flex-row gap-2'}`}>
        {currentStatus === ConversionStatus.PROCESSING ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Languages className="w-5 h-5" />
        )}
        <span className={`text-base ${needsVerticalLayout ? 'mt-1 text-sm' : ''}`}>
          {currentStatus === ConversionStatus.PROCESSING ? getUIText("btnProcessing") : getUIText("btnRomanize")}
        </span>
      </div>
    </Button>
  )
} 
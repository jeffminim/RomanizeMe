import { RomanizeButton } from "@/components/romanize-button"
import { RestoreButton } from "@/components/restore-button"
import { useLanguagePanel } from "~core/language-panel"
import { ConversionStatus } from "~types/conversion-status"

export function ConverterPanel() {
  const { currentStatus } = useLanguagePanel()

  const isRomanizeButtonDisabled = currentStatus === ConversionStatus.NO_LANGUAGE_SELECTED || 
                                   currentStatus === ConversionStatus.PROCESSING ||
                                   currentStatus === ConversionStatus.COMPLETED

  const isRestoreButtonDisabled = currentStatus !== ConversionStatus.COMPLETED

  return (
    <div className="flex flex-col h-full gap-2">
      <div className="flex-1 min-h-[50px]">
        <RomanizeButton 
          className="h-full" 
          disabled={isRomanizeButtonDisabled}
        />
      </div>
      <div className="flex-1 min-h-[50px]">
        <RestoreButton 
          className="h-full" 
          disabled={isRestoreButtonDisabled}
          variant={isRestoreButtonDisabled ? "outline" : "secondary"}
        />
      </div>
    </div>
  )
} 
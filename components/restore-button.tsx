import { Button } from "@/components/ui/button"
import { Undo2 } from "lucide-react"
import { useI18n } from "@/hooks/useI18n"
import { useMemo } from "react"

export function RestoreButton({ className, disabled, ...props }: React.ComponentPropsWithRef<typeof Button>) {
  const { getUIText, currentLang } = useI18n()
  
  // 检查文本是否过长需要垂直布局
  const needsVerticalLayout = useMemo(() => {
    const text = getUIText("btnRestore")
    return currentLang === "ru" || text.length > 10
  }, [getUIText, currentLang])

  const handleClick = () => {
    console.log('Restore button clicked')
    
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 0 || !tabs[0].id) {
        console.error('No active tab found')
        return
      }

      const tabId = tabs[0].id
      chrome.tabs.sendMessage(tabId, {
        type: "START_RESTORE"
      }, (response) => {
        if (chrome.runtime.lastError) {
          console.error('Error sending message:', chrome.runtime.lastError)
        } else {
          console.log('Restore response:', response)
        }
      })
    })
  }

  return (
    <Button 
      variant="outline" 
      className={`w-full ${
        !disabled 
          ? "bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-500" 
          // ? "bg-teal-500 hover:bg-teal-600 text-white border-teal-500" 
          : "bg-gray-50 hover:bg-gray-100 border-gray-200"
      } font-bold ${className || ""}`}
      size="sm"
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      <div className={`flex items-center justify-center ${needsVerticalLayout ? 'flex-col py-1' : 'flex-row gap-2'}`}>
        <Undo2 className="w-5 h-5" />
        <span className={`text-base ${needsVerticalLayout ? 'mt-1 text-sm' : ''}`}>
          {getUIText("btnRestore")}
        </span>
      </div>
    </Button>
  )
} 
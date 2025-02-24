import { createContext, useContext, useState, useEffect } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ScriptButton } from "@/components/script-button"
import { Card } from "@/components/ui/card"
import { scriptPanelGroups } from "@/types/languages"
import { ConversionStatus } from "~types/conversion-status"
import { Storage } from "@plasmohq/storage"
import { getCurrentUILang } from "~background"

// 定义语言面板的上下文类型
interface LanguagePanelContextType {
  activeScript: string | null
  setActiveScript: (script: string | null) => void
  currentStatus: ConversionStatus
  setCurrentStatus: (status: ConversionStatus) => void
}

// 创建语言面板上下文
const LanguagePanelContext = createContext<LanguagePanelContextType>({
  activeScript: null,
  setActiveScript: () => {},
  currentStatus: ConversionStatus.NO_LANGUAGE_SELECTED,
  setCurrentStatus: () => {}
})

// 创建storage实例，使用session存储区域
const storageStatus = new Storage({
  area: "session"  // 使用session存储，每个窗口独立
})

export function LanguagePanelProvider({ children }) {
  const [activeScript, setActiveScript] = useState<string | null>(null)
  const [currentStatus, setCurrentStatus] = useState<ConversionStatus>(
    ConversionStatus.NO_LANGUAGE_SELECTED
  )

  // 初始化时从session storage读取状态和选择的语言
  useEffect(() => {
    const initStatus = async () => {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
      if (tab?.id) {
        // 读取转换状态
        const savedStatus = await storageStatus.get(`conversionStatus_${tab.id}`)
        if (savedStatus && Object.values(ConversionStatus as Record<string, string>).includes(savedStatus)) {
          setCurrentStatus(savedStatus as ConversionStatus)
        }

        // 读取选择的语言
        const savedScript = await storageStatus.get(`activeScript_${tab.id}`)
        if (savedScript) {
          setActiveScript(savedScript)
        }
      }
    }
    initStatus()
  }, [])

  // 监听全局消息，用于更新转换状态
  useEffect(() => {
    const handleMessage = async (message, sender) => {
      if (message.type === "UPDATE_CONVERSION_STATUS") {
        // 获取当前标签页ID
        const tabId = sender.tab?.id
        if (tabId) {
          setCurrentStatus(message.status)
          // 将状态与标签页ID关联存储
          await storageStatus.set(`conversionStatus_${tabId}`, message.status)
        }
      }
    }

    chrome.runtime.onMessage.addListener(handleMessage)
    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage)
    }
  }, [])

  // 在useEffect中添加新的监听器
  useEffect(() => {
    const handleBroadcast = (message) => {
      if (message.type === "BROADCAST_CONVERSION_STATUS") {
        setCurrentStatus(message.status);
      }
    };

    chrome.runtime.onMessage.addListener(handleBroadcast);
    return () => {
      chrome.runtime.onMessage.removeListener(handleBroadcast);
    };
  }, []);

  // 处理设置当前脚本的函数
  const handleSetActiveScript = async (script: string | null) => {
    setActiveScript(script)
    const newStatus = script ? ConversionStatus.IDLE : ConversionStatus.NO_LANGUAGE_SELECTED
    setCurrentStatus(newStatus)
    
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    if (tab?.id) {
      // 保存转换状态
      await storageStatus.set(`conversionStatus_${tab.id}`, newStatus)
      // 保存选择的语言
      await storageStatus.set(`activeScript_${tab.id}`, script)
    }
  }

  return (
    <LanguagePanelContext.Provider
      value={{
        activeScript,
        setActiveScript: handleSetActiveScript,
        currentStatus,
        setCurrentStatus
      }}
    >
      {children}
    </LanguagePanelContext.Provider>
  )
}

// 自定义hook，用于获取语言面板上下文
export function useLanguagePanel() {
  return useContext(LanguagePanelContext)
}

export function LanguageList() {
  const { activeScript, setActiveScript } = useLanguagePanel()
  const [expandedGroups, setExpandedGroups] = useState<string[]>([])
  const [currentLang, setCurrentLang] = useState("en") // 默认英文

  // 获取当前界面语言
  useEffect(() => {
    const fetchCurrentLang = async () => {
      const lang = await getCurrentUILang();
      setCurrentLang(lang);
    };
    fetchCurrentLang();
  }, []);

  // 初始化时设置默认展开的组
  useEffect(() => {
    const group = scriptPanelGroups.find(group => 
      group.languages.some(language => language.code === activeScript)
    )?.name || scriptPanelGroups[0].name
    
    // 每次打开面板时，只展开默认组，其他组全部折叠
    setExpandedGroups([group])
  }, [activeScript])

  // 处理脚本切换的函数
  const handleScriptToggle = (script: string) => {
    const newScript = activeScript === script ? null : script
    setActiveScript(newScript)
  }

  return (
    <Accordion 
      type="multiple" 
      className="w-full" 
      value={expandedGroups}
      onValueChange={setExpandedGroups}
    >
      {scriptPanelGroups.map(group => (
        <AccordionItem key={group.name} value={group.name}>
          <AccordionTrigger className="text-base font-semibold">
            {group.i18n[currentLang] || group.i18n.en}
          </AccordionTrigger>
          <AccordionContent>
            <div className="pl-4 flex flex-wrap gap-2 items-center">
              {group.languages.map(language => (
                <ScriptButton
                  key={language.code}
                  script={language.code}
                  label={language.i18n[currentLang] || language.i18n.en}
                  activeScript={activeScript}
                  handleScriptToggle={handleScriptToggle}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
} 
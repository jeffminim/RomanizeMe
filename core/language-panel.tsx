import { createContext, useContext, useState, useEffect, useRef } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ScriptButton } from "@/components/script-button"
import { Card } from "@/components/ui/card"
import { scriptPanelGroups } from "@/types/languages"
import { ConversionStatus } from "~types/conversion-status"
import { Storage } from "@plasmohq/storage"
import { getCurrentUILang } from "~background"
import { languageCodeMapping } from "@/types/languages"

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
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (!tab?.id) return;
      
      const tabId = tab.id;
      
      try {
        // 1. 首先尝试从session storage获取状态
        const savedStatus = await storageStatus.get(`conversionStatus_${tabId}`);
        
        if (savedStatus && Object.values(ConversionStatus as Record<string, string>).includes(savedStatus)) {
          console.log(`从session storage获取状态: ${savedStatus}`);
          setCurrentStatus(savedStatus as ConversionStatus);
        } else {
          // 2. 如果session storage没有，尝试从background获取
          chrome.runtime.sendMessage({ 
            type: "GET_TAB_STATUS", 
            tabId 
          }, (response) => {
            if (chrome.runtime.lastError) {
              console.error("Error getting status from background:", chrome.runtime.lastError);
            } else if (response?.status) {
              console.log(`从background获取状态: ${response.status}`);
              setCurrentStatus(response.status);
              storageStatus.set(`conversionStatus_${tabId}`, response.status);
            } else {
              // 3. 如果background也没有，尝试从内容脚本获取
              chrome.tabs.sendMessage(tabId, { type: "GET_CONVERSION_STATUS" }, (contentResponse) => {
                if (chrome.runtime.lastError) {
                  console.error("Error querying page status:", chrome.runtime.lastError);
                } else if (contentResponse?.status) {
                  console.log(`从内容脚本获取状态: ${contentResponse.status}`);
                  setCurrentStatus(contentResponse.status);
                  storageStatus.set(`conversionStatus_${tabId}`, contentResponse.status);
                }
              });
            }
          });
        }
        
        // 读取选择的语言
        const savedScript = await storageStatus.get(`activeScript_${tabId}`);
        if (savedScript) {
          setActiveScript(savedScript);
        }
      } catch (error) {
        console.error("Error initializing status:", error);
      }
    };
    
    initStatus();
  }, []);

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
  const [currentLang, setCurrentLang] = useState<string>(() => {
    // 使用浏览器的默认语言作为初始值
    const browserLang = chrome.i18n.getUILanguage().replace("-","_").toLowerCase();
    return browserLang;
  })
  const [pageMainLanguage, setPageMainLanguage] = useState<string | null>(null)
  // 添加对自动展开组的引用
  const autoExpandedGroupRef = useRef<string | null>(null)
  // 添加对Accordion容器的引用
  const accordionContainerRef = useRef<HTMLDivElement>(null)

  // 获取当前界面语言
  useEffect(() => {
    const fetchCurrentLang = async () => {
      const lang = await getCurrentUILang();
      setCurrentLang(lang);
    };
    fetchCurrentLang();
    
    // 添加语言变化的监听器
    const handleLanguageChange = (message) => {
      if (message.type === "LANGUAGE_CHANGED") {
        setCurrentLang(message.language);
      }
    };
    
    chrome.runtime.onMessage.addListener(handleLanguageChange);
    
    return () => {
      chrome.runtime.onMessage.removeListener(handleLanguageChange);
    };
  }, []);

  // 获取页面主语言
  useEffect(() => {
    const getPageLanguage = async () => {
      try {
        // console.log('Attempting to get page language...');
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (!tab?.id) {
          // console.log('No active tab found');
          return;
        }
        
        // console.log('Sending GET_PAGE_LANGUAGE message to tab:', tab.id);
        chrome.tabs.sendMessage(tab.id, { type: "GET_PAGE_LANGUAGE" }, (response) => {
          if (chrome.runtime.lastError) {
            console.error("获取页面语言失败:", chrome.runtime.lastError);
          } else if (response?.language) {
            // console.log('Received page language from content script:', response.language);
            
            // 将页面语言代码映射为对应的语言选项代码
            const mappedLanguage = languageCodeMapping[response.language];
            // console.log('Mapped language code:', mappedLanguage);
            
            if (mappedLanguage) {
              setPageMainLanguage(mappedLanguage);
            } else {
              // console.log('No matching language found for code:', response.language);
            }
          } else {
            // console.log('No language detected in content script response');
          }
        });
      } catch ( error) {
        console.error("获取页面语言时出错:", error);
      }
    };
    
    getPageLanguage();
  }, []);

  // 初始化时设置默认展开的组
  useEffect(() => {
    let groupToExpand: string | undefined;
    
    // 如果有激活的脚本，优先展开包含该脚本的组
    if (activeScript) {
      const activeScriptGroup = scriptPanelGroups.find(group => 
        group.enabled && group.languages.some(language => language.code === activeScript)
      )?.name;
      
      if (activeScriptGroup) {
        groupToExpand = activeScriptGroup;
      }
    }
    
    // 如果没有激活脚本但有页面主语言，查找包含该语言的组
    if (!groupToExpand && pageMainLanguage) {
      const pageLanguageGroup = scriptPanelGroups.find(group => 
        group.enabled && group.languages.some(language => language.code === pageMainLanguage)
      )?.name;
      
      if (pageLanguageGroup) {
        groupToExpand = pageLanguageGroup;
      }
    }
    
    // 如果都没有找到，选择第一个启用的组
    if (!groupToExpand) {
      groupToExpand = scriptPanelGroups.find(group => group.enabled)?.name;
    }
    
    // 如果找到了要展开的组，设置状态并记录到ref
    if (groupToExpand) {
      setExpandedGroups([groupToExpand]);
      autoExpandedGroupRef.current = groupToExpand;
    }
  }, [activeScript, pageMainLanguage]);
  
  // 添加处理自动滚动的效果
  useEffect(() => {
    // 仅在初始自动展开的组存在时执行滚动
    const groupToScrollTo = autoExpandedGroupRef.current;
    if (!groupToScrollTo || !accordionContainerRef.current) return;
    
    // 使用setTimeout确保DOM已经更新
    const scrollTimeout = setTimeout(() => {
      if (!accordionContainerRef.current) return;
      
      // 查找已展开的组元素
      const expandedGroupElement = document.querySelector(
        `[data-accordion-item="${groupToScrollTo}"]`
      ) as HTMLElement;
      
      if (!expandedGroupElement) return;
      
      // 找到展开的内容元素
      const accordionContent = expandedGroupElement.querySelector(
        '[data-state="open"]'
      ) as HTMLElement;
      
      if (!accordionContent) return;
      
      // 计算需要滚动的位置 - 目标是让展开的组完全可见
      const containerRect = accordionContainerRef.current.getBoundingClientRect();
      const contentBottomPosition = 
        expandedGroupElement.offsetTop + 
        expandedGroupElement.offsetHeight;
      
      // 如果元素已经在视野中，不需要滚动
      if (contentBottomPosition <= containerRect.height) return;
      
      // 滚动到位置，使展开组的底部可见
      accordionContainerRef.current.scrollTo({
        top: contentBottomPosition - containerRect.height + 16, // 底部添加一些边距
        behavior: 'smooth'
      });
      
      // 执行后清除自动展开的引用（避免用户后续手动展开时触发滚动）
      autoExpandedGroupRef.current = null;
    }, 300); // 给予足够时间让accordion完成展开动画
    
    return () => clearTimeout(scrollTimeout);
  }, [expandedGroups]); // 在展开组变化时触发

  // 处理脚本切换的函数
  const handleScriptToggle = (script: string) => {
    const newScript = activeScript === script ? null : script;
    setActiveScript(newScript);
  }

  return (
    <div 
      ref={accordionContainerRef}
      className="w-full max-h-[70vh] overflow-auto"
      style={{ scrollBehavior: 'smooth' }}
    >
      <Accordion 
        type="multiple" 
        className="w-full" 
        value={expandedGroups}
        onValueChange={setExpandedGroups}
      >
        {scriptPanelGroups
          .filter(group => group.enabled)
          .map(group => (
            <AccordionItem 
              key={group.name} 
              value={group.name}
              data-accordion-item={group.name}
            >
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
                      isCurrentPageLanguage={language.code === pageMainLanguage}
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
      </Accordion>
    </div>
  )
} 
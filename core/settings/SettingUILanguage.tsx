import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BaseSetting } from "./BaseSetting"
import { SettingId } from "~types/settings"
import { useState, useEffect } from "react"
import { useI18n } from "@/hooks/useI18n";

export function SettingUILanguage() {
  const { getUIText } = useI18n();
  const [currentLanguage, setCurrentLanguage] = useState<string>(() => {
    // 使用浏览器的默认语言作为初始值
    const browserLang = chrome.i18n.getUILanguage().replace("-","_").toLowerCase();
    return browserLang;
  });

  useEffect(() => {
    chrome.runtime.sendMessage({
      type: "GET_SETTING",
      id: SettingId.UI_LANGUAGE
    }, (response) => {
      if (response?.success) {
        setCurrentLanguage(response.setting.value)
      }
    })
  }, [])

  const applyLanguageSetting = (newLanguage: string) => {
    chrome.runtime.sendMessage({
      type: "CHANGE_UI_LANGUAGE",
      language: newLanguage
    }, (response) => {
      if (response?.success) {
        // 广播语言变化消息
        chrome.runtime.sendMessage({
          type: "LANGUAGE_CHANGED",
          language: newLanguage
        });
        
        // 重新加载页面以应用新语言
        setTimeout(() => {
          window.location.reload();
        }, 300);
      }
    })
  }

  return (
    <BaseSetting<string>
      id={SettingId.UI_LANGUAGE}
      defaultValue={currentLanguage}
      label={getUIText("setUILangTitle")}
      description={getUIText("setUILangDesc")}
      applySetting={applyLanguageSetting}
      render={(value, onChange) => (
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger id="language" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="zh_cn">中文</SelectItem>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="fr">Français</SelectItem>
            <SelectItem value="ja">日本語</SelectItem>
            <SelectItem value="ko">한국어</SelectItem>
          </SelectContent>
        </Select>
      )}
    />
  )
}
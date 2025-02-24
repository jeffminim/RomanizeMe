import { getLanguagePack, getCurrentUILang } from "~background";
import { useState, useEffect } from "react";

export function useI18n() {
  const defaultLang = chrome.i18n.getUILanguage();
  const currentLang = getCurrentUILang();
  const [languagePack, setLanguagePack] = useState<Record<string, { message: string }>>({});

  useEffect(() => {
    const loadPack = async () => {
      const pack = await getLanguagePack();
      setLanguagePack(pack);
    };
    loadPack();
  }, [currentLang]);

  const getUIText = (messageName: string, substitutions?: string | string[]): string => {
    // 如果当前语言和默认语言一致，直接使用chrome.i18n.getMessage
    if (currentLang === defaultLang) {
      return chrome.i18n.getMessage(messageName, substitutions);
    }

    // 从语言包中获取对应的消息
    const message = languagePack[messageName]?.message;
    if (message) {
      // 处理替换参数
      if (substitutions) {
        const subs = Array.isArray(substitutions) ? substitutions : [substitutions];
        return subs.reduce((msg, sub, index) => 
          msg.replace(new RegExp(`\\$${index + 1}`, 'g'), sub), 
          message
        );
      }
      return message;
    }

    // 如果语言包中没有找到，回退到chrome.i18n.getMessage
    return chrome.i18n.getMessage(messageName, substitutions);
  };

  return { getUIText, currentLang };
} 
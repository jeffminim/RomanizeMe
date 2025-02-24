`use client`

// import "~globals.css"
import "./toast-ui.css"


import { Toaster } from "@/components/ui/sonner"
import { toast as sonnerToast } from "sonner"
import { useEffect, useState, useRef } from "react"
import { TOAST_CONFIG } from "~types/toast"
import { scriptPanelLanguages } from "~types/languages"
import { DEFAULT_SETTINGS, SettingId } from "~types/settings";

import type { PlasmoCSConfig, PlasmoGetStyle } from "plasmo"
import cssText from "data-text:./toast-ui.css"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  // css: ["toast-ui.css"],
  // world: "MAIN",
};

export const getStyle: PlasmoGetStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText

  return style
}

/** I recommend abstracting the toast function
 *  so that you can call it without having to use toast.custom everytime. */
function toast(toast: Omit<ToastProps, 'id'>) {
  return sonnerToast.custom(
    (id) => (
      <Toast
        id={id}
        title={toast.title}
        description={toast.description}
        button={{
          label: toast.button.label,
          onClick: () => console.log('Button clicked'),
        }}
        duration={toast.duration}
      />
    ),
    {
      duration: toast.duration,
    }
  );
}

/** A fully custom toast that still maintains the animations and interactions. */
function Toast(props: ToastProps) {
  const { title, description, button, id } = props;

  return (
    <div className="rm-toast">
      <div className="rm-toast-content">
        <p className="rm-toast-title">{title}</p>
        <p className="rm-toast-description">{description}</p>
      </div>
      <div className="rm-toast-icon">
        <img
          src={chrome.runtime.getURL("/public/romanizemelogo256.png")}
          alt="RomanizeMe Logo"
        />
      </div>
    </div>
  );
}


interface ToastProps {
  id: string | number;
  title: string;
  description: string;
  button: {
    label: string;
    onClick: () => void;
  };
  duration:number;
}

// 新增：定义useToastI18n Hooks
function useToastI18n() {
  const getToastText = async (messageKey: string, substitutions?: string | string[]): Promise<string> => {
    return new Promise((resolve) => {
      chrome.storage.local.get(['languagePack'], (result) => {
        const languagePack = result.languagePack || {};
        
        // 如果语言包存在且包含该key，使用语言包
        if (languagePack[messageKey]?.message) {
          let message = languagePack[messageKey].message;
          if (substitutions) {
            const subs = Array.isArray(substitutions) ? substitutions : [substitutions];
            message = subs.reduce((msg, sub, index) => 
              msg.replace(new RegExp(`\\$${index + 1}`, 'g'), sub), 
              message
            );
          }
          resolve(message);
        } else {
          resolve(chrome.i18n.getMessage(messageKey, substitutions));
        }
      });
    });
  };

  return { getToastText };
}

// 将 toast 处理逻辑移到组件外部
let currentUiLang = DEFAULT_SETTINGS[SettingId.UI_LANGUAGE].value as string;
let messageHandler = null;

// 初始化语言设置
chrome.storage.sync.get([SettingId.UI_LANGUAGE], (result) => {
  if (result[SettingId.UI_LANGUAGE]) {
    currentUiLang = result[SettingId.UI_LANGUAGE];
  }
});

// 监听语言变化
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'sync' && changes[SettingId.UI_LANGUAGE]) {
    currentUiLang = changes[SettingId.UI_LANGUAGE].newValue;
  }
});

// 设置消息监听器
const setupMessageListener = (getToastText: (messageKey: string, substitutions?: string | string[]) => Promise<string>) => {
  if (messageHandler) {
    chrome.runtime.onMessage.removeListener(messageHandler);
  }

  messageHandler = async (message) => {
    if (message.type === "SHOW_TOAST") {
      const config = TOAST_CONFIG[message.toastType];
      if (config) {
        const title = await getToastText(config.title);
        let description = '';
        
        if (typeof config.getDescription === 'function') {
          const descParts = config.getDescription(message.language || '');
          if (Array.isArray(descParts)) {
            description = await Promise.all(descParts.map(async (part) => {
              if (typeof part === 'string' && part.startsWith("toast")) {
                return await getToastText(part);
              } else if (typeof part === 'object' && part.key === "language") {
                const lang = scriptPanelLanguages.find(l => l.code === part.value);
                return lang?.i18n[currentUiLang] || part.value;
              }
              return part;
            })).then(parts => parts.join(''));
          } else {
            description = await getToastText(descParts);
          }
        }

        toast({
          title,
          description,
          button: {
            label: 'Reply',
            onClick: () => sonnerToast.dismiss(),
          },
          duration: message.duration || 5000,
        });
      }
    }
  };

  chrome.runtime.onMessage.addListener(messageHandler);
};

const ToastUI = () => {
  const { getToastText } = useToastI18n();

  useEffect(() => {
    setupMessageListener(getToastText);
    
    return () => {
      if (messageHandler) {
        chrome.runtime.onMessage.removeListener(messageHandler);
        messageHandler = null;
      }
    };
  }, [getToastText]);

  return (
    <div className="rm-toast-container">
      <Toaster/>
    </div>
  );
};

export default ToastUI
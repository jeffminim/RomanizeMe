import { ToastType, TOAST_CONFIG } from "~types/toast"
import { type SettingItem, SettingId, DEFAULT_SETTINGS } from "~types/settings"
// import ToastUI from "~contents/toast-ui";  // Ensure this import exists

// 添加状态管理
let uiLang = DEFAULT_SETTINGS[SettingId.UI_LANGUAGE].value as string;

// 添加全局语言包存储
let languagePack: Record<string, { message: string }> = {};

// 启动时加载语言设置
chrome.runtime.onStartup.addListener(() => {
  chrome.storage.sync.get([SettingId.UI_LANGUAGE], (result) => {
    if (result[SettingId.UI_LANGUAGE]) {
      uiLang = result[SettingId.UI_LANGUAGE];
      loadLanguagePack(uiLang);
    } else {
      // 使用默认语言，直接使用chrome.i18n.getMessage
      uiLang = (chrome.i18n.getUILanguage()).replace("-","_").toLowerCase();
      chrome.storage.sync.set({ [SettingId.UI_LANGUAGE]: uiLang });
    }
  });
});

// 加载语言包
function loadLanguagePack(lang: string) {
  const langFile = `_locales/${lang}/messages.json`;
  fetch(chrome.runtime.getURL(langFile))
    .then(response => response.json())
    .then(data => {
      // 将语言包存储到chrome.storage.local
      chrome.storage.local.set({ languagePack: data });
    })
    .catch(error => {
      console.error('Failed to load language pack:', error);
    });
}

// 获取语言包
export function getLanguagePack(): Promise<Record<string, { message: string }>> {
  return new Promise((resolve) => {
    chrome.storage.local.get(['languagePack'], (result) => {
      resolve(result.languagePack || {});
    });
  });
}

// 监听语言设置变化
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "CHANGE_UI_LANGUAGE") {
    const newLang = message.language;
    chrome.storage.sync.set({ [SettingId.UI_LANGUAGE]: newLang }, () => {
      if (!chrome.runtime.lastError) {
        uiLang = newLang;
        loadLanguagePack(newLang);
        sendResponse({ success: true });
      } else {
        sendResponse({ success: false, error: chrome.runtime.lastError });
      }
    });
    return true; // 保持消息通道打开
  }

  // SHOW_TOAST
  if (message.type && Object.values(ToastType).includes(message.type)) {
    // 获取当前活动标签页
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        // 向内容脚本发送消息
        chrome.tabs.sendMessage(tabs[0].id, {
          type: "SHOW_TOAST",
          toastType: message.type,
          language: message.language
        })
      }
    })
  }

  // SAVE_SETTING
  if (message.type === "SAVE_SETTING") {
    chrome.storage.sync.set({ [message.setting.id]: message.setting.value }, () => {
      if (chrome.runtime.lastError) {
        sendResponse({ success: false, error: chrome.runtime.lastError });
      } else {
        sendResponse({ success: true });
      }
    });
    return true; // 保持消息通道打开以等待 sendResponse
  }
  // GET_SETTING
  if (message.type === "GET_SETTING") {
    getSetting(message.id)
      .then((setting) => sendResponse({ success: true, setting }))
      .catch((error) => sendResponse({ success: false, error }));
    return true;
  }
  // GET_ALL_SETTINGS
  if (message.type === "GET_ALL_SETTINGS") {
    getAllSettings()
      .then((settings) => sendResponse({ success: true, settings }))
      .catch((error) => sendResponse({ success: false, error }));
    return true;
  }
  // RESET_SETTINGS
  if (message.type === "RESET_SETTINGS") {
    resetSettings()
      .then(() => sendResponse({ success: true }))
      .catch((error) => sendResponse({ success: false, error }));
    return true;
  }

  // 处理UPDATE_CONVERSION_STATUS消息
  if (message.type === "UPDATE_CONVERSION_STATUS") {
    const tabId = sender.tab?.id;
    if (tabId) {
      // 将状态与标签页ID关联存储
      chrome.storage.session.set({ [`conversionStatus_${tabId}`]: message.status })
        .then(() => {
          // 向所有监听该状态的地方广播状态更新
          chrome.tabs.sendMessage(tabId, {
            type: "BROADCAST_CONVERSION_STATUS",
            status: message.status
          });
          sendResponse({ success: true });
        })
        .catch(error => {
          console.error('Failed to update conversion status:', error);
          sendResponse({ success: false, error });
        });
      return true; // 保持消息通道打开
    }
  }
})

// 读取单个设置项
function getSetting(id: SettingId): Promise<SettingItem> {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get([id], (result) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve({
          id,
          value: result[id] ?? DEFAULT_SETTINGS[id].value
        });
      }
    });
  });
}

// 读取所有设置项
function getAllSettings(): Promise<SettingItem[]> {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(null, (result) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        const settings = Object.values(SettingId).map((id) => ({
          id,
          value: result[id] ?? DEFAULT_SETTINGS[id].value
        }));
        resolve(settings);
      }
    });
  });
}

// 重置设置
function resetSettings(): Promise<void> {
  return new Promise((resolve, reject) => {
    // 清除所有设置
    chrome.storage.sync.clear(() => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        // 重新设置默认值
        const defaultSettings = Object.values(DEFAULT_SETTINGS).reduce((acc, setting) => {
          acc[setting.id] = setting.value;
          return acc;
        }, {} as Record<string, any>);

        chrome.storage.sync.set(defaultSettings, () => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve();
          }
        });
      }
    });
  });
}

// 获取当前UI语言的函数
export async function getCurrentUILang(): Promise<string> {
  // 首先尝试从存储中获取
  const result = await chrome.storage.sync.get(SettingId.UI_LANGUAGE);
  if (result[SettingId.UI_LANGUAGE]) {
    return result[SettingId.UI_LANGUAGE];
  }
  
  // 如果存储中没有，使用默认值
  return DEFAULT_SETTINGS[SettingId.UI_LANGUAGE].value as string;
} 
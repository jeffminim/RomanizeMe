// 定义设置项类型
export interface SettingItem {
  id: string; // 设置项的唯一标识
  value: string | number | boolean; // 设置项的值
}

// 定义所有设置项的ID
export enum SettingId {
  FONT_SIZE = "fontSize", // 字体大小
  UI_LANGUAGE = "uiLanguage", // 界面语言
//   DARK_MODE = "darkMode" // 暗黑模式
}

// 定义默认设置值
export const DEFAULT_SETTINGS: Record<SettingId, SettingItem> = {
  [SettingId.FONT_SIZE]: {
    id: SettingId.FONT_SIZE,
    value: 100
  },
  [SettingId.UI_LANGUAGE]: {
    id: SettingId.UI_LANGUAGE,
    value: (chrome.i18n.getUILanguage()).replace("-","_").toLowerCase() || "en"
  },
//   [SettingId.DARK_MODE]: {
//     id: SettingId.DARK_MODE,
//     value: false
//   }
}; 
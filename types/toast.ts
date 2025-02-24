// 定义Toast类型枚举
export enum ToastType {
  // 转换完成
  CONVERSION_COMPLETE = "CONVERSION_COMPLETE",
  // 未发现可转换的文字
  NO_TEXT_FOUND = "NO_TEXT_FOUND",
  // 页面还原
  PAGE_RESTORED = "PAGE_RESTORED",
  // 转换失败
  ERROR_CONVERSION = "ERROR_CONVERSION",
  // 还原失败
  ERROR_RESTORE = "ERROR_RESTORE"
}

// 定义Toast消息接口
export interface ToastMessage {
  type: ToastType;
  message: string;
  duration?: number; // 可选，显示时长（毫秒）
  language?: string; // 可选，用于转换语言类型
}

// 定义Toast配置接口
export interface ToastConfig {
  position?: "top" | "bottom" | "center" | "bottom-right";
  variant?: "default" | "success" | "error" | "warning";
  autoClose?: boolean;
  icon?: string;    // TODO：下个版本加上图标
}

// 定义Toast配置映射
export const TOAST_CONFIG = {
  [ToastType.CONVERSION_COMPLETE]: {
    title: "toastCompleteTitle",
    variant: "success",
    getDescription: (language: string) => ["toastCompleteDesc", " ", { key: "language", value: language }, "。\n", "toastCompleteWarn"]
  },
  [ToastType.NO_TEXT_FOUND]: {
    title: "toastUnfoundTitle",
    variant: "warning",
    getDescription: () => "toastUnfoundDesc"
  },
  [ToastType.PAGE_RESTORED]: {
    title: "toastRestoredTitle",
    variant: "default",
    getDescription: () => "toastRestoredDesc"
  },
  // abnormal
  [ToastType.ERROR_CONVERSION]: {
    title: "toastErrorConvTitle",
    variant: "destructive",
    getDescription: () => "toastErrorConvDesc"
  },
  [ToastType.ERROR_RESTORE]: {
    title: "toastErrorRestoreTitle",
    variant: "destructive",
    getDescription: () => "toastErrorRestoreDesc"
  }
} as const;

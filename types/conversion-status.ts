// 状态枚举
export enum ConversionStatus {
    // 已选择语言，尚未转换。
    // 转换按钮：可用
    // 还原按钮：不可用
    IDLE = "idle",

    // 已选择语言，转换中。
    // 转换按钮：不可用，变为转换中的样式。
    // 还原按钮：不可用
    PROCESSING = "processing",

    // 已选择语言，已完成转换。
    // 转换按钮：不可用
    // 还原按钮：可用
    COMPLETED = "completed",

    // 未选择语言。
    // 转换按钮：不可用
    // 还原按钮：不可用
    NO_LANGUAGE_SELECTED = "no_language_selected",

    // 出错。
    // 转换按钮：不可用
    // 还原按钮：不可用
    ERROR = "error"
} 
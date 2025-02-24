// 定义设置项组件的通用接口
export interface SettingComponent<T = any> {
  // 获取当前设置值
  getValue(): T;

  // 设置当前值
  setValue(value: T): void;

  // 应用设置（使设置生效）
  applySetting(): void;

  // 保存设置到存储
  saveSetting(): Promise<void>;

  // 从存储加载设置
  loadSetting(): Promise<void>;

  // 监听值变化
  onValueChange(callback: (newValue: T) => void): void;
} 
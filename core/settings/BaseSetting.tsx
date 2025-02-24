import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { type SettingComponent } from "~types/settings-component";
import { DEFAULT_SETTINGS, SettingId } from "~types/settings";

interface BaseSettingProps<T> {
  id: string;
  defaultValue: T;
  label: string;
  description?: string;
  render: (value: T, onChange: (newValue: T) => void) => JSX.Element;
  applySetting?: (value: T) => void;
}

export function BaseSetting<T>(props: BaseSettingProps<T>) {
  const [value, setValue] = useState<T>(props.defaultValue);
  const [isLoading, setIsLoading] = useState(true);

  // 从 DEFAULT_SETTINGS 加载默认值
  const loadDefaultValue = (): T => {
    const setting = DEFAULT_SETTINGS[props.id as SettingId];
    if (setting) {
      return setting.value as T;
    }
    return props.defaultValue;
  };

  // 加载设置
  useEffect(() => {
    const load = async () => {
      try {
        const response = await chrome.runtime.sendMessage({
          type: "GET_SETTING",
          id: props.id
        });
        if (response.success) {
          setValue(response.setting.value);
        } else {
          // 如果存储中没有值，使用默认值
          setValue(loadDefaultValue());
        }
      } catch (error) {
        console.error("Failed to load setting:", error);
        // 出错时使用默认值
        setValue(loadDefaultValue());
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [props.id]);

  // 处理值变化
  const handleChange = async (newValue: T) => {
    try {
      // 先更新本地状态
      setValue(newValue);

      // 等待保存完成
      await chrome.runtime.sendMessage({
        type: "SAVE_SETTING",
        setting: { id: props.id, value: newValue }
      });

      // 调用自定义的 applySetting
      if (props.applySetting) {
        props.applySetting(newValue);
      } else {
        // 默认的 applySetting 行为
        console.log(`Applying setting ${props.id} with value:`, newValue);
      }
    } catch (error) {
      console.error("Failed to save setting:", error);
      setValue(value); // 回滚到之前的值
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={props.id}><h2 className="text-base font-semibold mb-1">{props.label}</h2></Label>
      {props.description && (
        <p className="text-sm text-muted-foreground">{props.description}</p>
      )}
      {props.render(value, handleChange)}
    </div>
  );
} 
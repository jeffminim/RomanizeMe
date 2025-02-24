import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SettingUILanguage, SettingFontSize } from "@/core/settings"
import { DEFAULT_SETTINGS } from "~types/settings"
import { useI18n } from "@/hooks/useI18n";

export function SettingsPanel() {
  const { getUIText } = useI18n();
  const handleReset = async () => {
    try {
      // 重置所有设置项到默认值
      await chrome.runtime.sendMessage({
        type: "RESET_SETTINGS"
      });

      // 发送重置成功的 toast 消息
      chrome.runtime.sendMessage({
        type: "SHOW_TOAST",
        toastType: "SETTINGS_RESET",
        message: "Settings have been reset to default values"
      });

      // 重新加载页面以应用重置后的设置
      window.location.reload();
    } catch (error) {
      console.error("Failed to reset settings:", error);
    }
  }

  return (
    <Card className="p-4">
      <div className="space-y-6">
        <SettingUILanguage />
        {/* <SettingFontSize /> */}
        <div className="pt-4 border-t">
          <Button className="w-full" variant="outline" onClick={handleReset}>
            {getUIText("setUILangReset")}
          </Button>
        </div>
      </div>
    </Card>
  )
} 
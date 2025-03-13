import type { PlasmoCSConfig } from "plasmo"
import { ConversionStatus } from "~types/conversion-status"
import { ToastType } from "~types/toast"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  // world: "MAIN"
}

// 方法：移除所有带有 rm-marker 的 <span>，只保留原文
function restoreOriginalText() {
  // 第一步：处理所有带有 rm-marker="obj" 的 <ruby> 标签
  const rubyElements = document.querySelectorAll('ruby[rm-marker="obj"]');
  console.log(`Found ${rubyElements.length} ruby elements`);

  if (rubyElements.length > 0) {
    rubyElements.forEach((ruby) => {
      // 获取ruby标签中的原始文本节点
      const originalText = ruby.querySelector('span[rm-marker="word"]');
      if (originalText) {
        // 用原始文本节点替换整个ruby结构
        ruby.replaceWith(originalText.cloneNode(true));
      }
    });
  } else {
    console.log('No ruby elements found to process');
  }

  // 第二步：移除其他带有 rm-marker 的 <span>，只保留文本内容
  const markedSpans = document.querySelectorAll<HTMLElement>(`[rm-marker]`);
  if (markedSpans.length > 0) {
    markedSpans.forEach((span) => {
      // 创建文本节点，保留原文
      const textNode = document.createTextNode(span.textContent || '');
      // 用文本节点替换 <span>
      span.replaceWith(textNode);
    });
  } else {
    console.log('No marked spans found to process');
  }
}


// 监听恢复按钮点击事件
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "START_RESTORE") {
    try {
      restoreOriginalText();
      // 发送状态更新消息
      chrome.runtime.sendMessage({
        type: "UPDATE_CONVERSION_STATUS",
        status: ConversionStatus.IDLE
      });
      sendResponse({ status: "success" });

      // 发送 toast 消息
      chrome.runtime.sendMessage({
        type: ToastType.PAGE_RESTORED,
        language: 'en'
      });
    } catch (error) {
      console.error('Error during restoration:', error);
      sendResponse({ status: "error", error: error.message });

      // 添加恢复失败的 toast 消息
      chrome.runtime.sendMessage({
        type: ToastType.ERROR_RESTORE
      });
    }
    return true;
  }
});

// 导出主函数
export async function restorePage(): Promise<void> {
  restoreOriginalText()
}

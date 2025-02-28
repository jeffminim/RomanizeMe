import { scanTextContent } from "~contents/scan-texts";
import { TextSegmenter } from "~contents/text-segmenter";
import type { Language } from "~types/languages";
import type { PlasmoCSConfig } from "plasmo"
import { processTexts } from './process-texts';
import { ConversionStatus } from "~types/conversion-status"
import { useLanguagePanel } from "~core/language-panel"
import { ToastType } from "~types/toast"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  css: ["content.css"],
  // world: "MAIN",
};

// 当前转换状态
let currentStatus: ConversionStatus = ConversionStatus.IDLE;

// 保存当前状态到storage.session
function persistStatus(status: ConversionStatus) {
  currentStatus = status;
  chrome.runtime.sendMessage({
    type: "UPDATE_CONVERSION_STATUS",
    status: status
  });
}

// 主转换逻辑
async function performConversion(selectedLanguage: Language) {
  if (currentStatus === ConversionStatus.PROCESSING) {
    console.warn("Conversion already in progress");
    return;
  }

  try {
    persistStatus(ConversionStatus.PROCESSING);
    
    // 1. 扫描文本节点
    const filteredTexts = scanTextContent(selectedLanguage.writtenScript);
    if (!filteredTexts.length) {
      console.warn("No matching text found");
      persistStatus(ConversionStatus.NO_LANGUAGE_SELECTED);

      // 发送未发现可转换文本的 toast 消息
      chrome.runtime.sendMessage({
        type: ToastType.NO_TEXT_FOUND
      }, (response) => {
        if (chrome.runtime.lastError) {
          console.error('Error sending toast message:', chrome.runtime.lastError);
        } else {
          console.log('No text found toast message sent successfully');
        }
      });
      return;
    }

    // 2. 获取所有标记的span元素
    const targetSpans = document.querySelectorAll<HTMLElement>(`[rm-marker="par"]`);
    
    // 3. 对每个span进行分词处理
    targetSpans.forEach(span => {
      const text = span.textContent || '';
      // console.log('Processing span with text:', text);
      
      // 根据语言设置选择分词方式
      const segments = TextSegmenter.segmentText(
        text, 
        selectedLanguage.writtenScript[0].segmentation,
        selectedLanguage.writtenScript
      );
      // console.log('Segments:', segments);
      
      // 用新的span包装分词结果
      TextSegmenter.wrapSegmentedText(span, segments);
      
      // console.log('Span after wrapping:', span.innerHTML);
    });

    // 4. 获取所有标记为word的span元素
    const wordSpans = document.querySelectorAll<HTMLElement>(`[rm-marker="word"]`);
    const textsToProcess = Array.from(wordSpans).map(span => span.textContent || '');

    // 5. 处理文本转换
    await processTexts(textsToProcess, selectedLanguage);

    persistStatus(ConversionStatus.COMPLETED);

    // 发送转换完成的 toast 消息
    chrome.runtime.sendMessage({
      type: ToastType.CONVERSION_COMPLETE,
      language: selectedLanguage.code
    });

    console.log("Text conversion completed successfully");
  } catch (error) {
    console.error("Conversion error:", error);
    persistStatus(ConversionStatus.ERROR);

    // 添加转换失败的 toast 消息
    chrome.runtime.sendMessage({
      type: ToastType.ERROR_CONVERSION
    });
  }
}

// 监听 Romanize 按钮点击事件
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "START_CONVERSION" && message.language) {
    performConversion(message.language)
      .then(() => {
        sendResponse({ status: "success" });
      })
      .catch(error => {
        sendResponse({ status: "error", error: error.message });
      });
    return true;
  }

  // 添加状态查询处理
  if (message.type === "GET_CONVERSION_STATUS") {
    // 返回当前内容脚本中的状态
    sendResponse({ status: currentStatus });
    return true;
  }
});

// 导出主函数
export async function convertPage(selectedLanguage: Language): Promise<void> {
  if (!selectedLanguage) {
    console.warn("No language selected");
    return;
  }

  await performConversion(selectedLanguage);
}

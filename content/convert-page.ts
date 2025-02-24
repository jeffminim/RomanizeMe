import { processTexts } from "~contents/process-texts";
import { scanTextContent } from "~contents/scan-texts";
import { TextSegmenter } from "~contents/text-segmenter";
import type { Language } from "~types/languages";

// 将罗马音标注在原文上
function annotateText(
  originalText: string,
  processedText: string,
  segmentation: string
): string {
  // 创建带有样式的标注
  return `
    <span class="romanized-word">
      ${originalText}
      <span class="romanized-mark">${processedText}</span>
    </span>
  `;
}

// 主函数：转换并标注文本
export async function convertPage(selectedLanguage: Language): Promise<void> {
  if (!selectedLanguage) {
    console.warn("No language selected");
    return;
  }

  // 1. 扫描文本节点，过滤出符合选择的语言文字类型的文本
  const filteredTexts = scanTextContent(selectedLanguage.writtenScript);

  // 2. 对过滤后的文本进行分词
  const segmentation = selectedLanguage.writtenScript[0].segmentation;
  const segmentedTexts = filteredTexts.flatMap(text =>
    TextSegmenter.segmentText(text, segmentation)
  );

  // 3. 将分词后的文本转换为罗马音
  const processedTexts = await processTexts(segmentedTexts, selectedLanguage);

  // 4. 将转换后的罗马音标注在原文上
  const textNodes = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: (node) => {
        if (
          node.parentElement &&
          ["SCRIPT", "STYLE", "NOSCRIPT", "IFRAME"].includes(
            node.parentElement.tagName
          )
        ) {
          return NodeFilter.FILTER_REJECT;
        }
        if (!node.textContent || !node.textContent.trim()) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      },
    }
  );

  let processedIndex = 0;
  while (textNodes.nextNode()) {
    const node = textNodes.currentNode;
    const originalText = node.textContent.trim();
    if (!originalText) continue;

    if (processedIndex < processedTexts.length) {
      const annotatedText = annotateText(originalText, processedTexts[processedIndex], segmentation);
      // 创建一个新的 span 元素来替换原始文本节点
      const span = document.createElement('span');
      span.innerHTML = annotatedText;
      (node as Element).replaceWith(span);
      processedIndex++;
    }
  }
}

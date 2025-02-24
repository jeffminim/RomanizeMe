import type { Script } from "~types/languages";

// 获取页面中的所有文本节点
export function scanTextNodes(): Node[] {
  const textNodes: Node[] = [];
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: (node) => {
        // 过滤掉 script、style 等标签内的文本节点
        if (
          node.parentElement &&
          ["SCRIPT", "STYLE", "NOSCRIPT", "IFRAME"].includes(
            node.parentElement.tagName
          )
        ) {
          return NodeFilter.FILTER_REJECT;
        }
        // 过滤掉空文本节点
        if (!node.textContent || !node.textContent.trim()) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      },
    }
  );

  while (walker.nextNode()) {
    textNodes.push(walker.currentNode);
  }

  return textNodes;
}

// 判断字符是否在指定的 Unicode 范围内
function isCharInScript(char: string, scripts: Script[]): boolean {
  const codePoint = char.codePointAt(0);
  if (codePoint === undefined) return false;

  return scripts.some(script =>
    script.unicodeRanges.some(([start, end]) =>
      codePoint >= start && codePoint <= end
    )
  );
}

// 获取页面中的所有文本内容，并根据 Script 过滤
export function scanTextContent(scripts: Script[]): string[] {
  const textNodes = scanTextNodes();
  const filteredTexts: string[] = [];

  for (const node of textNodes) {
    const textContent = node.textContent.trim();
    if (!textContent) continue;

    let currentText = "";
    for (const char of textContent) {
      if (isCharInScript(char, scripts)) {
        currentText += char;
      } else if (currentText) {
        // 遇到非目标字符时，闭合当前文本段
        filteredTexts.push(currentText);
        currentText = "";
      }
    }

    // 添加最后一个文本段
    if (currentText) {
      filteredTexts.push(currentText);
    }
  }

  return filteredTexts;
}

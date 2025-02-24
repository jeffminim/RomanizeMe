import type { Script } from "~types/languages";
import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  world: "MAIN",
};

// 标记节点的自定义属性
const MARKER_ATTR = "rm-marker";
// const MARKER_VALUE = "par";

// 获取页面中的所有文本节点
export function getTextNodes(): Node[] {
  const textNodes: Node[] = [];
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: (node) => {
        // 过滤掉 script、style 等标签内的文本节点
        if (node.parentElement && ["SCRIPT", "STYLE", "NOSCRIPT", "IFRAME"].includes(node.parentElement.tagName)) {
          return NodeFilter.FILTER_REJECT;
        }
        // 过滤掉空文本节点
        if (!node.textContent?.trim()) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    }
  );

  while (walker.nextNode()) {
    textNodes.push(walker.currentNode);
  }
  return textNodes;
}

// 判断字符是否在指定的 Unicode 范围内
export function isCharInScript(char: string, scripts: Script[]): boolean {
  const codePoint = char.codePointAt(0);
  return codePoint !== undefined && 
    scripts.some(script =>
      script.unicodeRanges.some(([start, end]) =>
        codePoint >= start && codePoint <= end
      )
    );
}

// 判断字符类型
function getCharType(char: string): 'num' | 'sym' | 'space' | 'text' {
  if (/[0-9]/.test(char)) return 'num';
  if (/[\p{P}\p{S}]/u.test(char)) return 'sym';
  if (/\s/.test(char)) return 'space';
  return 'text';
}

// 包装文本节点（修改后的版本）
function wrapTextNode(node: Node, scripts: Script[]): void {
  const text = node.textContent || '';
  const fragment = document.createDocumentFragment();
  
  let currentType: 'num' | 'sym' | 'space' | 'text' | null = null;
  let currentText = '';

  for (const char of text) {
    const charType = getCharType(char);
    
    // 如果是空格，直接添加到文档片段
    if (charType === 'space') {
      if (currentText) {
        const span = createSpan(currentText, currentType, scripts);
        fragment.appendChild(span);
        currentText = '';
        currentType = null;
      }
      fragment.appendChild(document.createTextNode(char));
      continue;
    }

    // 如果字符类型改变，创建新的span
    if (charType !== currentType) {
      if (currentText) {
        const span = createSpan(currentText, currentType, scripts);
        fragment.appendChild(span);
      }
      currentText = char;
      currentType = charType;
    } else {
      currentText += char;
    }
  }

  // 处理最后剩余的文本
  if (currentText) {
    const span = createSpan(currentText, currentType, scripts);
    fragment.appendChild(span);
  }

  // 替换原有节点
  if (node.parentNode) {
    node.parentNode.replaceChild(fragment, node);
  }
}

// 创建带有正确标记的span元素
function createSpan(text: string, type: 'num' | 'sym' | 'text' | null, scripts: Script[]): HTMLSpanElement {
  const span = document.createElement('span');
  
  // 根据字符类型设置rm-marker属性
  if (type === 'num') {
    span.setAttribute(MARKER_ATTR, 'num');
  } else if (type === 'sym') {
    span.setAttribute(MARKER_ATTR, 'sym');
  } else if (type === 'text') {
    // 对于文本，需要检查是否包含目标脚本字符
    const hasTargetScript = [...text].some(char => isCharInScript(char, scripts));
    span.setAttribute(MARKER_ATTR, hasTargetScript ? 'par' : 'text');
  }
  
  span.textContent = text;
  return span;
}

// 修改markTextNode函数调用wrapTextNode的方式
export function markTextNode(node: Node, scripts: Script[]): boolean {
  const textContent = node.textContent?.trim();
  if (!textContent) return false;

  let hasTargetScript = false;
  for (const char of textContent) {
    if (isCharInScript(char, scripts)) {
      hasTargetScript = true;
      break;
    }
  }

  if (hasTargetScript) {
    wrapTextNode(node, scripts);
    return true;
  }
  return false;
}

// 主扫描函数
export function scanTextContent(scripts: Script[]): string[] {
  const textNodes = getTextNodes();
  const matchedTexts: string[] = [];

  for (const node of textNodes) {
    if (markTextNode(node, scripts)) {
      const text = node.textContent?.trim();
      if (text) {
        matchedTexts.push(text);
      }
    }
  }

  // console.log(`Found ${matchedTexts.length} text nodes with target script`);
  return matchedTexts;
}

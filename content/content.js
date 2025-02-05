// 加载文本分割器
const script = document.createElement('script');
script.src = chrome.runtime.getURL('content/text_segmenter.js');
document.head.appendChild(script);

// 在文件开头加载配置
let languageConfig;

(async function loadConfig() {
  try {
    const response = await fetch(chrome.runtime.getURL('config/languages.json'));
    languageConfig = await response.json();
  } catch (error) {
    console.error('Error loading language config:', error);
  }
})();

// 检测字符所属的文字系统
function detectCharScript(char, selectedScripts) {
  const charCode = char.charCodeAt(0);
  
  // 只检查用户在 popup 中选中的文字系统
  for (const selected of selectedScripts) {
    const scriptConfig = languageConfig.scripts.find(s => s.scriptId === selected.scriptId);
    if (!scriptConfig) continue;
    
    const isInRange = scriptConfig.unicodeRanges.some(range => {
      const [start, end] = range.split('-').map(hex => parseInt(hex, 16));
      return charCode >= start && charCode <= end;
    });

    if (isInRange) {
      return scriptConfig;
    }
  }
  
  return null;
}

// 监听来自 popup 的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Received message in content script:', request);
  
  if (request.action === 'romanize') {
    console.log('Starting romanization with scripts:', request.scripts);
    romanizePage(request.scripts);
    sendResponse({status: 'started'});
  } else if (request.action === 'restore') {
    console.log('Starting page restoration');
    restorePage();
    sendResponse({status: 'restored'});
  }
  return true;
});

function romanizePage(selectedScripts) {
  console.log('Starting romanization with scripts:', selectedScripts);
  try {
    const textNodes = getAllTextNodes(document.body);
    console.log('Found text nodes:', textNodes.length);
    
    textNodes.forEach((node) => {
      const originalText = node.textContent;
      const newText = processText(originalText, selectedScripts);
      if (newText) {
        const wrapper = document.createElement('span');
        wrapper.innerHTML = newText;
        node.parentNode.replaceChild(wrapper, node);
      }
    });
  } catch (error) {
    console.error('Error in romanizePage:', error);
  }
}

// 处理文本的主函数
function processText(originalText, selectedScripts) {
  if (!selectedScripts?.[0]) return '';

  const segmentation = selectedScripts[0].segmentation || 'word';
  const methodMap = {
    'character': 'splitTextByChar',
    'tokenizeJapanese': 'tokenizeJapanese',
    'tokenizeChinese': 'tokenizeChinese',
    'word': 'splitTextByWord'
  };

  const method = methodMap[segmentation] || 'splitTextByWord';
  return TextSegmenter[method]?.(originalText, selectedScripts) || '';
}

// 处理单个词的函数
function processWord(word, currentScript, selectedScripts) {
  const selectedScript = selectedScripts.find(s => s.scriptId === currentScript.scriptId);
  if (selectedScript && typeof window[selectedScript.functionName] === 'function') {
    const romanized = window[selectedScript.functionName](word);
    if (romanized !== word) {
      return `<span class="romanized-word"><span class="romanized-mark">${romanized}</span>${word}</span>`;
    }
  }
  return word;
}

// 获取所有文本节点的辅助函数
function getAllTextNodes(node) {
  const textNodes = [];
  
  if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
    textNodes.push(node);
    return textNodes;
  }

  if (node.classList && (
    node.classList.contains('romanized-text') || 
    node.classList.contains('romanized-word') ||
    node.tagName === 'SCRIPT' || 
    node.tagName === 'STYLE' || 
    node.tagName === 'NOSCRIPT'
  )) {
    return textNodes;
  }

  const children = node.childNodes;
  for (let i = 0; i < children.length; i++) {
    textNodes.push(...getAllTextNodes(children[i]));
  }

  return textNodes;
}

// 修改还原页面的函数
function restorePage() {
  try {
    const romanizedElements = document.querySelectorAll('.romanized-word');
    
    romanizedElements.forEach(element => {
      const originalText = element.lastChild.textContent;
      const textNode = document.createTextNode(originalText);
      element.parentNode.replaceChild(textNode, element);
    });

    const styleSheet = document.querySelector('#romanization-styles');
    if (styleSheet) {
      styleSheet.remove();
    }

    console.log('Page restored successfully');
  } catch (error) {
    console.error('Error in restorePage:', error);
  }
}

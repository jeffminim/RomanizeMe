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
      const newText = processText(originalText, selectedScripts); // 调用新函数处理文本
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

// 处理文本的主函数，根据语言设置决定调用哪种分割方式
function processText(originalText, selectedScripts) {
  const languageConfig = getLanguageConfig(selectedScripts); // 获取语言配置
  let newText = '';

  if (languageConfig === 'word') {
    newText = splitTextByWord(originalText, selectedScripts);
  } else if (languageConfig === 'char') {
    newText = splitTextByChar(originalText, selectedScripts);
  }

  return newText; // 返回处理后的文本
}

// 新的函数，用于按词分割文本
function splitTextByWord(originalText, selectedScripts) {
  let newText = '';
  let hasConversion = false;
  let currentWord = '';
  let currentScript = null;

  for (let i = 0; i < originalText.length; i++) {
    const char = originalText[i];
    const script = detectCharScript(char, selectedScripts);
    
    if (char.trim() === '' || /[.,!?;:，。！？；：]/.test(char) || 
        (currentScript && script !== currentScript)) {
      if (currentWord && currentScript) {
        newText += processWord(currentWord, currentScript, selectedScripts); // 传递 selectedScripts
        hasConversion = true;
      }
      newText += char;
      currentWord = '';
      currentScript = null;
    } else if (script) {
      if (!currentScript) {
        currentScript = script;
      }
      currentWord += char;
    } else {
      newText += char;
    }
  }

  if (currentWord && currentScript) {
    newText += processWord(currentWord, currentScript, selectedScripts); // 传递 selectedScripts
    hasConversion = true;
  }

  return hasConversion ? newText : null; // 只有在有转换时才返回新文本
}

// 新的函数，用于按字分割文本
function splitTextByChar(originalText, selectedScripts) {
  let newText = '';
  let hasConversion = false;

  for (let i = 0; i < originalText.length; i++) {
    const char = originalText[i];
    const script = detectCharScript(char, selectedScripts);
    
    if (script) {
      newText += processWord(char, script, selectedScripts); // 传递 selectedScripts
      hasConversion = true;
    } else {
      newText += char;
    }
  }

  return hasConversion ? newText : null; // 只有在有转换时才返回新文本
}

// 处理单个词的函数
function processWord(word, currentScript, selectedScripts) { // 添加 selectedScripts 参数
  const selectedScript = selectedScripts.find(s => s.scriptId === currentScript.scriptId);
  if (selectedScript && typeof window[selectedScript.functionName] === 'function') {
    const romanized = window[selectedScript.functionName](word);
    if (romanized !== word) {
      return `<span class="romanized-word"><span class="romanized-mark">${romanized}</span>${word}</span>`;
    }
  }
  return word; // 如果没有转换，返回原始词
}

// 获取所有文本节点的辅助函数
function getAllTextNodes(node) {
  const textNodes = [];
  
  // 如果是文本节点且不是空白节点
  if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
    textNodes.push(node);
    return textNodes;
  }

  // 如果节点已经被处理过，或者是不需要处理的节点，则跳过
  if (node.classList && (
    node.classList.contains('romanized-text') || 
    node.classList.contains('romanized-word') ||
    node.tagName === 'SCRIPT' || 
    node.tagName === 'STYLE' || 
    node.tagName === 'NOSCRIPT'
  )) {
    return textNodes;
  }

  // 递归处理子节点
  const children = node.childNodes;
  for (let i = 0; i < children.length; i++) {
    textNodes.push(...getAllTextNodes(children[i]));
  }

  return textNodes;
}

// 修改还原页面的函数
function restorePage() {
  try {
    // 查找所有带有 romanized-word 类的元素
    const romanizedElements = document.querySelectorAll('.romanized-word');
    
    romanizedElements.forEach(element => {
      // 获取原始文本（不包括罗马音部分）
      const originalText = element.lastChild.textContent; // 获取最后一个子节点的文本（原文）
      
      // 创建文本节点
      const textNode = document.createTextNode(originalText);
      
      // 替换回原始文本
      element.parentNode.replaceChild(textNode, element);
    });

    // 移除样式表
    const styleSheet = document.querySelector('#romanization-styles');
    if (styleSheet) {
      styleSheet.remove();
    }

    console.log('Page restored successfully');
  } catch (error) {
    console.error('Error in restorePage:', error);
  }
}

// 获取语言配置的函数
function getLanguageConfig(selectedScripts) {
  console.log('getLanguageConfig', selectedScripts);
  
  if (!languageConfig || !selectedScripts) {
    console.log('getLanguageConfig2', 'default');  
    return 'word'; // 默认值
  }

  // 获取第一个选中语言的配置
  const selectedScript = selectedScripts[0];
  if (!selectedScript) return 'word';


  console.log('getLanguageConfig2', selectedScripts[0]?.segmentation);
  // 返回分割方式，如果没有配置则使用默认值
  return selectedScripts[0]?.segmentation === 'character' ? 'char' : 'word';
}




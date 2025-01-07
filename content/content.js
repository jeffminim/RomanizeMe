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
    // 获取所有文本节点
    const textNodes = getAllTextNodes(document.body);
    console.log('Found text nodes:', textNodes.length);
    
    // 处理每个文本节点
    textNodes.forEach((node, index) => {
      const originalText = node.textContent;
      let newText = '';
      let hasConversion = false;
      let currentWord = '';
      let currentScript = null;
      
      // 逐字符处理文本，收集词
      for (let i = 0; i < originalText.length; i++) {
        const char = originalText[i];
        const script = detectCharScript(char, selectedScripts);
        
        // 如果是空格或标点，或者文字系统改变，则处理当前收集的词
        if (char.trim() === '' || /[.,!?;:，。！？；：]/.test(char) || 
            (currentScript && script !== currentScript)) {
          // 处理之前收集的词
          if (currentWord && currentScript) {
            const selectedScript = selectedScripts.find(s => s.scriptId === currentScript.scriptId);
            if (selectedScript && typeof window[selectedScript.functionName] === 'function') {
              const romanized = window[selectedScript.functionName](currentWord);
              if (romanized !== currentWord) {
                newText += `<span class="romanized-word"><span class="romanized-mark">${romanized}</span>${currentWord}</span>`;
                hasConversion = true;
              } else {
                newText += currentWord;
              }
            } else {
              newText += currentWord;
            }
          }
          
          // 添加空格或标点
          newText += char;
          
          // 重置收集器
          currentWord = '';
          currentScript = null;
        } else if (script) {
          // 如果是相同文字系统的字符，继续收集
          if (!currentScript) {
            currentScript = script;
          }
          currentWord += char;
        } else {
          // 处理之前收集的词
          if (currentWord && currentScript) {
            const selectedScript = selectedScripts.find(s => s.scriptId === currentScript.scriptId);
            if (selectedScript && typeof window[selectedScript.functionName] === 'function') {
              const romanized = window[selectedScript.functionName](currentWord);
              if (romanized !== currentWord) {
                newText += `<span class="romanized-word"><span class="romanized-mark">${romanized}</span>${currentWord}</span>`;
                hasConversion = true;
              } else {
                newText += currentWord;
              }
            } else {
              newText += currentWord;
            }
            currentWord = '';
            currentScript = null;
          }
          // 添加非目标文字系统的字符
          newText += char;
        }
      }
      
      // 处理最后一个词
      if (currentWord && currentScript) {
        const selectedScript = selectedScripts.find(s => s.scriptId === currentScript.scriptId);
        if (selectedScript && typeof window[selectedScript.functionName] === 'function') {
          const romanized = window[selectedScript.functionName](currentWord);
          if (romanized !== currentWord) {
            newText += `<span class="romanized-word"><span class="romanized-mark">${romanized}</span>${currentWord}</span>`;
            hasConversion = true;
          } else {
            newText += currentWord;
          }
        } else {
          newText += currentWord;
        }
      }

      // 只有当有转换发生时才替换节点
      if (hasConversion) {
        const wrapper = document.createElement('span');
        wrapper.innerHTML = newText;
        node.parentNode.replaceChild(wrapper, node);
      }
    });
  } catch (error) {
    console.error('Error in romanizePage:', error);
  }
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


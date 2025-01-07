let config;

// 加载配置
async function loadConfig() {
  const response = await fetch(chrome.runtime.getURL('config/languages.json'));
  config = await response.json();
}

// 检测字符所属的文字系统
function detectCharScript(char) {
  const charCode = char.charCodeAt(0);
  
  for (const script of config.scripts) {
    // 检查字符是否在当前文字系统的任何 Unicode 范围内
    const isInRange = script.unicodeRanges.some(range => {
      const [start, end] = range.split('-').map(hex => parseInt(hex, 16));
      return charCode >= start && charCode <= end;
    });

    if (isInRange) {
      return script;
    }
  }
  
  return null;
}

// 监听来自 popup 的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Received message:', request);
  
  if (request.action === 'romanize') {
    romanizePage(request.scripts);
    sendResponse({status: 'started'});
  }
  return true;
});

async function romanizePage(selectedScripts) {
  console.log('Starting romanization with scripts:', selectedScripts);

  try {
    // 确保配置已加载
    if (!config) {
      await loadConfig();
    }

    // 确保样式表只被注入一次
    if (!document.querySelector('#romanization-styles')) {
      const style = document.createElement('link');
      style.id = 'romanization-styles';
      style.rel = 'stylesheet';
      style.type = 'text/css';
      style.href = chrome.runtime.getURL('content/content.css');
      document.head.appendChild(style);
    }

    // 获取所有文本节点
    const textNodes = getAllTextNodes(document.body);
    console.log('Found text nodes:', textNodes.length);
    
    // 处理每个文本节点
    textNodes.forEach(node => {
      const originalText = node.textContent;
      let newText = '';
      let hasConversion = false;
      let currentWord = '';
      let currentScript = null;
      
      // 逐字符处理文本，收集词
      for (let i = 0; i < originalText.length; i++) {
        const char = originalText[i];
        const script = detectCharScript(char);
        
        // 如果是空格或标点，或者文字系统改变，则处理当前收集的词
        if (char.trim() === '' || /[.,!?;:，。！？；：]/.test(char) || 
            (currentScript && script !== currentScript)) {
          // 处理之前收集的词
          if (currentWord && currentScript) {
            const selectedScript = selectedScripts.find(s => s.scriptId === currentScript.id);
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
            const selectedScript = selectedScripts.find(s => s.scriptId === currentScript.id);
            if (selectedScript && typeof window[selectedScript.functionName] === 'function') {
              const romanized = window[selectedScript.functionName](currentWord);
              if (romanized !== currentWord) {
                newText += `<span class="romanized-word"><span class="romanized">${romanized}</span>${currentWord}</span>`;
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
        const selectedScript = selectedScripts.find(s => s.scriptId === currentScript.id);
        if (selectedScript && typeof window[selectedScript.functionName] === 'function') {
          const romanized = window[selectedScript.functionName](currentWord);
          if (romanized !== currentWord) {
            newText += `<span class="romanized-word"><span class="romanized">${romanized}</span>${currentWord}</span>`;
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


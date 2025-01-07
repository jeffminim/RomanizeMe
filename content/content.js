// 由于Chrome扩展的限制,我们不能使用ES6模块语法
// getKoreanRomanization 函数已在 ko_hangul.js 中通过 script 标签引入


function restorePage() {
  const elements = document.querySelectorAll('.romanized');
  elements.forEach(element => {
    const originalText = element.getAttribute('data-original-text');
    if (originalText) {
      // 创建一个文本节点来替换带注音的内容
      const textNode = document.createTextNode(originalText);
      element.replaceWith(textNode);
    }
  });
}

function shouldTranslateElement(element) {
  // 如果元素不可见或没有文本内容，则跳过
  if (!element.offsetParent || !element.textContent.trim()) {
    return false;
  }

  // 检查是否是文本节点
  if (element.nodeType === Node.TEXT_NODE) {
    return true;
  }

  // 排除更多非正文标签
  const excludedTags = [
    'script', 'style', 'meta', 'link', 'head', 'title', 
    'input', 'textarea', 'button', 'select', 'option',
    'noscript', 'iframe', 'svg', 'path', 'br', 'hr'
  ];
  
  if (excludedTags.includes(element.tagName.toLowerCase())) {
    return false;
  }

  // 排除编辑器、代码块等特殊区域
  const excludedClasses = [
    'no-translate', 'code', 'math', 'editor', 
    'ace_editor', 'highlight', 'prism'
  ];
  
  // 排除常见的非正文区域
  const excludedIds = [
    'header', 'footer', 'sidebar', 'nav', 'menu',
    'toolbar', 'copyright', 'search'
  ];

  if (
    excludedClasses.some(cls => element.classList.contains(cls)) || 
    excludedIds.some(id => element.id.toLowerCase().includes(id))
  ) {
    return false;
  }

  // 检查元素的计算样式
  const computedStyle = window.getComputedStyle(element);
  if (
    computedStyle.display === 'none' ||
    computedStyle.visibility === 'hidden' ||
    computedStyle.opacity === '0'
  ) {
    return false;
  }

  // 只处理直接包含文本的元素
  const hasDirectTextChild = Array.from(element.childNodes)
    .some(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim());

  return hasDirectTextChild;
}


function romanizeText(text, selectedLanguages) {
  let romanizedText = '';
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const { language, charType } = detectCharLanguageAndType(char);
    if (selectedLanguages.includes(language)) {
      const romanized = getRomanization(char, charType);
      romanizedText += romanized;
      // console.log('Romanized char:', {
      //   original: char,
      //   romanized: romanized,
      //   language: language,
      //   charType: charType
      // });
    } else {
      romanizedText += char;
    }
  }

  return romanizedText;
}
function romanizePage(selectedLanguages) {
  // 保存选中的语言供检测函数使用
  window.selectedLanguages = selectedLanguages;
  
  // 确保样式表只被注入一次
  if (!document.querySelector('#romanization-styles')) {
    const style = document.createElement('link');
    style.id = 'romanization-styles';
    style.rel = 'stylesheet';
    style.type = 'text/css';
    style.href = chrome.runtime.getURL('content/content.css');
    document.head.appendChild(style);
  }

  function getAllTextNodes(node) {
    const textNodes = [];
    const walker = document.createTreeWalker(
      node,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function(node) {
          return shouldTranslateElement(node.parentElement) 
            ? NodeFilter.FILTER_ACCEPT 
            : NodeFilter.FILTER_REJECT;
        }
      }
    );

    let currentNode;
    while (currentNode = walker.nextNode()) {
      textNodes.push(currentNode);
    }
    return textNodes;
  }

  // 分词函数
  function splitIntoWords(text) {
    const words = [];
    let currentWord = '';
    let currentType = null;

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const { language, charType } = detectCharLanguageAndType(char);
      
      // 如果是空格或标点，直接作为单独的"词"
      if (/\s/.test(char) || /[，。！？：；（）、]/g.test(char)) {
        if (currentWord) {
          words.push({
            text: currentWord,
            type: currentType
          });
          currentWord = '';
        }
        words.push({
          text: char,
          type: 'punctuation'
        });
        currentType = null;
      } else {
        // 如果当前字符类型与之前不同，说明是新词的开始
        if (currentType && currentType !== language) {
          if (currentWord) {
            words.push({
              text: currentWord,
              type: currentType
            });
            currentWord = '';
          }
        }
        currentWord += char;
        currentType = language;
      }
    }

    // 处理最后一个词
    if (currentWord) {
      words.push({
        text: currentWord,
        type: currentType
      });
    }

    return words;
  }

  const textNodes = getAllTextNodes(document.body);
  console.log('Found text nodes:', textNodes.length);

  textNodes.forEach(node => {
    const element = node.parentElement;
    if (!element.classList.contains('romanized')) {
      const originalText = node.textContent;
      const words = splitIntoWords(originalText);
      let newContent = '';
      let hasChanges = false;

      words.forEach(word => {
        if (selectedLanguages.includes(word.type)) {
          // 对整个词进行罗马音转换
          const romanized = getRomanization(word.text, word.type);
          if (romanized && romanized !== word.text) {
            newContent += `<span class="romanized-word">${word.text}<span class="romanized-mark">${romanized}</span></span>`;
            hasChanges = true;
          } else {
            newContent += word.text;
          }
        } else {
          newContent += word.text;
        }
      });

      if (hasChanges) {
        const tempContainer = document.createElement('span');
        tempContainer.innerHTML = newContent;
        tempContainer.classList.add('romanized');
        tempContainer.setAttribute('data-original-text', originalText);
        
        node.replaceWith(tempContainer);
      }
    }
  });
}

function detectCharLanguageAndType(char) {
  // 首先检测明确的非汉字字符
  if (isCharInRange(char, '\u30A0', '\u30FF')) { // 片假名
    return { script: 'kana', language: 'japanese', charType: 'katakana' };
  } else if (isCharInRange(char, '\u3040', '\u309F')) { // 平假名
    return { script: 'kana', language: 'japanese', charType: 'hiragana' };
  } else if (isCharInRange(char, '\uAC00', '\uD7A3')) { // 韩文
    return { script: 'hangul', language: 'korean', charType: 'hangul' };
  } else if (isCharInRange(char, '\u0600', '\u06FF')) { // 阿拉伯文
    return { script: 'arabic', language: 'arabic', charType: 'arabic' };
  } else if (isCharInRange(char, '\u0400', '\u04FF')) { // 俄文
    return { script: 'cyrillic', language: 'russian', charType: 'cyrillic' };
  } else if (isCharInRange(char, '\u4E00', '\u9FAF')) { // 汉字范围
    // 如果用户选择了汉字的语言
    if (window.selectedScripts && window.selectedScripts['汉字']) {
      return { 
        script: 'hanzi',
        language: window.selectedScripts['汉字'],
        charType: 'hanzi'
      };
    }
    // 默认作为中文处理
    return { script: 'hanzi', language: 'chinese_mandarin', charType: 'hanzi' };
  } else {
    return { script: 'latin', language: 'latin', charType: 'latin' };
  }
}

function isCharInRange(char, start, end) {
  return char >= start && char <= end;
}

function getRomanization(text, type) {
  switch (type) {
    case 'korean':
      return getKoreanRomanization(text);
    case 'japanese':
      // 添加日语转换逻辑
      return text;
    default:
      return text;
  }
}


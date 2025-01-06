// export  { romanizeText, restorePage };

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
  console.log('romanizeText input:', {
    text: text,
    selectedLanguages: selectedLanguages
  });
  
  let romanizedText = '';
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const { language, charType } = detectCharLanguageAndType(char);
    if (selectedLanguages.includes(language)) {
      const romanized = getRomanization(char, charType);
      romanizedText += romanized;
      console.log('Romanized char:', {
        original: char,
        romanized: romanized,
        language: language,
        charType: charType
      });
    } else {
      romanizedText += char;
    }
  }
  
  console.log('romanizeText output:', romanizedText);
  return romanizedText;
}
function romanizePage(selectedLanguages) {
  console.log('Starting romanizePage with languages:', selectedLanguages);
  
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
            console.log('Added romanization for word:', {
              original: word.text,
              romanized: romanized
            });
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
        
        console.log('Node updated:', {
          original: originalText,
          new: tempContainer.innerHTML
        });
      }
    }
  });
}

function detectCharLanguageAndType(char) {
  if (isCharInRange(char, '\u30A0', '\u30FF')) { // 片假名
    return { language: 'japanese', charType: 'katakana' };
  } else if (isCharInRange(char, '\u3040', '\u309F')) { // 平假名
    return { language: 'japanese', charType: 'hiragana' };
  } else if (isCharInRange(char, '\u4E00', '\u9FAF')) { // 日文汉字
    return { language: 'japanese', charType: 'kanji' };
  } else if (isCharInRange(char, '\uAC00', '\uD7A3')) {
    return { language: 'korean', charType: 'korean' };
  } else if (isCharInRange(char, '\u0600', '\u06FF')) {
    return { language: 'arabic', charType: 'arabic' };
  } else if (isCharInRange(char, '\u0400', '\u04FF')) {
    return { language: 'russian', charType: 'russian' };
  } else {
    return { language: 'latin', charType: 'latin' };
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



// --------------------------------------------------------
// I have to integrate all the codes into this single file to make it work.
// The following codes are the basic logics for romanization.
// I will add more languages later.

// ----- Korean romanization ------

var alphabetKorean = {
  vowels: [
    'a',   // ㅏ
    'ae',  // ㅐ
    'ya',  // ㅑ
    'yae', // ㅒ
    'eo',  // ㅓ
    'e',   // ㅔ
    'yeo', // ㅕ
    'ye',  // ㅖ
    'o',   // ㅗ
    'wa',  // ㅘ
    'wae', // ㅙ
    'oe',  // ㅚ
    'yo',  // ㅛ
    'u',   // ㅜ
    'wo',  // ㅝ
    'we',  // ㅞ
    'wi',  // ㅟ
    'yu',  // ㅠ
    'eu',  // ㅡ
    'ui',  // ㅢ
    'i'    // ㅣ
  ],
  consonants: {
    initial: [
      'g',  // ㄱ
      'kk', // ㄲ
      'n',  // ㄴ
      'd',  // ㄷ
      'tt', // ㄸ
      'r',  // ㄹ
      'm',  // ㅁ
      'b',  // ㅂ
      'pp', // ㅃ
      's',  // ㅅ
      'ss', // ㅆ
      '',   // ㅇ
      'j',  // ㅈ
      'jj', // ㅉ
      'ch', // ㅊ
      'k',  // ㅋ
      't',  // ㅌ
      'p',  // ㅍ
      'h'   // ㅎ
    ],
    final: [
      '',    // 没有终声
      'k',   // ㄱ
      'k',   // ㄲ
      'k',   // ㄳ
      'n',   // ㄴ
      'n',   // ㄵ
      'n',   // ㄶ
      't',   // ㄷ
      'l',   // ㄹ
      'k',   // ㄺ
      'm',   // ㄻ
      'p',   // ㄼ
      't',   // ㄽ
      't',   // ㄾ
      'p',   // ㄿ
      'l',   // ㅀ
      'm',   // ㅁ
      'p',   // ㅂ
      'p',   // ㅄ
      't',   // ㅅ
      't',   // ㅆ
      'ng',  // ㅇ
      't',   // ㅈ
      't',   // ㅊ
      'k',   // ㅋ
      't',   // ㅌ
      'p',   // ㅍ
      'h'    // ㅎ
    ]
  }
};

function getKoreanRomanization(text) {
  let result = '';
  let currentSyllable = '';
  let isFirstSyllable = true;

  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i);

    if (charCode >= 0xAC00 && charCode <= 0xD7A3) {
      // 处理韩文音节
      const syllableIndex = charCode - 0xAC00;
      const initialIndex = Math.floor(syllableIndex / 588);
      const vowelIndex = Math.floor((syllableIndex % 588) / 28);
      const finalIndex = syllableIndex % 28;

      currentSyllable = '';
      
      // 添加初声（声母）
      currentSyllable += alphabetKorean.consonants.initial[initialIndex];
      
      // 添加中声（元音）
      currentSyllable += alphabetKorean.vowels[vowelIndex];
      
      // 添加终声（韵母），如果有的话
      if (finalIndex > 0) {
        currentSyllable += alphabetKorean.consonants.final[finalIndex];
      }

      // 处理连音规则
      if (!isFirstSyllable) {
        // 如果前一个音节以辅音结尾，当前音节以元音开始，需要特殊处理
        if (result.endsWith('k') || result.endsWith('t') || result.endsWith('p')) {
          // 处理音变规则
          const lastChar = result.charAt(result.length - 1);
          if (currentSyllable.startsWith('i') || currentSyllable.startsWith('y')) {
            // k, t, p 在 i, y 前变成 g, d, b
            const changes = { 'k': 'g', 't': 'd', 'p': 'b' };
            result = result.slice(0, -1) + changes[lastChar];
          }
        }
      }

      // 在音节之间添加分隔
      if (!isFirstSyllable) {
        result += '';  // 可以在这里添加音节分隔符，如果需要的话
      }
      
      result += currentSyllable;
      isFirstSyllable = false;
    } else {
      // 处理非韩文字符
      result += text[i];
      isFirstSyllable = true;  // 重置标志
    }
  }

  // 应用一些后处理规则
  result = result
    // 处理连音规则
    .replace(/n(g|k)/g, 'ng')
    .replace(/l(g|k)/g, 'lg')
    .replace(/l(m|b)/g, 'lm')
    .replace(/l(s|t)/g, 'lt')
    // 处理一些常见的发音规则
    .replace(/ls/g, 'ss')
    .replace(/lt/g, 'll')
    // 优化一些特殊情况
    .replace(/wi/g, 'ui')
    .replace(/wo/g, 'wo')
    // 处理重复的辅音
    .replace(/kk/g, 'k')
    .replace(/tt/g, 't')
    .replace(/pp/g, 'p')
    .replace(/ss/g, 's');

  console.log('Korean romanization:', {
    input: text,
    output: result
  });

  return result;
}



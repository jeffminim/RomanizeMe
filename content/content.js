// export  { romanizeText, restorePage };

function restorePage() {
  const elements = document.querySelectorAll('.romanized');
  elements.forEach(element => {
    const originalText = element.getAttribute('data-original-text');
    if (originalText) {
      element.innerHTML = originalText;
      element.removeAttribute('data-original-text');
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
    const style = document.createElement('style');
    style.id = 'romanization-styles';
    style.textContent = `
      .romanized-char {
        position: relative;
        display: inline-block;
      }
      
      .romanized-mark {
        position: absolute;
        top: -1.2em;
        left: 50%;
        transform: translateX(-50%);
        font-size: 0.8em;
        color: #666;
        white-space: nowrap;
        pointer-events: none;
        user-select: none;
        font-family: Arial, sans-serif;
      }
    `;
    document.head.appendChild(style);
  }

  // 获取所有文本节点
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

  // 获取所有需要处理的文本节点
  const textNodes = getAllTextNodes(document.body);
  console.log('Found text nodes:', textNodes.length);

  // 处理每个文本节点
  textNodes.forEach(node => {
    const element = node.parentElement;
    if (!element.classList.contains('romanized')) {
      const originalText = node.textContent;
      let newContent = '';
      let hasChanges = false;
      
      for (let i = 0; i < originalText.length; i++) {
        const char = originalText[i];
        const { language, charType } = detectCharLanguageAndType(char);
        
        if (selectedLanguages.includes(language)) {
          const romanized = getRomanization(char, charType);
          if (romanized && romanized !== char) {
            newContent += `<span class="romanized-char">${char}<span class="romanized-mark">${romanized}</span></span>`;
            hasChanges = true;
            console.log('Added romanization for:', {
              char: char,
              romanized: romanized
            });
          } else {
            newContent += char;
          }
        } else {
          newContent += char;
        }
      }
      
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

function getRomanization(char, charType) {
  switch (charType) {
    case 'korean':
      const romanized = getKoreanRomanization(char);
      console.log('Korean romanization:', {
        char: char,
        romanized: romanized
      });
      return romanized;
    default:
      return char;
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
    'yee', // ㅒ
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
      '',
      'k',  // ㄱ
      'k',  // ㄲ
      'kt', // ㄳ
      'n',  // ㄴ
      'nt', // ㄵ
      'nh', // ㄶ
      't',  // ㄷ
      'l',  // ㄹ
      'lk', // ㄺ
      'lm', // ㄻ
      'lp', // ㄼ
      'lt', // ㄽ
      'lt', // ㄾ
      'lp', // ㄿ
      'lh', // ㅀ
      'm',  // ㅁ
      'p',  // ㅂ
      'pt', // ㅄ
      't',  // ㅅ
      'tt', // ㅆ
      'ng', // ㅇ
      't',  // ㅈ
      't',  // ㅊ
      'k',  // ㅋ
      't',  // ㅌ
      'p',  // ㅍ
      'h'   // ㅎ
    ]
  }
};

function getKoreanRomanization(text) {
  let result = '';
  let currentSyllable = '';

  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i);

    if (charCode >= 0xAC00 && charCode <= 0xD7A3) {
      const syllableIndex = charCode - 0xAC00;
      const initialIndex = Math.floor(syllableIndex / 588);
      const vowelIndex = Math.floor((syllableIndex % 588) / 28);
      const finalIndex = syllableIndex % 28;

      currentSyllable += alphabetKorean.consonants.initial[initialIndex];
      currentSyllable += alphabetKorean.vowels[vowelIndex];
      currentSyllable += alphabetKorean.consonants.final[finalIndex];

      result += currentSyllable;
      currentSyllable = '';
    } else {
      result += text[i];
    }
  }

  return result;
}



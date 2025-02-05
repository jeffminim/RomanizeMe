// 加载TinySegmenter
const TinySegmenterScript = document.createElement('script');
TinySegmenterScript.src = chrome.runtime.getURL('libs/extra/TinySegmenterJapanese/tiny_segmenter-0.2.js');
document.head.appendChild(TinySegmenterScript);

// 文本分割工具类
class TextSegmenter {
  // 按词分割文本
  static splitTextByWord(originalText, selectedScripts) {
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
          newText += processWord(currentWord, currentScript, selectedScripts);
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
      newText += processWord(currentWord, currentScript, selectedScripts);
      hasConversion = true;
    }

    return hasConversion ? newText : null;
  }

  // 按字分割文本
  static splitTextByChar(originalText, selectedScripts) {
    let newText = '';
    let hasConversion = false;

    for (let i = 0; i < originalText.length; i++) {
      const char = originalText[i];
      const script = detectCharScript(char, selectedScripts);
      
      if (script) {
        newText += processWord(char, script, selectedScripts);
        hasConversion = true;
      } else {
        newText += char;
      }
    }

    return hasConversion ? newText : null;
  }

  // 日文自然语言分词
  static tokenizeJapanese(originalText, selectedScripts) {
    const segmenter = new TinySegmenter();
    const segments = segmenter.segment(originalText);
        
    let newText = '';
    let hasConversion = false;
    
    for (const segment of segments) {
      const script = detectCharScript(segment, selectedScripts);
            
      if (script) {
        const processed = processWord(segment, script, selectedScripts);
        newText += processed;
        hasConversion = true;
      } else {
        newText += segment;
      }
    }
    
    // console.log('最终输出:', newText);
    return hasConversion ? newText : null;
  }

  // 中文分词方法
  static tokenizeChinese(originalText, selectedScripts) {
    try {
      const segmenter = new Intl.Segmenter('zh', { granularity: 'word' });
      const segments = Array.from(segmenter.segment(originalText));
      
      let newText = '';
      let hasConversion = false;
      
      for (const segment of segments) {
        const word = segment.segment;
        // 跳过空格和标点
        if (word.trim() === '' || /[.,!?;:，。！？；：]/.test(word)) {
          newText += word;
          continue;
        }
        
        const script = detectCharScript(word[0], selectedScripts);
        if (script) {
          newText += processWord(word, script, selectedScripts);
          hasConversion = true;
        } else {
          newText += word;
        }
      }
      
      return hasConversion ? newText : null;
    } catch (error) {
      console.error('Error in tokenizeChinese:', error);
      return null;
    }
  }
}

window.TextSegmenter = TextSegmenter;

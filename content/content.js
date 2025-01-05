// export { romanizeText, restorePage };


// 导入不同语言和文字类型的罗马音转换函数
// import { getKatakanaRomanization } from './libs/japanese/katakana.js';
// import { getHiraganaRomanization } from './libs/japanese/hiragana.js';
// import { getKanjiRomanization } from './libs/japanese/kanji.js';
import { getKoreanRomanization } from '../libs/korean/kr.js';
// import { getArabicRomanization } from './libs/arabic.js';
// import { getRussianRomanization } from './libs/russian.js';

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

function romanizeText(text, selectedLanguages) {
  let romanizedText = '';
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const { language, charType } = detectCharLanguageAndType(char);
    if (selectedLanguages.includes(language)) {
      romanizedText += getRomanization(char, charType);
    } else {
      romanizedText += char;
    }
  }
  return romanizedText;
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
    // case 'katakana':
    //   return getKatakanaRomanization(char);
    // case 'hiragana':
    //   return getHiraganaRomanization(char);
    // case 'kanji':
    //   return getKanjiRomanization(char);
    case 'korean':
      return getKoreanRomanization(char);
    // case 'arabic':
    //   return getArabicRomanization(char);
    // case 'russian':
    //   return getRussianRomanization(char);
    default:
      return char;
  }
}

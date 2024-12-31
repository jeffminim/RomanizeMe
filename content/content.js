function romanizePage(selectedLanguages) {
  const elements = document.querySelectorAll('body *');
  elements.forEach(element => {
    const text = element.textContent;
    const romanizedText = romanizeText(text, selectedLanguages);
    if (romanizedText !== text) {
      element.innerHTML = romanizedText;
    }
  });
}

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
    let romanizedChar = char;
    if (selectedLanguages.includes('japanese') && isJapanese(char)) {
      romanizedChar = getJapaneseRomanization(char);
    } else if (selectedLanguages.includes('korean') && isKorean(char)) {
      romanizedChar = getKoreanRomanization(char);
    } else if (selectedLanguages.includes('arabic') && isArabic(char)) {
      romanizedChar = getArabicRomanization(char);
    } else if (selectedLanguages.includes('russian') && isRussian(char)) {
      romanizedChar = getRussianRomanization(char);
    }
    romanizedText += romanizedChar;
  }
  return romanizedText;
}

function isJapanese(char) {
  const japaneseRegex = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/;
  return japaneseRegex.test(char);
}

function isKorean(char) {
  const koreanRegex = /[\uAC00-\uD7A3]/;
  return koreanRegex.test(char);
}

function isArabic(char) {
  const arabicRegex = /[\u0600-\u06FF]/;
  return arabicRegex.test(char);
}

function isRussian(char) {
  const russianRegex = /[\u0400-\u04FF]/;
  return russianRegex.test(char);
}

function getJapaneseRomanization(char) {
  // 这里需要实现将日文转换为罗马音的逻辑
  return char; // 暂时返回原字符
}

function getKoreanRomanization(char) {
  // 这里需要实现将韩文转换为罗马音的逻辑
  return char; // 暂时返回原字符
}

function getArabicRomanization(char) {
  // 这里需要实现将阿拉伯文转换为罗马音的逻辑
  return char; // 暂时返回原字符
}

function getRussianRomanization(char) {
  // 这里需要实现将俄文转换为罗马音的逻辑
  return char; // 暂时返回原字符
}

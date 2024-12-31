let originalText = [];

function romanizePage(languages) {
  // 保存原始文本以便还原
  originalText = [];

  const body = document.body;
  const range = document.createRange();
  range.selectNodeContents(body);

  languages.forEach((lang) => {
    let regex;
    let romanizeFunc;

    switch (lang) {
      case 'japanese':
        regex = /[\p{Script=Hiragana}\p{Script=Katakana}\p{InCJK_Unified_Ideographs}\p{InCJK_Compatibility_Ideographs}\p{InCJK_Unified_Ideographs_Extension_A}\p{InCJK_Unified_Ideographs_Extension_B}\p{InCJK_Unified_Ideographs_Extension_C}\p{InCJK_Unified_Ideographs_Extension_D}\p{InCJK_Compatibility_Ideographs_Supplement}]/gu;
        romanizeFunc = romanizeJapanese;
        break;
      case 'korean':
        regex = /[\p{Script=Hangul}]/gu;
        romanizeFunc = romanizeKorean;
        break;
      case 'arabic':
        regex = /[ء-ي]/gu;
        romanizeFunc = romanizeArabic;
        break;
      case 'russian':
        regex = /[А-яЁё]/gu;
        romanizeFunc = romanizeRussian;
        break;
      default:
        return;
    }

    const walker = document.createTreeWalker(body, NodeFilter.SHOW_TEXT, null, false);
    let node;

    while ((node = walker.nextNode())) {
      const text = node.textContent;
      const matches = text.match(regex);

      if (matches) {
        const newText = text.replace(regex, (match) => {
          const romanized = romanizeFunc(match);
          originalText.push({ original: match, romanized: romanized });
          return `<span class="romanized" style="position:relative; display:inline-block;">
                    ${match}
                    <span class="romanized-mark">${romanized}</span>
                  </span>`;
        });

        const newNode = document.createTextNode(newText);
        range.setStartBefore(node);
        range.setEndAfter(node);
        range.deleteContents();
        range.insertNode(newNode);
      }
    }
  });
}

function restorePage() {
  originalText.forEach((item) => {
    document.body.innerHTML = document.body.innerHTML.replace(item.romanized, item.original);
  });
}

function romanizeJapanese(text) {
  // 使用某种方式将日文字符转为罗马音
  // 假设使用简单的映射示例
  return "romaji"; // 示例返回
}

function romanizeKorean(text) {
  return "romaji"; // 示例返回
}

function romanizeArabic(text) {
  return "romanization"; // 示例返回
}

function romanizeRussian(text) {
  return "romanization"; // 示例返回
}

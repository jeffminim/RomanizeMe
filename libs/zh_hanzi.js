/**
 * 汉字转拼音转换函数
 * @param {string} text - 需要转换的汉字文本
 * @returns {string} - 转换后的拼音文本
 */
function getChineseRomanization(text) {
  if (!window.pinyinPro) {
    console.error('PinyinPro not initialized');
    return text;
  }
  
  try {
    return window.pinyinPro.pinyin(text, {
      type: 'array'
    }).join(' ');
  } catch (error) {
    console.error('Error converting to pinyin:', error);
    return text;
  }
}


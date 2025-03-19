export default function PerArabic(text: string): string {
  // 波斯语（伊朗语）罗马化转换逻辑 - 采用UN(2012)标准
  
  // 单字母映射表
  const singleCharMap: Record<string, string> = {
    'ا': 'ā', // alef
    'آ': 'ā', // alef with madda
    'أ': 'a', // alef with hamza above
    'إ': 'e', // alef with hamza below
    'ب': 'b', // be
    'پ': 'p', // pe
    'ت': 't', // te
    'ث': 's̱', // se
    'ج': 'j', // jim
    'چ': 'ch', // che
    'ح': 'ḥ', // he
    'خ': 'kh', // khe
    'د': 'd', // dal
    'ذ': 'z̄', // zal
    'ر': 'r', // re
    'ز': 'z', // ze
    'ژ': 'zh', // zhe
    'س': 's', // sin
    'ش': 'sh', // shin
    'ص': 'ṣ', // sad
    'ض': 'ż', // zad
    'ط': 'ṭ', // ta
    'ظ': 'ẓ', // za
    'ع': 'ʿ', // eyn
    'غ': 'gh', // gheyn
    'ف': 'f', // fe
    'ق': 'q', // qaf
    'ک': 'k', // kaf
    'ك': 'k', // arabic kaf
    'گ': 'g', // gaf
    'ل': 'l', // lam
    'م': 'm', // mim
    'ن': 'n', // nun
    'و': 'v', // vav
    'ه': 'h', // he
    'ی': 'y', // ye
    'ي': 'y', // arabic ye
  };

  // 波斯语中的特殊音节和组合
  const specialCombinations: Record<string, string> = {
    'خو': 'kho', // kho
    'ای': 'āy', // ay
    'او': 'ow', // ow
    'وی': 'uy', // uy
    'یا': 'yā', // ya
  };

  // 添加数字映射表
  const numberMap: Record<string, string> = {
    '۰': '0', // 波斯语数字0
    '۱': '1', // 波斯语数字1
    '۲': '2', // 波斯语数字2
    '۳': '3', // 波斯语数字3
    '۴': '4', // 波斯语数字4
    '۵': '5', // 波斯语数字5
    '۶': '6', // 波斯语数字6
    '۷': '7', // 波斯语数字7
    '۸': '8', // 波斯语数字8
    '۹': '9', // 波斯语数字9
  };

  // 特殊读音规则
  const applySpecialRules = (text: string): string => {
    // 处理波斯语中的特殊读音规则
    
    // و在词尾或单独出现时发"u"音
    text = text.replace(/و(?!\w)/g, 'u');
    
    // و在词中发"o"音
    text = text.replace(/و(?=\w)/g, 'o');
    
    // ی前面有辅音且后面没有元音时，发"e"音
    text = text.replace(/(?<=[بپتثجچحخدذرزژسشصضطظعغفقکگلمنهی])ی(?![اآأإوی])/g, 'e');
    
    // 处理ezāfe结构（两名词连接）
    text = text.replace(/-e-/g, '-ye-');
    
    return text;
  };

  // 处理将阿拉伯字母转换为拉丁字母
  let result = '';
  let i = 0;
  
  while (i < text.length) {
    // 先检查是否是数字
    if (numberMap[text[i]]) {
      result += numberMap[text[i]];
      i++;
      continue;
    }
    
    // 先检查是否有特殊组合
    let found = false;
    for (const [arabicComb, latinComb] of Object.entries(specialCombinations)) {
      if (text.substr(i, arabicComb.length) === arabicComb) {
        result += latinComb;
        i += arabicComb.length;
        found = true;
        break;
      }
    }
    
    // 如果没有特殊组合，则按单字母转换
    if (!found) {
      const char = text[i];
      if (singleCharMap[char]) {
        result += singleCharMap[char];
      } else {
        // 如果不在转换表中，保留原字符
        result += char;
      }
      i++;
    }
  }
  
  // 应用特殊读音规则
  result = applySpecialRules(result);
  
  // 处理重音符号（塔什迪德）
  result = result.replace(/ّ/g, ''); // 暂时忽略重音符号，或者可以选择重复前一个字母
  
  // 处理短元音符号
  result = result.replace(/َ/g, 'a'); // fatḥa
  result = result.replace(/ِ/g, 'e'); // kasra
  result = result.replace(/ُ/g, 'o'); // ḍamma
  
  // 处理终止形式
  result = result.replace(/ة/g, 'eh');
  
  return result;
} 
export default function ThaThai(text: string): string {
  // 泰文字母到拉丁字母的映射表（基于RTGS标准）
  const thaiToLatinMap: Record<string, string> = {
    // 辅音
    'ก': 'k', 'ข': 'kh', 'ฃ': 'kh', 'ค': 'kh', 'ฅ': 'kh', 'ฆ': 'kh',
    'ง': 'ng',
    'จ': 'ch', 'ฉ': 'ch', 'ช': 'ch', 'ซ': 's', 'ฌ': 'ch',
    'ญ': 'y', 'ฎ': 'd', 'ฏ': 't', 'ฐ': 'th', 'ฑ': 'th', 'ฒ': 'th',
    'ณ': 'n', 'ด': 'd', 'ต': 't', 'ถ': 'th', 'ท': 'th', 'ธ': 'th',
    'น': 'n', 'บ': 'b', 'ป': 'p', 'ผ': 'ph', 'ฝ': 'f', 'พ': 'ph',
    'ฟ': 'f', 'ภ': 'ph', 'ม': 'm', 'ย': 'y', 'ร': 'r', 'ล': 'l',
    'ว': 'w', 'ศ': 's', 'ษ': 's', 'ส': 's', 'ห': 'h', 'ฬ': 'l',
    'อ': '', 'ฮ': 'h',
    
    // 数字
    '๐': '0', '๑': '1', '๒': '2', '๓': '3', '๔': '4',
    '๕': '5', '๖': '6', '๗': '7', '๘': '8', '๙': '9',
    
    // 特殊符号
    'ๆ': '', 'ฯ': '', '์': '', '็': ''
  };

  // 元音映射
  const vowelMap: Record<string, string> = {
    'ะ': 'a', 'า': 'a', 'ิ': 'i', 'ี': 'i', 'ึ': 'ue', 'ื': 'ue',
    'ุ': 'u', 'ู': 'u', 'เ': 'e', 'แ': 'ae', 'โ': 'o', 'ใ': 'ai',
    'ไ': 'ai', 'ำ': 'am', 'ฤ': 'rue', 'ฤๅ': 'rue', 'ฦ': 'lue',
    'ฦๅ': 'lue', 'ํ': 'am', 'ั': 'a', '็': '', 'ัว': 'ua'
  };

  // 特殊元音组合
  const specialVowelCombinations: Record<string, string> = {
    'เอ': 'oe',  // เ + อ = oe
    'อ': 'o',    // 单独的 อ 作为元音时为 o
    'เอี': 'oe', // เ + อ + ี = oe
    'เอือ': 'uea', // เ + อ + ื + อ = uea
    'เอีย': 'ia', // เ + อ + ี + ย = ia
    'เอือย': 'ueai' // เ + อ + ื + อ + ย = ueai
  };

  // 特殊组合映射
  const specialCombinations: Record<string, string> = {
    'รร': 'an', // -รร- 在辅音后通常发 "an" 音
    'ทร': 'th', // 在某些词中 ทร 发 "s" 音，但RTGS标准中通常仍转写为 "th"
    'ศร': 's', 
    'ราช': 'rat-cha',
    'ทัณฑ์': 'than'
  };

  // 音调符号
  const toneMarks = new Set(['่', '้', '๊', '๋']);
  
  // 前置元音
  const leadingVowels = new Set(['เ', 'แ', 'โ', 'ใ', 'ไ']);
  
  // 分析泰文文本
  let result = '';
  let i = 0;
  
  while (i < text.length) {
    // 检查特殊组合
    let foundSpecial = false;
    
    // 检查特殊元音组合
    for (const combo in specialVowelCombinations) {
      if (text.substring(i, i + combo.length) === combo) {
        result += specialVowelCombinations[combo];
        i += combo.length;
        foundSpecial = true;
        break;
      }
    }
    
    if (foundSpecial) continue;
    
    // 检查其他特殊组合
    for (const combo in specialCombinations) {
      if (text.substring(i, i + combo.length) === combo) {
        result += specialCombinations[combo];
        i += combo.length;
        foundSpecial = true;
        break;
      }
    }
    
    if (foundSpecial) continue;
    
    // 处理常规音节
    const char = text[i];
    
    // 处理前置元音
    if (leadingVowels.has(char) && i + 1 < text.length) {
      const nextChar = text[i + 1];
      
      // 检查是否是 เ + อ 组合
      if (nextChar === 'อ' && i + 2 < text.length) {
        // 检查是否是更长的特殊元音组合
        let longerCombo = false;
        for (const combo in specialVowelCombinations) {
          if (combo.startsWith(char + nextChar) && text.substring(i, i + combo.length) === combo) {
            result += specialVowelCombinations[combo];
            i += combo.length;
            longerCombo = true;
            break;
          }
        }
        
        if (longerCombo) continue;
        
        // 处理 เ + อ + 辅音 的情况
        if (i + 2 < text.length && thaiToLatinMap[text[i + 2]]) {
          result += thaiToLatinMap[text[i + 2]] + 'oe';
          i += 3;
          continue;
        }
      }
      
      if (thaiToLatinMap[nextChar]) {
        // 前置元音 + 辅音
        const consonant = thaiToLatinMap[nextChar];
        const vowel = vowelMap[char] || '';
        
        result += consonant + vowel;
        i += 2;
        
        // 检查是否有 ็ 符号
        if (i < text.length && text[i] === '็') {
          // 跳过 ็ 符号，不添加任何字符
          i++;
        }
        // 检查后续元音标记
        else if (i < text.length && vowelMap[text[i]] && !toneMarks.has(text[i])) {
          result += vowelMap[text[i]];
          i++;
        }
        
        // 跳过音调符号
        while (i < text.length && toneMarks.has(text[i])) {
          i++;
        }
        
        // 处理 ์ 符号
        if (i < text.length && text[i] === '์') {
          i++;  // 直接跳过，不输出任何字符
        }
        
        continue;
      }
    }
    
    // 处理辅音
    if (thaiToLatinMap[char]) {
      result += thaiToLatinMap[char];
      i++;
      
      // 检查后续元音
      let hasVowel = false;
      
      // 处理 ็ 符号
      if (i < text.length && text[i] === '็') {
        // 跳过 ็ 符号，不添加任何字符
        i++;
        hasVowel = true;
      }
      
      // 检查是否后面跟着 อ 作为元音
      if (i < text.length && text[i] === 'อ') {
        result += 'o';
        hasVowel = true;
        i++;
      }
      // 处理其他后续元音标记
      else if (i < text.length && vowelMap[text[i]] && !toneMarks.has(text[i])) {
        result += vowelMap[text[i]];
        hasVowel = true;
        i++;
      }
      
      // 跳过音调符号
      while (i < text.length && toneMarks.has(text[i])) {
        i++;
      }
      
      // 处理 ์ 符号
      if (i < text.length && text[i] === '์') {
        i++;  // 直接跳过，不输出任何字符
      }
      
      // 处理隐含元音 (如果没有显式元音且不是词尾)
      if (!hasVowel && result.length > 0 && i < text.length && thaiToLatinMap[text[i]]) {
        // 辅音后面跟着另一个辅音，添加隐含元音 "o"
        result += 'o';
      }
      
      continue;
    }
    
    // 处理其他字符
    if (vowelMap[char]) {
      result += vowelMap[char];
    } else if (!toneMarks.has(char) && !thaiToLatinMap[char]) {
      // 保留非音调符号和其他未映射字符
      result += char;
    }
    
    i++;
  }
  
  // 处理词尾辅音组合的特殊规则
  result = result
    // 词尾辅音 "b" 在RTGS中通常转写为 "p"
    .replace(/b$/g, 'p')
    // 词尾辅音 "d" 在RTGS中通常转写为 "t"
    .replace(/d$/g, 't');
  
  // 处理连续辅音之间的隐含元音
  result = result.replace(/([kcdtpbmnfslwy])([kcdtpbmnfslwy])/g, (match, c1, c2) => {
    // 某些辅音组合保持不变
    const keepCombinations = ['kh', 'ph', 'th', 'ch', 'ng'];
    if (keepCombinations.includes(c1 + c2)) {
      return c1 + c2;
    }
    // 其他情况添加隐含元音 "o"
    return c1 + 'o' + c2;
  });
  
  // 确保结果不为空
  return result.trim() || ' ';
}
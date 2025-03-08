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
    
    // 元音
    'ะ': 'a', 'า': 'a', 'ิ': 'i', 'ี': 'i', 'ึ': 'ue', 'ื': 'ue',
    'ุ': 'u', 'ู': 'u', 'เ': 'e', 'แ': 'ae', 'โ': 'o', 'ใ': 'ai',
    'ไ': 'ai', 'ำ': 'am', 'ฤ': 'rue', 'ฤๅ': 'rue', 'ฦ': 'lue',
    'ฦๅ': 'lue', 'ํ': 'am',
    
    // 数字
    '๐': '0', '๑': '1', '๒': '2', '๓': '3', '๔': '4',
    '๕': '5', '๖': '6', '๗': '7', '๘': '8', '๙': '9',
    
    // 特殊符号
    'ๆ': '', 'ฯ': '', '์': ''
  };

  // 特殊元音符号映射
  const specialVowelMap: Record<string, string> = {
    'ั': 'a',  // mai han-akat
    '็': '',   // mai taikhu (缩短元音)
  };

  // 音调符号
  const toneMarks = new Set(['่', '้', '๊', '๋']);
  
  // 前置元音
  const leadingVowels = new Set(['เ', 'แ', 'โ', 'ใ', 'ไ']);
  
  // 将泰文文本转换为音节数组
  const syllables: string[] = [];
  let currentSyllable = '';
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    
    // 如果是前置元音，开始新的音节
    if (leadingVowels.has(char)) {
      if (currentSyllable) {
        syllables.push(currentSyllable);
      }
      currentSyllable = char;
    } else {
      currentSyllable += char;
    }
  }
  
  // 添加最后一个音节
  if (currentSyllable) {
    syllables.push(currentSyllable);
  }
  
  // 转换每个音节
  let result = '';
  
  for (const syllable of syllables) {
    let syllableResult = '';
    let leadingVowel = '';
    
    // 检查是否有前置元音
    if (syllable.length > 0 && leadingVowels.has(syllable[0])) {
      leadingVowel = thaiToLatinMap[syllable[0]] || '';
    }
    
    // 处理音节中的每个字符
    for (let i = 0; i < syllable.length; i++) {
      const char = syllable[i];
      
      // 跳过前置元音（已经处理过）
      if (i === 0 && leadingVowels.has(char)) {
        continue;
      }
      
      // 处理特殊元音符号
      if (specialVowelMap[char] !== undefined) {
        syllableResult += specialVowelMap[char];
        continue;
      }
      
      // 跳过音调符号
      if (toneMarks.has(char)) {
        continue;
      }
      
      // 转换字符
      if (thaiToLatinMap[char] !== undefined) {
        syllableResult += thaiToLatinMap[char];
      } else {
        syllableResult += char;
      }
    }
    
    // 将前置元音插入到正确位置
    if (leadingVowel && syllableResult.length > 0) {
      // 在第一个辅音后插入前置元音
      const firstConsonant = syllableResult[0];
      syllableResult = firstConsonant + leadingVowel + syllableResult.substring(1);
    } else if (leadingVowel) {
      syllableResult = leadingVowel;
    }
    
    result += syllableResult;
  }
  
  // 处理重复元音
  result = result.replace(/([aeiou])\1+/g, '$1');
  
  // 处理词尾的 'r'，在RTGS中通常不发音或发 'n' 音
  result = result.replace(/r$/g, 'n');
  
  // 确保结果不为空
  return result.trim() || ' ';
}
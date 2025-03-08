export default function ThaThai(text: string): string {
  // 泰文字母到拉丁字母的映射表（基于RTGS标准）
  const thaiToLatinMap: Record<string, string> = {
    'ก': 'k', 'ข': 'kh', 'ฃ': 'kh', 'ค': 'kh', 'ฅ': 'kh', 'ฆ': 'kh',
    'ง': 'ng',
    'จ': 'ch', 'ฉ': 'ch', 'ช': 'ch', 'ซ': 's', 'ฌ': 'ch',
    'ญ': 'y', 'ฎ': 'd', 'ฏ': 't', 'ฐ': 'th', 'ฑ': 'th', 'ฒ': 'th',
    'ณ': 'n', 'ด': 'd', 'ต': 't', 'ถ': 'th', 'ท': 'th', 'ธ': 'th',
    'น': 'n', 'บ': 'b', 'ป': 'p', 'ผ': 'ph', 'ฝ': 'f', 'พ': 'ph',
    'ฟ': 'f', 'ภ': 'ph', 'ม': 'm', 'ย': 'y', 'ร': 'r', 'ล': 'l',
    'ว': 'w', 'ศ': 's', 'ษ': 's', 'ส': 's', 'ห': 'h', 'ฬ': 'l',
    'อ': '', 'ฮ': 'h',
    'ะ': 'a', 'า': 'a', 'ิ': 'i', 'ี': 'i', 'ึ': 'ue', 'ื': 'ue',
    'ุ': 'u', 'ู': 'u', 'เ': 'e', 'แ': 'ae', 'โ': 'o', 'ใ': 'ai',
    'ไ': 'ai', 'ำ': 'am', 'ฤ': 'rue', 'ฤๅ': 'rue', 'ฦ': 'lue',
    'ฦๅ': 'lue', 'ํ': 'am', 'ๆ': '', 'ฯ': '',
    '๐': '0', '๑': '1', '๒': '2', '๓': '3', '๔': '4',
    '๕': '5', '๖': '6', '๗': '7', '๘': '8', '๙': '9'
  };

  // 特殊字符处理
  const specialChars = new Set(['ั', '่', '้', '๊', '๋', '์', 'ํ', 'ๆ', 'ฯ']);

  let result = '';
  
  // 逐个字符转换
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    
    // 处理特殊字符
    if (specialChars.has(char)) {
      // 处理 mai han-akat
      if (char === 'ั') {
        if (i > 0 && text[i-1] === 'เ') { // 处理 เ + ั = แ
          result = result.slice(0, -1) + 'ae';
          continue;
        }
      }
      // 其他特殊字符直接跳过
      continue;
    }
    
    // 如果字符在映射表中，则转换，否则保留原字符
    const mappedChar = thaiToLatinMap[char];
    result += mappedChar !== undefined ? mappedChar : char;
  }

  // 处理重复元音
  result = result.replace(/([aeiou])\1+/g, '$1');

  // 确保结果不为空
  return result.trim() || ' ';
} 
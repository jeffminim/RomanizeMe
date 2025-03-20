export default function EllGreek(text: string): string {
  // 希腊字母到拉丁字母的映射表（基于ISO 843标准）
  const greekToLatinMap: Record<string, string> = {
    // 大写字母
    'Α': 'A', 'Β': 'V', 'Γ': 'G', 'Δ': 'D', 'Ε': 'E',
    'Ζ': 'Z', 'Η': 'I', 'Θ': 'Th', 'Ι': 'I', 'Κ': 'K',
    'Λ': 'L', 'Μ': 'M', 'Ν': 'N', 'Ξ': 'X', 'Ο': 'O',
    'Π': 'P', 'Ρ': 'R', 'Σ': 'S', 'Τ': 'T', 'Υ': 'Y',
    'Φ': 'F', 'Χ': 'Ch', 'Ψ': 'Ps', 'Ω': 'O',
    
    // 小写字母
    'α': 'a', 'β': 'v', 'γ': 'g', 'δ': 'd', 'ε': 'e',
    'ζ': 'z', 'η': 'i', 'θ': 'th', 'ι': 'i', 'κ': 'k',
    'λ': 'l', 'μ': 'm', 'ν': 'n', 'ξ': 'x', 'ο': 'o',
    'π': 'p', 'ρ': 'r', 'σ': 's', 'τ': 't', 'υ': 'y',
    'φ': 'f', 'χ': 'ch', 'ψ': 'ps', 'ω': 'o',
    
    // 特殊字符
    'ς': 's', // 词尾sigma
    'Ά': 'A', 'ά': 'a', // 带重音的alpha
    'Έ': 'E', 'έ': 'e', // 带重音的epsilon
    'Ή': 'I', 'ή': 'i', // 带重音的eta
    'Ί': 'I', 'ί': 'i', // 带重音的iota
    'Ό': 'O', 'ό': 'o', // 带重音的omicron
    'Ύ': 'Y', 'ύ': 'y', // 带重音的upsilon
    'Ώ': 'O', 'ώ': 'o'  // 带重音的omega
  };

  // 特殊组合处理
  const specialCombinations: Record<string, string> = {
    'αι': 'ai', 'αυ': 'av', 'ευ': 'ev', 'ηυ': 'iv',
    'γγ': 'ng', 'γκ': 'gk', 'γξ': 'nx', 'γχ': 'nch',
    'μπ': 'b', 'ντ': 'd', 'ου': 'ou', 'οι': 'oi',
    'ει': 'ei', 'υι': 'yi', 'τσ': 'ts', 'τζ': 'tz'
  };

  let result = '';
  let i = 0;

  while (i < text.length) {
    // 检查双字母组合
    if (i + 1 < text.length) {
      const twoChars = text[i] + text[i + 1];
      if (specialCombinations[twoChars]) {
        result += specialCombinations[twoChars];
        i += 2;
        continue;
      }
    }

    // 处理单个字符
    const char = text[i];
    if (greekToLatinMap[char]) {
      result += greekToLatinMap[char];
    } else {
      // 如果不在映射表中，保留原字符
      result += char;
    }
    i++;
  }

  // 后处理规则
  result = result
    // 处理词尾的 's' 音
    .replace(/([bcdfgklmnpqrstvxyz])s$/g, '$1')
    // 处理 'ch' 后的 'h' 音
    .replace(/chh/g, 'ch')
    // 处理重复的元音
    .replace(/([aeiou])\1+/g, '$1');

  return result;
} 
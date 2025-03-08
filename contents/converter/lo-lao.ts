export default function LaoLao(text: string): string {
  if (!text) return '';

  // 老挝语辅音映射表
  const consonantMap: Record<string, string> = {
    'ກ': 'k', 'ຂ': 'kh', 'ຄ': 'kh', 'ງ': 'ng',
    'ຈ': 'ch', 'ສ': 's', 'ຊ': 's', 'ຍ': 'ny',
    'ດ': 'd', 'ຕ': 't', 'ຖ': 'th', 'ທ': 'th',
    'ນ': 'n', 'ບ': 'b', 'ປ': 'p', 'ຜ': 'ph',
    'ຝ': 'f', 'ພ': 'ph', 'ຟ': 'f', 'ມ': 'm',
    'ຢ': 'y', 'ຣ': 'r', 'ລ': 'l', 'ວ': 'v',
    'ຫ': 'h', 'ອ': '', 'ຮ': 'h',
    // 辅音集合
    'ຫງ': 'ng', 'ຫຍ': 'ny', 'ຫນ': 'n', 'ຫມ': 'm',
    'ຫຼ': 'l', 'ຫຣ': 'r'
  };

  // 元音映射表
  const vowelMap: Record<string, string> = {
    'ະ': 'a', 'ັ': 'a', 'າ': 'a', 'ຳ': 'am',
    'ິ': 'i', 'ີ': 'i', 'ຶ': 'u', 'ື': 'u',
    'ຸ': 'u', 'ູ': 'u', 'ເ': 'e', 'ແ': 'è',
    'ໂ': 'o', 'ໃ': 'ai', 'ໄ': 'ai', 'ົ': 'o',
    'ຽ': 'ia'
  };

  // 声调符号映射表（老挝语有6个声调，但在罗马化中通常不标记）
  const toneMap: Record<string, string> = {
    '່': '', '້': '', '໊': '', '໋': ''
  };

  // 数字映射表
  const numberMap: Record<string, string> = {
    '໐': '0', '໑': '1', '໒': '2', '໓': '3', '໔': '4',
    '໕': '5', '໖': '6', '໗': '7', '໘': '8', '໙': '9'
  };

  // 特殊组合元音
  const combinedVowelMap: Record<string, string> = {
    'ເະ': 'e', 'ແະ': 'è', 'ໂະ': 'o',
    'ເັ': 'e', 'ແັ': 'è', 'ໂັ': 'o',
    'ເົາ': 'ao', 'ົວະ': 'ua', 'ົວ': 'ua',
    'ິວ': 'iu', 'ເຍ': 'ia', 'ແອ': 'è',
    'ເຶອ': 'ua', 'ເືອ': 'ua', 'ໄອ': 'ai',
    'ເົ້າ': 'ao', 'ເິ': 'i', 'ໂອ': 'o'
  };

  // 特殊词汇映射
  const specialWords: Record<string, string> = {
    'ລາວ': 'lao',
    'ວຽງຈັນ': 'vientiane',
    'ນະຄອນຫຼວງວຽງຈັນ': 'vientiane'
  };

  // 检查是否是特殊词汇
  if (specialWords[text]) {
    return specialWords[text];
  }

  let result = '';
  let i = 0;

  // 分割文本为音节
  const syllables: string[] = [];
  let currentSyllable = '';

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    
    // 如果是辅音，开始新的音节
    if (consonantMap[char] !== undefined || char === 'ອ') {
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

  // 处理每个音节
  for (const syllable of syllables) {
    // 处理数字
    if (/^[໐-໙]+$/.test(syllable)) {
      if (result && !/\s$/.test(result)) {
        result += ' ';
      }
      
      for (const char of syllable) {
        result += numberMap[char] || char;
      }
      
      if (i < text.length && !/\s/.test(text[i])) {
        result += ' ';
      }
      continue;
    }

    let syllableResult = '';
    let hasVowel = false;

    // 处理辅音
    if (syllable.length > 0) {
      // 检查特殊辅音组合
      let foundSpecialConsonant = false;
      for (const [combo, romanized] of Object.entries(consonantMap)) {
        if (combo.length > 1 && syllable.startsWith(combo)) {
          syllableResult += romanized;
          foundSpecialConsonant = true;
          break;
        }
      }

      if (!foundSpecialConsonant) {
        const firstChar = syllable[0];
        syllableResult += consonantMap[firstChar] || firstChar;
      }
    }

    // 处理元音和声调
    let foundCombinedVowel = false;
    for (const [combo, romanized] of Object.entries(combinedVowelMap)) {
      if (syllable.includes(combo)) {
        syllableResult += romanized;
        hasVowel = true;
        foundCombinedVowel = true;
        break;
      }
    }

    if (!foundCombinedVowel) {
      for (let j = 1; j < syllable.length; j++) {
        const char = syllable[j];
        
        if (vowelMap[char]) {
          syllableResult += vowelMap[char];
          hasVowel = true;
        } else if (toneMap[char] !== undefined) {
          // 声调标记通常不在罗马化中表示
          continue;
        } else if (consonantMap[char]) {
          // 如果是辅音，可能是音节尾
          syllableResult += consonantMap[char];
        } else {
          // 未知字符，保留原样
          syllableResult += char;
        }
      }
    }

    // 如果没有元音，添加默认元音'a'
    if (!hasVowel && syllableResult.length > 0) {
      syllableResult += 'a';
    }

    result += syllableResult;
  }

  // 后处理
  result = result
    // 处理重复的元音
    .replace(/([aeiou])\1+/g, '$1')
    // 标准化空格
    .replace(/\s+/g, ' ')
    .trim();

  return result || text;
}
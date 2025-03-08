export default function MyaMyanmar(text: string): string {
  // 基本辅音映射
  const consonantMap: Record<string, string> = {
    'က': 'k', 'ခ': 'kh', 'ဂ': 'g', 'ဃ': 'gh', 'င': 'ng',
    'စ': 's', 'ဆ': 'hs', 'ဇ': 'z', 'ဈ': 'zh', 'ည': 'ny',
    'ဋ': 't', 'ဌ': 'ht', 'ဍ': 'd', 'ဎ': 'dh', 'ဏ': 'n',
    'တ': 't', 'ထ': 'ht', 'ဒ': 'd', 'ဓ': 'dh', 'န': 'n',
    'ပ': 'p', 'ဖ': 'ph', 'ဗ': 'b', 'ဘ': 'bh', 'မ': 'm',
    'ယ': 'y', 'ရ': 'r', 'လ': 'l', 'ဝ': 'w', 'သ': 'th',
    'ဟ': 'h', 'ဠ': 'l', 'အ': 'a'
  };

  // 元音和修饰符映射
  const vowelMap: Record<string, string> = {
    'ါ': 'a', 'ာ': 'a', 'ိ': 'i', 'ီ': 'i', 'ု': 'u', 'ူ': 'u',
    'ေ': 'e', 'ဲ': 'ai', 'ံ': 'an', 'း': ''
  };

  // 组合元音映射
  const combinedVowelMap: Record<string, string> = {
    'ော': 'aw', 'ို': 'o', 'ော်': 'aw', 'ေါ': 'aw', 'ေါ်': 'aw',
    'ို့': 'o', 'ိုး': 'o', 'ိုက်': 'aik', 'ောက်': 'auk', 'ိုင်': 'aing',
    'ောင်': 'aung', 'ိုင်း': 'aing', 'ောင်း': 'aung'
  };

  // 修饰符映射 - 确保所有修饰符都有映射
  const modifierMap: Record<string, string> = {
    'ျ': 'y', 'ြ': 'r', 'ွ': 'w', 'ှ': 'h', 
    '်': '', '့': '', '္': '', 'ဲ့': 'ai', 'ံ့': 'an',
    'း': '' // 确保这个修饰符被正确处理
  };

  // 数字映射
  const numberMap: Record<string, string> = {
    '၀': '0', '၁': '1', '၂': '2', '၃': '3', '၄': '4',
    '၅': '5', '၆': '6', '၇': '7', '၈': '8', '၉': '9'
  };

  // 特殊词汇映射
  const specialWords: Record<string, string> = {
    // 'အမည်': 'amei', // 特殊词汇直接映射
    // 'ခင်ပွန်း': 'khinpwun',
    // 'ကျေးဇူး': 'kyeizu'
  };

  // 特殊终止组合映射
  const specialEndingMap: Record<string, string> = {
    'က်': 'ak', 'င်': 'in', 'စ်': 'it', 'ည်': 'i', 'ဉ်': 'in',
    'တ်': 'at', 'န်': 'an', 'ပ်': 'ap', 'မ်': 'am', 'ယ်': 'e',
    'ဝ်': 'ut', 'သ်': 'at', 'ဏ်': 'an', 
    'င်း': 'in', 'န်း': 'an', 'မ်း': 'am', 'ပ်း': 'ap', 'တ်း': 'at',
    'ိုင်': 'aing', 'ောင်': 'aung', 'ိုင်း': 'aing', 'ောင်း': 'aung',
    'ွက်': 'wak', 'ွင်': 'win', 'ွတ်': 'wat', 'ွန်': 'wan', 'ွပ်': 'wap',
    'ွမ်': 'wam', 'ျက်': 'yak', 'ျင်': 'yin', 'ျတ်': 'yat', 'ျန်': 'yan',
    'ျပ်': 'yap', 'ျမ်': 'yam', 'ြက်': 'rak', 'ြင်': 'rin', 'ြတ်': 'rat',
    'ြန်': 'ran', 'ြပ်': 'rap', 'ြမ်': 'ram', 'ြဲ': 'rai',
    'န့်': 'an', 'င့်': 'in', 'မ့်': 'am', 'ပ့်': 'ap', 'တ့်': 'at',
    'ခန့်': 'khan', 'ရင်း': 'yin',
    'မည်': 'mei', 'အမည်': 'amei' // 添加特殊词汇的终止组合
  };

  // 清理文本，移除所有不可见字符和未知字符
  const cleanText = (text: string): string => {
    // 移除不可见字符
    let cleaned = text.replace(/[\u200B-\u200F\u2028-\u202F\u2060-\u206F]/g, '');
    
    // 替换所有未知的缅甸字符为空字符串
    const knownChars = new Set([
      ...Object.keys(consonantMap),
      ...Object.keys(vowelMap),
      ...Object.keys(modifierMap),
      ...Object.keys(numberMap),
      ' ', '\t', '\n', '\r'
    ]);
    
    return cleaned.split('').map(char => knownChars.has(char) ? char : '').join('');
  };

  // 处理单个音节
  const processSyllable = (syllable: string): string => {
    if (!syllable || syllable.trim() === '') return '';
    
    // 清理文本
    syllable = cleanText(syllable);
    
    // 检查是否是数字
    if (/^[၀-၉]+$/.test(syllable)) {
      return syllable.split('').map(char => numberMap[char] || char).join('');
    }
    
    // 检查特殊词汇
    if (specialWords[syllable]) {
      return specialWords[syllable];
    }
    
    // 检查特殊终止组合
    for (const [ending, romanized] of Object.entries(specialEndingMap)) {
      if (syllable.endsWith(ending)) {
        const base = syllable.slice(0, syllable.length - ending.length);
        
        // 如果基础部分为空，直接返回罗马化结果
        if (!base) return romanized;
        
        // 处理基础部分
        const baseRomanized = processSyllable(base);
        
        // 如果基础部分已经有元音，则直接添加特殊组合
        if (/[aeiou]/.test(baseRomanized)) {
          return baseRomanized.replace(/a$/, '') + romanized;
        }
        
        // 否则，直接添加特殊组合
        return baseRomanized.replace(/a$/, '') + romanized;
      }
    }
    
    // 处理基本辅音和修饰符
    let result = '';
    let hasVowel = false;
    
    // 处理第一个字符（通常是辅音）
    if (consonantMap[syllable[0]]) {
      result += consonantMap[syllable[0]];
    } else {
      result += syllable[0];
    }
    
    // 处理剩余字符
    for (let i = 1; i < syllable.length; i++) {
      // 检查组合元音
      let foundCombined = false;
      for (const [combo, romanized] of Object.entries(combinedVowelMap)) {
        if (i + combo.length <= syllable.length && 
            syllable.substring(i, i + combo.length) === combo) {
          result += romanized;
          i += combo.length - 1;
          hasVowel = true;
          foundCombined = true;
          break;
        }
      }
      if (foundCombined) continue;
      
      const char = syllable[i];
      
      // 处理单个元音
      if (vowelMap[char]) {
        result += vowelMap[char];
        hasVowel = true;
      } 
      // 处理修饰符
      else if (modifierMap[char] !== undefined) {
        result += modifierMap[char];
      }
      // 处理其他字符
      else if (consonantMap[char]) {
        // 如果是新的辅音，可能是新的音节
        result += consonantMap[char];
      } else {
        // 未知字符，忽略
      }
    }
    
    // 如果没有元音，添加默认元音'a'
    if (!hasVowel && result.length > 0 && !/[aeiou]/.test(result)) {
      result += 'a';
    }
    
    return result;
  };

  // 检查是否是特殊词汇
  if (specialWords[text]) {
    return specialWords[text];
  }

  // 分割文本为单词
  const words = text.split(/\s+/);
  const processedWords = words.map(word => {
    // 处理数字
    if (/^[၀-၉]+$/.test(word)) {
      return word.split('').map(char => numberMap[char] || char).join('');
    }
    
    // 检查特殊词汇
    if (specialWords[word]) {
      return specialWords[word];
    }
    
    // 处理整个单词
    return processSyllable(word);
  });
  
  return processedWords.join(' ');
}
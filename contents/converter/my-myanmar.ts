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
    'ောင်': 'aung', 'ိုင်း': 'aing:', 'ောင်း': 'aung:'
  };

  // 修饰符映射
  const modifierMap: Record<string, string> = {
    'ျ': 'y', 'ြ': 'r', 'ွ': 'w', 'ှ': 'h', '်': '', '့': ''
  };

  // 数字映射
  const numberMap: Record<string, string> = {
    '၀': '0', '၁': '1', '၂': '2', '၃': '3', '၄': '4',
    '၅': '5', '၆': '6', '၇': '7', '၈': '8', '၉': '9'
  };

  // 特殊组合映射
  const specialCombinations: Record<string, string> = {
    'က်': 'ak', 'င်': 'in', 'စ်': 'it', 'ည်': 'i', 'ဉ်': 'in',
    'တ်': 'at', 'န်': 'an', 'ပ်': 'ap', 'မ်': 'am', 'ယ်': 'e',
    'ဝ်': 'ut', 'သ်': 'at', 'ဏ်': 'an', 'ိုင်': 'aing', 'ောင်': 'aung',
    'ွက်': 'wak', 'ွင်': 'win', 'ွတ်': 'wat', 'ွန်': 'wan', 'ွပ်': 'wap',
    'ွမ်': 'wam', 'ျက်': 'yak', 'ျင်': 'yin', 'ျတ်': 'yat', 'ျန်': 'yan',
    'ျပ်': 'yap', 'ျမ်': 'yam', 'ြက်': 'rak', 'ြင်': 'rin', 'ြတ်': 'rat',
    'ြန်': 'ran', 'ြပ်': 'rap', 'ြမ်': 'ram', 'ြဲ': 'rai'
  };

  // 处理单个音节
  const processSyllable = (syllable: string): string => {
    if (!syllable || syllable.trim() === '') return '';
    
    // 检查是否是数字
    if (/^[၀-၉]+$/.test(syllable)) {
      return syllable.split('').map(char => numberMap[char] || char).join('');
    }
    
    // 检查特殊组合
    for (const [combo, romanized] of Object.entries(specialCombinations)) {
      if (syllable.endsWith(combo)) {
        const base = syllable.slice(0, syllable.length - combo.length);
        const baseRomanized = processSyllable(base);
        // 如果基础部分已经有元音，则直接添加特殊组合
        if (/[aeiou]/.test(baseRomanized)) {
          return baseRomanized + romanized;
        }
        // 否则，去掉默认的'a'再添加特殊组合
        return baseRomanized.replace(/a$/, '') + romanized;
      }
    }
    
    let result = '';
    let hasVowel = false;
    
    // 处理基本辅音
    if (consonantMap[syllable[0]]) {
      result += consonantMap[syllable[0]];
    } else {
      result += syllable[0];
    }
    
    // 处理修饰符和元音
    for (let i = 1; i < syllable.length; i++) {
      const char = syllable[i];
      
      // 检查组合元音
      let foundCombined = false;
      for (const [combo, romanized] of Object.entries(combinedVowelMap)) {
        if (syllable.substring(i).startsWith(combo)) {
          result += romanized;
          i += combo.length - 1;
          hasVowel = true;
          foundCombined = true;
          break;
        }
      }
      if (foundCombined) continue;
      
      // 处理单个元音
      if (vowelMap[char]) {
        result += vowelMap[char];
        hasVowel = true;
      } 
      // 处理修饰符
      else if (modifierMap[char]) {
        result += modifierMap[char];
      }
      // 处理其他字符
      else if (consonantMap[char]) {
        result += consonantMap[char];
      } else {
        result += char;
      }
    }
    
    // 如果没有元音，添加默认元音'a'
    if (!hasVowel && result.length > 0 && !/[aeiou]/.test(result)) {
      result += 'a';
    }
    
    return result;
  };

  // 分割文本为音节并处理
  const words = text.split(/\s+/);
  const processedWords = words.map(word => {
    // 处理数字
    if (/^[၀-၉]+$/.test(word)) {
      return word.split('').map(char => numberMap[char] || char).join('');
    }
    
    // 分割为音节
    const syllables = [];
    let currentSyllable = '';
    
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      
      // 如果是辅音且当前音节不为空，则开始新音节
      if (consonantMap[char] && currentSyllable && 
          (consonantMap[currentSyllable[0]] || currentSyllable[0] === 'အ')) {
        syllables.push(currentSyllable);
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
    return syllables.map(processSyllable).join('');
  });
  
  return processedWords.join(' ');
}
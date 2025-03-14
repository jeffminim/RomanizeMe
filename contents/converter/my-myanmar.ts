export default function MyaMyanmar(text: string): string {
  // 基本辅音映射
  const consonantMap: Record<string, string> = {
    'က': 'k', 'ခ': 'kh', 'ဂ': 'g', 'ဃ': 'gh', 'င': 'ng',
    'စ': 'c', 'ဆ': 'hc', 'ဇ': 'j', 'ဈ': 'jh', 'ည': 'ny',
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

  // 修饰符映射
  const modifierMap: Record<string, string> = {
    'ျ': 'y', 'ြ': 'y', 'ွ': 'w', 'ှ': 'h', 
    '်': '', '့': '', '္': '', 'ဲ့': 'ai', 'ံ့': 'an',
    'း': ''
  };

  // 数字映射
  const numberMap: Record<string, string> = {
    '၀': '0', '၁': '1', '၂': '2', '၃': '3', '၄': '4',
    '၅': '5', '၆': '6', '၇': '7', '၈': '8', '၉': '9'
  };

  // 特殊词汇映射
  const specialWords: Record<string, string> = {
    'မြန်မာ': 'myanmar',
    'ချက်မ': 'kyak ma',
    'အမည်': 'amyi',
    'ခင်ပွန်း': 'khingpun:',
    'ကျေးဇူး': 'kyeizu:'
  };

  // 特殊终止组合映射
  const specialEndingMap: Record<string, string> = {
    'က်': 'ak', 'င်': 'in', 'စ်': 'it', 'ည်': 'i', 'ဉ်': 'in',
    'တ်': 'at', 'န်': 'an', 'ပ်': 'ap', 'မ်': 'am', 'ယ်': 'e',
    'ဝ်': 'ut', 'သ်': 'at', 'ဏ်': 'an', 
    'င်း': 'in:', 'န်း': 'an:', 'မ်း': 'am:', 'ပ်း': 'ap:', 'တ်း': 'at:',
    'ိုင်': 'aing', 'ောင်': 'aung', 'ိုင်း': 'aing:', 'ောင်း': 'aung:',
    'ွက်': 'wak', 'ွင်': 'win', 'ွတ်': 'wat', 'ွန်': 'wan', 'ွပ်': 'wap',
    'ွမ်': 'wam', 'ျက်': 'yak', 'ျင်': 'yin', 'ျတ်': 'yat', 'ျန်': 'yan',
    'ျပ်': 'yap', 'ျမ်': 'yam', 'ြက်': 'yak', 'ြင်': 'yin', 'ြတ်': 'yat',
    'ြန်': 'yan', 'ြပ်': 'yap', 'ြမ်': 'yam', 'ြဲ': 'yai',
    'န့်': 'an', 'င့်': 'in', 'မ့်': 'am', 'ပ့်': 'ap', 'တ့်': 'at',
    'ခန့်': 'khan', 'ရင်း': 'yin:',
    'မည်': 'myi', 'အမည်': 'amyi'
  };

  // 特殊辅音组合映射
  const specialConsonantCombos: Record<string, string> = {
    'ကျ': 'ky', 'ချ': 'ky', 'ဂျ': 'gy', 'စျ': 'cy', 
    'ညျ': 'ny', 'တျ': 'ty', 'ဒျ': 'dy', 'နျ': 'ny',
    'ပျ': 'py', 'ဖျ': 'phy', 'ဗျ': 'by', 'မျ': 'my',
    'ရျ': 'ry', 'လျ': 'ly', 'သျ': 'thy', 'ဟျ': 'hy',
    
    'ကြ': 'ky', 'ခြ': 'khy', 'ဂြ': 'gy', 'စြ': 'cy',
    'ညြ': 'ny', 'တြ': 'ty', 'ဒြ': 'dy', 'နြ': 'ny',
    'ပြ': 'py', 'ဖြ': 'phy', 'ဗြ': 'by', 'မြ': 'my',
    'ရြ': 'ry', 'လြ': 'ly', 'သြ': 'thy', 'ဟြ': 'hy',
    
    'ကွ': 'kw', 'ခွ': 'khw', 'ဂွ': 'gw', 'စွ': 'cw',
    'ညွ': 'nyw', 'တွ': 'tw', 'ဒွ': 'dw', 'နွ': 'nw',
    'ပွ': 'pw', 'ဖွ': 'phw', 'ဗွ': 'bw', 'မွ': 'mw',
    'ရွ': 'rw', 'လွ': 'lw', 'သွ': 'thw', 'ဟွ': 'hw',
    
    'ကျွ': 'kyw', 'ချွ': 'kyw', 'ဂျွ': 'gyw', 'စျွ': 'cyw',
    'ညျွ': 'nyw', 'တျွ': 'tyw', 'ဒျွ': 'dyw', 'နျွ': 'nyw',
    'ပျွ': 'pyw', 'ဖျွ': 'phyw', 'ဗျွ': 'byw', 'မျွ': 'myw',
    'ရျွ': 'ryw', 'လျွ': 'lyw', 'သျွ': 'thyw', 'ဟျွ': 'hyw',
    
    'ကြွ': 'kyw', 'ခြွ': 'khyw', 'ဂြွ': 'gyw', 'စြွ': 'cyw',
    'ညြွ': 'nyw', 'တြွ': 'tyw', 'ဒြွ': 'dyw', 'နြွ': 'nyw',
    'ပြွ': 'pyw', 'ဖြွ': 'phyw', 'ဗြွ': 'byw', 'မြွ': 'myw',
    'ရြွ': 'ryw', 'လြွ': 'lyw', 'သြွ': 'thyw', 'ဟြွ': 'hyw'
  };

  // 清理文本，移除所有不可见字符
  const cleanText = (text: string): string => {
    return text.replace(/[\u200B-\u200F\u2028-\u202F\u2060-\u206F]/g, '');
  };

  // 分割文本为音节
  const splitIntoSyllables = (text: string): string[] => {
    const syllables: string[] = [];
    let currentSyllable = '';
    
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      
      // 如果是辅音且当前音节不为空，则开始新的音节
      if (consonantMap[char] && currentSyllable && 
          !(modifierMap[char] || vowelMap[char])) {
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
    
    return syllables;
  };

  // 处理单个音节
  const processSyllable = (syllable: string): string => {
    if (!syllable || syllable.trim() === '') return '';
    
    // 检查是否是数字
    if (/^[၀-၉]+$/.test(syllable)) {
      return syllable.split('').map(char => numberMap[char] || char).join('');
    }
    
    // 检查特殊辅音组合
    for (const [combo, romanized] of Object.entries(specialConsonantCombos)) {
      if (syllable.startsWith(combo)) {
        const rest = syllable.slice(combo.length);
        return romanized + processSyllableRest(rest);
      }
    }
    
    // 检查特殊终止组合
    for (const [ending, romanized] of Object.entries(specialEndingMap)) {
      if (syllable.endsWith(ending)) {
        const base = syllable.slice(0, syllable.length - ending.length);
        
        // 如果基础部分为空，直接返回罗马化结果
        if (!base) return romanized;
        
        // 处理基础部分
        const baseChar = base[0];
        if (consonantMap[baseChar]) {
          return consonantMap[baseChar] + romanized;
        }
        
        return processSyllable(base) + romanized;
      }
    }
    
    // 处理基本辅音
    if (syllable.length > 0 && consonantMap[syllable[0]]) {
      const consonant = consonantMap[syllable[0]];
      const rest = syllable.slice(1);
      
      // 处理剩余部分
      const restResult = processSyllableRest(rest);
      
      // 如果没有元音，添加默认元音'a'
      if (restResult === '' || !/[aeiou]/.test(restResult)) {
        return consonant + 'a';
      }
      
      return consonant + restResult;
    }
    
    // 如果不是以辅音开始，直接返回原字符
    return syllable;
  };
  
  // 处理音节的剩余部分（辅音后的部分）
  const processSyllableRest = (rest: string): string => {
    if (!rest) return '';
    
    let result = '';
    let i = 0;
    
    while (i < rest.length) {
      // 检查组合元音
      let foundCombined = false;
      for (const [combo, romanized] of Object.entries(combinedVowelMap)) {
        if (i + combo.length <= rest.length && 
            rest.substring(i, i + combo.length) === combo) {
          result += romanized;
          i += combo.length;
          foundCombined = true;
          break;
        }
      }
      if (foundCombined) continue;
      
      const char = rest[i];
      
      // 处理单个元音
      if (vowelMap[char]) {
        result += vowelMap[char];
      } 
      // 处理修饰符
      else if (modifierMap[char] !== undefined) {
        result += modifierMap[char];
      }
      // 处理其他字符
      else {
        result += char;
      }
      
      i++;
    }
    
    return result;
  };

  // 主处理函数
  const processText = (text: string): string => {
    // 清理文本
    text = cleanText(text);
    
    // 检查特殊词汇
    if (specialWords[text]) {
      return specialWords[text];
    }
    
    // 分割文本为单词
    const words = text.split(/\s+/);
    const processedWords = words.map(word => {
      // 检查特殊词汇
      if (specialWords[word]) {
        return specialWords[word];
      }
      
      // 处理数字
      if (/^[၀-၉]+$/.test(word)) {
        return word.split('').map(char => numberMap[char] || char).join('');
      }
      
      // 分割单词为音节并处理
      const syllables = splitIntoSyllables(word);
      return syllables.map(processSyllable).join('');
    });
    
    return processedWords.join(' ');
  };

  return processText(text);
}
export default function MyaMyanmar(text: string): string {
  // 按照MLCTS标准的映射表
  const mlctsMap: Record<string, string> = {
    // 辅音字母
    'က': 'k', 'ခ': 'hk', 'ဂ': 'g', 'ဃ': 'gh', 'င': 'ng',
    'စ': 'c', 'ဆ': 'hc', 'ဇ': 'j', 'ဈ': 'jh', 'ည': 'ny',
    'ဋ': 't', 'ဌ': 'ht', 'ဍ': 'd', 'ဎ': 'dh', 'ဏ': 'n',
    'တ': 't', 'ထ': 'ht', 'ဒ': 'd', 'ဓ': 'dh', 'န': 'n',
    'ပ': 'p', 'ဖ': 'hp', 'ဗ': 'b', 'ဘ': 'bh', 'မ': 'm',
    'ယ': 'y', 'ရ': 'r', 'လ': 'l', 'ဝ': 'w', 'သ': 's',
    'ဟ': 'h', 'ဠ': 'l', 'အ': 'a',
    
    // 元音符号
    'ါ': 'a', 'ာ': 'a', 'ိ': 'i', 'ီ': 'i', 'ု': 'u', 'ူ': 'u',
    'ေ': 'e', 'ဲ': 'ai', 'ံ': 'an', 'း': ':',
    
    // 组合元音
    'ော': 'au', 'ို': 'ui', 'ော်': 'aw',
    
    // 声调和其他标记
    '်': '', '့': 'n', '္': '', 'ျ': 'y', 'ြ': 'y', 'ွ': 'w', 'ှ': 'h',
    
    // 数字
    '၀': '0', '၁': '1', '၂': '2', '၃': '3', '၄': '4',
    '၅': '5', '၆': '6', '၇': '7', '၈': '8', '၉': '9',
    
    // 特殊字符
    '၊': ',', '။': '.'
  };
  
  // 处理特殊组合
  const specialCombinations: Record<string, string> = {
    'ကျ': 'ky', 'ချ': 'hky', 'ဂျ': 'gy',
    'ကြ': 'ky', 'ခြ': 'hky', 'ဂြ': 'gy',
    'ကွ': 'kw', 'ခွ': 'hkw', 'ဂွ': 'gw',
    'ကျွ': 'kyw', 'ချွ': 'hkyw', 'ဂျွ': 'gyw',
    'ကြွ': 'kyw', 'ခြွ': 'hkyw', 'ဂြွ': 'gyw'
  };
  
  // 处理音节
  const processSyllable = (syllable: string): string => {
    let result = '';
    let i = 0;
    
    while (i < syllable.length) {
      // 检查特殊组合
      let matched = false;
      for (const [combo, romanized] of Object.entries(specialCombinations)) {
        if (syllable.substring(i, i + combo.length) === combo) {
          result += romanized;
          i += combo.length;
          matched = true;
          break;
        }
      }
      
      if (!matched) {
        // 处理单个字符
        const char = syllable[i];
        if (mlctsMap[char] !== undefined) {
          result += mlctsMap[char];
        } else {
          result += char;
        }
        i++;
      }
    }
    
    return result;
  };
  
  // 分割文本为音节
  const syllables = text.split(/([၊။\s])/g);
  const result = syllables
    .map(s => processSyllable(s))
    .join('')
    .replace(/\s+/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2') // 在大小写字母间添加空格
    .toLowerCase();
  
  return result;
}
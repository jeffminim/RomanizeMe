// 高棉语罗马化转换器
export default function KhmKhmer(text: string): string {
  if (!text) return '';

  // 高棉字符到罗马字母的映射表
  const khmerToRoman: Record<string, string> = {
    // 辅音
    'ក': 'k', 'ខ': 'kh', 'គ': 'g', 'ឃ': 'gh', 'ង': 'ng',
    'ច': 'ch', 'ឆ': 'chh', 'ជ': 'j', 'ឈ': 'jh', 'ញ': 'nh',
    'ដ': 'd', 'ឋ': 'th', 'ឌ': 'd', 'ឍ': 'dh', 'ណ': 'n',
    'ត': 't', 'ថ': 'th', 'ទ': 'd', 'ធ': 'dh', 'ន': 'n',
    'ប': 'b', 'ផ': 'ph', 'ព': 'p', 'ភ': 'ph', 'ម': 'm',
    'យ': 'y', 'រ': 'r', 'ល': 'l', 'វ': 'v', 'ឝ': 's',
    'ឞ': 's', 'ស': 's', 'ហ': 'h', 'ឡ': 'l', 'អ': 'a',
    
    // 元音
    'ា': 'a', 'ិ': 'i', 'ី': 'i', 'ឹ': 'oe', 'ឺ': 'oe',
    'ុ': 'u', 'ូ': 'u', 'ួ': 'uea', 'ើ': 'ae', 'ឿ': 'eua',
    'ៀ': 'ea', 'េ': 'e', 'ែ': 'ae', 'ៃ': 'ai', 'ោ': 'o',
    'ៅ': 'au', 'ុំ': 'om', 'ំ': 'am', 'ាំ': 'am', 'ះ': 'ah',
    
    // 数字
    '០': '0', '១': '1', '២': '2', '៣': '3', '៤': '4',
    '៥': '5', '៦': '6', '៧': '7', '៨': '8', '៩': '9',
    
    // 其他符号
    '៕': '.', '៖': ':', '៘': '...', '៙': '/', '៚': '//',
    '៛': 'riel', '៝': '!', '៞': '"', '។': '.', '៓': '?',
    '៰': '0', '៱': '1', '៲': '2', '៳': '3', '៴': '4',
    '៵': '5', '៶': '6', '៷': '7', '៸': '8', '៹': '9',
    '៎': '', '៏': '', '៑': '', '្': '', '័': '', '៌': '',
    'ឯ': 'e',
    
    // 特殊字符
    '់': '', 'ៈ': '', 'ៗ': '', '៍': '', '៎': '', 
    '៏': '', '៑': '', '្': '', '័': '', '៌': '',
    '៉': '', '៊': '', '៖': ':', '៘': '...',
    '៛': 'riel', '៝': '!', '៞': '"', '។': '.',
    '៓': '?', '៕': '.', '៚': '//', '៙': '/'
  };

  // 特殊组合处理
  const specialCombinations: Record<string, string> = {
    'ក្រ': 'kr', 'ខ្រ': 'khr', 'គ្រ': 'gr', 'ឃ្រ': 'ghr',
    'ង្រ': 'ngr', 'ច្រ': 'chr', 'ឆ្រ': 'chhr', 'ជ្រ': 'jr',
    'ឈ្រ': 'jhr', 'ញ្រ': 'nhr', 'ដ្រ': 'dr', 'ឋ្រ': 'thr',
    'ឌ្រ': 'dr', 'ឍ្រ': 'dhr', 'ណ្រ': 'nr', 'ត្រ': 'tr',
    'ថ្រ': 'thr', 'ទ្រ': 'dr', 'ធ្រ': 'dhr', 'ន្រ': 'nr',
    'ប្រ': 'br', 'ផ្រ': 'phr', 'ព្រ': 'pr', 'ភ្រ': 'phr',
    'ម្រ': 'mr', 'យ្រ': 'yr', 'រ្រ': 'rr', 'ល្រ': 'lr',
    'វ្រ': 'vr', 'ឝ្រ': 'sr', 'ឞ្រ': 'sr', 'ស្រ': 'sr',
    'ហ្រ': 'hr', 'ឡ្រ': 'lr', 'អ្រ': 'ar',
    
    // 添加新的特殊组合
    'រដ្ឋ': 'rot', 'មន្រ្តី': 'montrei',
    'ឧប': 'up', 'នាយក': 'nayok',
    'អឺ': 'eu', 'រ៉ុ': 'ro', 'ប': 'p',
    'ប្រ': 'pra', 'ាក់': 'ak',
    'ឧត្ត': 'ut', 'ម': 'm',
    'រប': 'rob', 'ស់': 's',
    'អា': 'a', 'ស៊ី': 'si',
    'ឆ្នាំ': 'chnam'
  };

  // 处理文本
  let result = '';
  let i = 0;
  
  while (i < text.length) {
    // 优先检查特殊组合
    let found = false;
    for (const combo in specialCombinations) {
      if (text.substring(i, i + combo.length) === combo) {
        result += specialCombinations[combo];
        i += combo.length;
        found = true;
        break;
      }
    }
    
    if (!found) {
      // 处理数字组
      if (/[០១២៣៤៥៦៧៨៩]/.test(text[i])) {
        // 在数字组前添加空格（如果前面不是空格）
        if (result.length > 0 && !/\s$/.test(result)) {
          result += ' ';
        }
        // 处理连续数字
        while (i < text.length && /[០១២៣៤៥៦៧៨៩]/.test(text[i])) {
          result += khmerToRoman[text[i]] || text[i];
          i++;
        }
        // 在数字组后添加空格（如果后面不是空格）
        if (i < text.length && !/\s/.test(text[i])) {
          result += ' ';
        }
        continue;
      }
      
      // 处理单个字符
      const char = text[i];
      if (khmerToRoman[char] !== undefined) {
        result += khmerToRoman[char];
      } else {
        // 如果不在映射表中，保留原字符
        result += char;
      }
      i++;
    }
  }
  
  // 处理一些后处理规则
  result = result
    // 处理重复的元音
    .replace(/([aeiou])\1+/g, '$1')
    // 处理词尾的h
    .replace(/h$/g, '')
    // 标准化空格
    .replace(/\s+/g, ' ');
  
  return result;
}
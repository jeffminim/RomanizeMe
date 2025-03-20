export default function BerTifinagh(text: string): string {
  // 提非纳格字母到拉丁字母的映射表 (基于IRCAM标准)
  const tifinaghToLatinMap: Record<string, string> = {
    // 基本字母
    'ⴰ': 'a', 'ⴱ': 'b', 'ⴲ': 'b', 'ⴳ': 'g', 'ⴴ': 'g', 'ⴵ': 'gʷ', 
    'ⴶ': 'gʷ', 'ⴷ': 'd', 'ⴸ': 'd', 'ⴹ': 'ḍ', 'ⴺ': 'ḍ', 'ⴻ': 'e', 
    'ⴼ': 'f', 'ⴽ': 'k', 'ⴾ': 'k', 'ⴿ': 'kʷ', 'ⵀ': 'h', 'ⵁ': 'h', 
    'ⵂ': 'h', 'ⵃ': 'ḥ', 'ⵄ': 'ɛ', 'ⵅ': 'x', 'ⵆ': 'x', 'ⵇ': 'q', 
    'ⵈ': 'q', 'ⵉ': 'i', 'ⵊ': 'j', 'ⵋ': 'j', 'ⵌ': 'j', 'ⵍ': 'l', 
    'ⵎ': 'm', 'ⵏ': 'n', 'ⵐ': 'ny', 'ⵑ': 'ŋ', 'ⵒ': 'p', 'ⵓ': 'u', 
    'ⵔ': 'r', 'ⵕ': 'ṛ', 'ⵖ': 'ɣ', 'ⵗ': 'ɣ', 'ⵘ': 'ɣʷ', 'ⵙ': 's', 
    'ⵚ': 'ṣ', 'ⵛ': 'š', 'ⵜ': 't', 'ⵝ': 't', 'ⵞ': 'č', 'ⵟ': 'ṭ', 
    'ⵠ': 'v', 'ⵡ': 'w', 'ⵢ': 'y', 'ⵣ': 'z', 'ⵤ': 'z', 'ⵥ': 'ẓ', 
    'ⵦ': 'ẓ', 'ⵧ': 'ž',

    // 附加符号和变音符
    'ⵯ': 'ʷ', '⵰': '.', 

    // 提非纳格标点符号
    '⵿': '', // 连接符，转写时通常不显示
    '⵾': '-', // 分词符号
    '⵮': ',', // 逗号
    '⵭': ';', // 分号
    '⵬': '?', // 问号

    // 数字 
    '⵪': '0', '⵰': '1', '⵱': '2', '⵲': '3', '⵳': '4', 
    '⵴': '5', '⵵': '6', '⵶': '7', '⵷': '8', '⵸': '9',
    
    // Tifinagh 扩展字符
    'ⵄ': "'", // 阿因音，通常转写为撇号
    'ⵯ': 'ʷ', // 圆唇化符号
    
    // 北部柏柏尔语的特殊字符
    'ⵃ': 'ḥ', // 清喉擦音
    'ⵜⵛ': 'č', // 清龈颚塞擦音，由两个字符组成
    'ⵣⵣ': 'ẓẓ', // 双重 ẓ 音
    'ⴵⵢ': 'gy', // g 和 y 音的组合
    
    // 图阿雷格方言特殊字符
    'ⵑ': 'ng', // 软颚鼻音
    'ⵗ': 'ʸɣ', // 软腭化 ɣ
    'ⵂ': 'ħ'  // 咽擦音
  };

  // 处理多字符组合
  const multiCharMap: Record<string, string> = {
    'ⵜⵛ': 'č', // 清龈颚塞擦音
    'ⴷⵣ': 'dz', // dz 音
    'ⵜⵙ': 'ts', // ts 音
    'ⵏⵖ': 'nɣ', // nɣ 音
    'ⵏⵜ': 'nt'  // nt 音
  };

  let result = '';
  let i = 0;
  
  // 逐个字符或组合转换
  while (i < text.length) {
    // 检查是否有多字符组合
    let found = false;
    for (const combo in multiCharMap) {
      if (text.substring(i, i + combo.length) === combo) {
        result += multiCharMap[combo];
        i += combo.length;
        found = true;
        break;
      }
    }
    
    // 如果没有找到多字符组合，处理单个字符
    if (!found) {
      const char = text[i];
      // 如果字符在映射表中，则转换，否则保留原字符
      result += tifinaghToLatinMap[char] || char;
      i++;
    }
  }

  // 处理一些转写后的美化规则
  result = result
    // 处理重复辅音
    .replace(/([bcdfghjklmnpqrstvwxzḍṛṣṭẓš])([bcdfghjklmnpqrstvwxzḍṛṣṭẓš])\1/g, '$1$1$2')
    // 处理元音之间的音变
    .replace(/([aeiouɛ])ɣ([aeiouɛ])/g, '$1ʁ$2')
    // 处理词尾的ɣ
    .replace(/ɣ/, 'gh')  // 词尾的ɣ转写为gh
    // 替换某些组合以符合国际音标标准
    .replace(/ʷ([aeiouɛ])/g, 'w$1');

  return result;
} 
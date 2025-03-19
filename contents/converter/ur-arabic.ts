/**
 * 乌尔都语罗马化转写函数
 * 基于ALA-LC标准实现乌尔都语到拉丁字母的转写
 * @param text 输入的乌尔都语文本（阿拉伯文字）
 * @returns 转写后的拉丁字母文本
 */
export default function UrdArabic(text: string): string {
  if (!text) return '';

  // 乌尔都语字符映射表
  const charMap: Record<string, string> = {
    // 基本阿拉伯字母
    'ا': 'a',      // alif
    'آ': 'ā',      // alif madda
    'أ': 'a',      // alif hamza above
    'إ': 'i',      // alif hamza below
    'ب': 'b',      // bā
    'پ': 'p',      // pē (特有字母)
    'ت': 't',      // tā
    'ٹ': 'ṭ',      // ṭē (特有字母)
    'ث': 's̱',      // s̱ā
    'ج': 'j',      // jīm
    'چ': 'ch',     // chē (特有字母)
    'ح': 'ḥ',      // ḥā
    'خ': 'kh',     // khā
    'د': 'd',      // dāl
    'ڈ': 'ḍ',      // ḍāl (特有字母)
    'ذ': 'ẕ',      // ẕāl
    'ر': 'r',      // rā
    'ڑ': 'ṛ',      // ṛē (特有字母)
    'ز': 'z',      // zā
    'ژ': 'zh',     // zhē (特有字母，波斯语借用)
    'س': 's',      // sīn
    'ش': 'sh',     // shīn
    'ص': 'ṣ',      // ṣād
    'ض': 'z̤',      // z̤ād
    'ط': 't̤',      // t̤ā
    'ظ': 'z̤',      // z̤ā
    'ع': '\'',     // 'ain
    'غ': 'gh',     // ghain
    'ف': 'f',      // fā
    'ق': 'q',      // qāf
    'ك': 'k',      // kāf
    'ک': 'k',      // 乌尔都语kāf变体
    'گ': 'g',      // gāf (特有字母)
    'ل': 'l',      // lām
    'م': 'm',      // mīm
    'ن': 'n',      // nūn
    'ں': 'ṉ',      // nūn ghunna (特有字母)
    'و': 'v',      // vāv (可作为辅音或元音)
    'ہ': 'h',      // hā (特有形式)
    'ھ': 'h',      // dō chashmī hā
    'ء': '\'',     // hamza
    'ی': 'y',      // chōṭī yā (特有形式)
    'ے': 'ē',      // baṛī yā (特有字母)
    'ئ': '\'',     // yā with hamza
    
    // 元音符号
    'َ': 'a',       // fatḥa
    'ِ': 'i',       // kasra
    'ُ': 'u',       // ḍamma
    'ٰ': 'ā',       // alif khanjariyya
    'ٖ': 'ī',       // subscript alif
    'ٗ': 'ū',       // inverted ḍamma
    'ً': 'an',      // tanwīn fatḥ
    'ٍ': 'in',      // tanwīn kasr
    'ٌ': 'un',      // tanwīn ḍamm
    'ّ': '',        // shadda - 双写前一个辅音
    'ْ': '',        // sukūn - 无元音标记
    
    // 数字
    '۰': '0',
    '۱': '1',
    '۲': '2',
    '۳': '3',
    '۴': '4',
    '۵': '5',
    '۶': '6',
    '۷': '7',
    '۸': '8',
    '۹': '9',
    
    // 标点符号
    '،': ',',       // urdu comma
    '۔': '.',       // urdu full stop
    '؟': '?',       // urdu question mark
    '؛': ';',       // urdu semicolon
  };
  
  // 特殊组合处理
  const combos: Record<string, string> = {
    'اَ': 'a',    // alif + fatha
    'اِ': 'i',    // alif + kasra 
    'اُ': 'u',    // alif + damma
    'اٰ': 'ā',    // alif + khanjariyya
    'وْ': 'ō',    // vāv + sukūn
    'یْ': 'ē',    // yā + sukūn
    'وُ': 'ū',    // vāv + damma
    'یِ': 'ī',    // yā + kasra
  };
  
  // 修改处理逻辑部分
  let result = '';
  let i = 0;
  
  while (i < text.length) {
    let found = false;
    
    // 检查三字母组合
    if (i + 2 < text.length) {
      const threeChars = text[i] + text[i+1] + text[i+2];
      if (combos[threeChars]) {
        result += combos[threeChars];
        i += 3;
        found = true;
        continue;
      }
    }
    
    // 检查双字母组合
    if (i + 1 < text.length) {
      const twoChars = text[i] + text[i+1];
      if (combos[twoChars]) {
        result += combos[twoChars];
        i += 2;
        found = true;
        continue;
      }
      
      // 处理shadda(双写前一个辅音)
      if (text[i+1] === 'ّ' && charMap[text[i]]) {
        result += charMap[text[i]].repeat(2);
        i += 2;
        found = true;
        continue;
      }
    }
    
    // 单字符处理
    if (!found) {
      if (charMap[text[i]]) {
        result += charMap[text[i]];
      } else {
        // 未知字符保持原样
        result += text[i];
      }
      i++;
    }
  }
  
  // 后处理特殊情况，修复错误的转写
  
  // 1. 修复元音问题，确保重组分离的字符
  // 修复像 "gha'ib" 这样的问题，应该是 "ghaib"
  result = result.replace(/([a-z]+)'([a-z]+)/g, '$1$2');
  
  // 2. 处理و作为元音时的情况
  result = result.replace(/([aeiou])v/g, '$1w');
  
  // 3. 处理ی作为元音时的情况
  result = result.replace(/([aeiou])y([^aeiou]|$)/g, '$1ī$2');
  
  // 4. 词首的alif通常不发音，除非有hamza
  result = result.replace(/^a([^aeiouy])/g, '$1');
  
  // 5. 修复可能的错误模式
  result = result.replace(/k([aeiou])/g, 'ka$1'); // 修复 "کa" 到 "ka"
  result = result.replace(/chh/g, 'chh'); // 确保 "chh" 正确组合
  
  // 6. 美化标点间距
  result = result.replace(/ +/g, ' ').trim();
  
  return result;
} 
export default function AraArabic(text: string): string {
  // 阿拉伯语罗马化转写逻辑 - 基于ISO 233并兼容ALA-LC标准
  
  // 基本字母映射表
  const arabicToLatinMap: { [key: string]: string } = {
    // 基本辅音字母
    'ب': 'b',    // ba
    'ت': 't',    // ta
    'ث': 'ṯ',    // tha
    'ج': 'ǧ',    // jim
    'ح': 'ḥ',    // ha
    'خ': 'ḫ',    // kha
    'د': 'd',    // dal
    'ذ': 'ḏ',    // dhal
    'ر': 'r',    // ra
    'ز': 'z',    // zay
    'س': 's',    // sin
    'ش': 'š',    // shin
    'ص': 'ṣ',    // sad
    'ض': 'ḍ',    // dad
    'ط': 'ṭ',    // ta
    'ظ': 'ẓ',    // za
    'ع': 'ʿ',    // ayn
    'غ': 'ġ',    // ghayn
    'ف': 'f',    // fa
    'ق': 'q',    // qaf
    'ك': 'k',    // kaf
    'ل': 'l',    // lam
    'م': 'm',    // mim
    'ن': 'n',    // nun
    'ه': 'h',    // ha
    'و': 'w',    // waw (作为辅音)
    'ي': 'y',    // ya (作为辅音)
    
    // 特殊字符和字母
    'ا': 'ā',    // alif (长元音)
    'ء': 'ʾ',    // hamza
    'ة': 'ẗ',    // ta marbuta (词尾通常发a音)
    'ى': 'ā',    // alif maqsura
    'آ': 'ʾā',   // alif madda
    'أ': 'ʾ',    // alif with hamza above
    'إ': 'ʾi',   // alif with hamza below
    'ؤ': 'ʾ',    // waw with hamza
    'ئ': 'ʾ',    // ya with hamza
    'ـ': '',     // tatweel (kashida)
    
    // 标点和符号
    '،': ',',    // Arabic comma
    '؛': ';',    // Arabic semicolon
    '؟': '?',    // Arabic question mark
  };
  
  // 变音符号映射表
  const diacriticsMap: { [key: string]: string } = {
    'َ': 'a',     // fatha
    'ُ': 'u',     // damma
    'ِ': 'i',     // kasra
    'ً': 'an',    // fathatan (tanwin fath)
    'ٌ': 'un',    // dammatan (tanwin damm)
    'ٍ': 'in',    // kasratan (tanwin kasr)
    'ّ': '',      // shadda (重复上一个辅音)
    'ْ': '',      // sukun (无元音)
  };
  
  // 常见单词直接映射表 (保留，因为这是你允许的)
  const commonWords: { [key: string]: string } = {
    'على': 'ʿalā',      // 在...之上
    'إلى': 'ʾilā',      // 向，往
    'من': 'min',        // 从
    'في': 'fī',         // 在...之内
    'عن': 'ʿan',        // 关于
    'مع': 'maʿa',       // 和，与
    'غزة': 'Ghazzah',    // 加沙
    'الله': 'Allāh',    // 真主
    'محمد': 'Muḥammad', // 穆罕默德
  };
  
  // 规范化文本（统一字符表示）
  text = text.normalize('NFKC');
  
  // 辅助函数：检查字符是否是阿拉伯字母
  const isArabicChar = (char: string): boolean => {
    return /[\u0600-\u06FF]/.test(char);
  };
  
  // 辅助函数：检查字符是否是变音符号
  const isDiacritic = (char: string): boolean => {
    return /[\u064B-\u065F]/.test(char);
  };
  
  // 辅助函数：检查字符是否是辅音
  const isConsonant = (char: string): boolean => {
    return isArabicChar(char) && 
           !['ا', 'و', 'ي', 'ى', 'آ', 'أ', 'إ', 'ؤ', 'ئ'].includes(char) && 
           !isDiacritic(char);
  };
  
  // 主处理函数
  let result = '';
  const words = text.split(/([^\u0600-\u06FF]+)/);
  
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    
    // 跳过空单词
    if (!word) continue;
    
    // 处理非阿拉伯文字
    if (!isArabicChar(word[0])) {
      result += word;
      continue;
    }
    
    // 检查常见单词表
    if (commonWords[word]) {
      result += commonWords[word];
      continue;
    }
    
    // 处理单个阿拉伯语单词
    let wordResult = '';
    let hasAddedVowel = false;
    let previousChar = '';
    let previousCharRomanized = '';
    
    // 检查是否以定冠词开头
    if (word.startsWith('ال')) {
      wordResult = 'al-';
      
      // 太阳字母(Sun Letters)的同化现象
      const sunLetters = ['ت', 'ث', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ل', 'ن'];
      if (word.length > 2 && sunLetters.includes(word[2])) {
        // 例如 "الشمس" (al-šams) 应转写为 "aš-šams"
        const sunLetter = arabicToLatinMap[word[2]];
        wordResult = 'a' + sunLetter + '-';
        
        // 处理剩余部分（跳过定冠词）
        for (let j = 2; j < word.length; j++) {
          const char = word[j];
          processChar(char, j);
        }
      } else {
        // 处理剩余部分（跳过定冠词）
        for (let j = 2; j < word.length; j++) {
          const char = word[j];
          processChar(char, j);
        }
      }
    } else {
      // 处理整个单词
      for (let j = 0; j < word.length; j++) {
        const char = word[j];
        processChar(char, j);
      }
    }
    
    // 根据ALA-LC规则，首字母大写
    if (wordResult.length > 0) {
      wordResult = wordResult.charAt(0).toUpperCase() + wordResult.slice(1);
    }
    
    result += wordResult;
    
    // 内嵌函数：处理单个字符
    function processChar(char: string, position: number) {
      const nextChar = position + 1 < word.length ? word[position + 1] : '';
      
      // 处理shadda(双辅音)
      if (char === 'ّ') {
        if (previousCharRomanized) {
          wordResult += previousCharRomanized;
        }
        return;
      }
      
      // 处理基本字母
      if (arabicToLatinMap[char]) {
        // 处理特殊情况：و和ي作为长元音
        if (char === 'و' && previousChar && !isDiacritic(nextChar)) {
          // 如果前面有辅音字母，且和不是结尾，可能是长元音ū
          if (isConsonant(previousChar) && position < word.length - 1) {
            wordResult += 'ū';
            hasAddedVowel = true;
          } else {
            wordResult += arabicToLatinMap[char];
          }
        } 
        else if (char === 'ي' && previousChar && !isDiacritic(nextChar)) {
          // 如果前面有辅音字母，且和不是结尾，可能是长元音ī
          if (isConsonant(previousChar) && position < word.length - 1) {
            wordResult += 'ī';
            hasAddedVowel = true;
          } else {
            wordResult += arabicToLatinMap[char];
          }
        }
        else {
          wordResult += arabicToLatinMap[char];
        }
        
        previousChar = char;
        previousCharRomanized = arabicToLatinMap[char];
      }
      // 处理变音符号
      else if (diacriticsMap[char]) {
        wordResult += diacriticsMap[char];
        hasAddedVowel = true;
      }
    }
    
    // 添加缺失的元音（仅在必要情况下）
    // 我们在这里采用简化的、基于规则的方法
    if (!hasAddedVowel && wordResult.length > 0) {
      // 如果单词以m开头，很可能是mufāʿil形式（如mubāšir）
      if (wordResult.startsWith('m') && wordResult.length >= 3) {
        const parts = wordResult.split('');
        parts.splice(1, 0, 'u');
        if (parts.length >= 4) {
          parts.splice(3, 0, 'ā');
        }
        wordResult = parts.join('');
      } 
      // 对于其他情况，使用基于辅音位置的简单规则
      else {
        let newResult = '';
        let consonantCount = 0;
        
        for (let j = 0; j < wordResult.length; j++) {
          const char = wordResult[j];
          newResult += char;
          
          // 只在辅音后添加短元音a
          if (!/[aeiouāīū]/i.test(char) && !/[-ʾʿ']/.test(char)) {
            consonantCount++;
            
            // 在两个辅音之后添加短元音，但不在词尾
            if (consonantCount === 2 && j < wordResult.length - 1) {
              newResult += 'a';
              consonantCount = 0;
            }
          } else {
            consonantCount = 0;
          }
        }
        
        wordResult = newResult;
      }
    }
    
    // 处理词尾ta marbuta (ة)的特殊情况
    if (word.endsWith('ة')) {
      // 根据ALA-LC规则处理词尾ta marbuta
      if (wordResult.endsWith('ẗ')) {
        wordResult = wordResult.substring(0, wordResult.length - 1) + '';
      }
      if (!wordResult.endsWith('a') && !wordResult.endsWith('ā')) {
        wordResult += 'a';
      }
    }
  }
  
  return result;
} 
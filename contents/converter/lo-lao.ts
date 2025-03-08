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
    'ຫ': 'h', 'ອ': 'o', 'ຮ': 'h',
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
    'ຽ': 'ia', 'ໍ': 'o'
  };

  // 前置元音列表
  const leadingVowels = ['ເ', 'ແ', 'ໂ', 'ໃ', 'ໄ'];

  // 声调符号映射表
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
    'ເົ້າ': 'ao', 'ເິ': 'i', 'ໂອ': 'o',
    'ໍ່': 'o', 'ໍ້': 'o'
  };

  // 特殊词汇映射
  const specialWords: Record<string, string> = {
    // 'ລາວ': 'lao',
    // 'ວຽງຈັນ': 'vientiane',
    // 'ນະຄອນຫຼວງວຽງຈັນ': 'vientiane',
    // 'ບໍລິຫານ': 'bolihan',
    // 'ຕໍ່': 'to',
    // 'ໃຫຍ່': 'nyai',
    // 'ຕົນເອງ': 'tongeng',
    // 'ເລຂາທິການ': 'lekhathikan',
    // 'ປົກຄອງ': 'pokkhong'
  };

  // 检查是否是特殊词汇
  if (specialWords[text]) {
    return specialWords[text];
  }

  // 将文本分割为单词
  const words = text.split(/\s+/);
  let result = [];

  for (const word of words) {
    // 检查特殊词汇
    if (specialWords[word]) {
      result.push(specialWords[word]);
      continue;
    }

    // 分割单词为音节
    const syllables = [];
    let i = 0;

    while (i < word.length) {
      // 检查前置元音
      if (i < word.length && leadingVowels.includes(word[i])) {
        const leadingVowel = word[i];
        i++;
        
        // 寻找后续辅音
        if (i < word.length && consonantMap[word[i]]) {
          const consonant = word[i];
          i++;
          
          // 收集剩余元音和声调
          let vowelPart = '';
          while (i < word.length && 
                 (vowelMap[word[i]] || 
                  toneMap[word[i]] || 
                  word[i] === 'ຽ' || 
                  word[i] === 'ໍ')) {
            vowelPart += word[i];
            i++;
          }
          
          // 如果下一个字符是辅音但不是新音节的开始，则它是音节尾
          let finalConsonant = '';
          if (i < word.length && consonantMap[word[i]]) {
            // 检查是否是音节尾辅音
            if (i + 1 >= word.length || 
                !vowelMap[word[i+1]] && 
                !leadingVowels.includes(word[i+1])) {
              finalConsonant = word[i];
              i++;
            }
          }
          
          syllables.push({
            type: 'leading',
            leadingVowel,
            consonant,
            vowelPart,
            finalConsonant
          });
        } else {
          // 孤立的前置元音
          syllables.push({
            type: 'single',
            char: leadingVowel
          });
        }
      } else if (i < word.length && consonantMap[word[i]]) {
        // 普通辅音开头的音节
        const consonant = word[i];
        i++;
        
        // 收集元音和声调
        let vowelPart = '';
        while (i < word.length && 
               (vowelMap[word[i]] || 
                toneMap[word[i]] || 
                word[i] === 'ຽ' || 
                word[i] === 'ໍ')) {
          vowelPart += word[i];
          i++;
        }
        
        // 检查音节尾辅音
        let finalConsonant = '';
        if (i < word.length && consonantMap[word[i]]) {
          // 检查是否是音节尾辅音
          if (i + 1 >= word.length || 
              !vowelMap[word[i+1]] && 
              !leadingVowels.includes(word[i+1])) {
            finalConsonant = word[i];
            i++;
          }
        }
        
        syllables.push({
          type: 'normal',
          consonant,
          vowelPart,
          finalConsonant
        });
      } else {
        // 其他字符
        syllables.push({
          type: 'single',
          char: word[i]
        });
        i++;
      }
    }

    // 转换每个音节
    const romanizedSyllables = [];

    for (const syllable of syllables) {
      if (syllable.type === 'single') {
        const char = syllable.char;
        if (numberMap[char]) {
          romanizedSyllables.push(numberMap[char]);
        } else if (vowelMap[char]) {
          romanizedSyllables.push(vowelMap[char]);
        } else if (consonantMap[char]) {
          romanizedSyllables.push(consonantMap[char] + 'a');
        } else {
          romanizedSyllables.push(char);
        }
        continue;
      }

      let syllableResult = '';

      if (syllable.type === 'leading') {
        // 处理前置元音的音节
        const consonantRoman = consonantMap[syllable.consonant] || '';
        
        // 检查是否有组合元音
        let vowelRoman = '';
        let foundCombined = false;
        
        for (const [combo, roman] of Object.entries(combinedVowelMap)) {
          if (syllable.leadingVowel + syllable.vowelPart === combo || 
              syllable.vowelPart.includes(combo)) {
            vowelRoman = roman;
            foundCombined = true;
            break;
          }
        }
        
        if (!foundCombined) {
          // 处理前置元音
          vowelRoman = vowelMap[syllable.leadingVowel] || '';
          
          // 处理其他元音和声调
          for (const char of syllable.vowelPart) {
            if (vowelMap[char]) {
              vowelRoman += vowelMap[char];
            }
            // 忽略声调
          }
        }
        
        // 简化元音组合
        vowelRoman = vowelRoman.replace(/([aeiou])\1+/g, '$1');
        
        // 添加辅音和元音
        syllableResult = consonantRoman + vowelRoman;
        
        // 添加音节尾辅音
        if (syllable.finalConsonant) {
          syllableResult += consonantMap[syllable.finalConsonant] || '';
        }
      } else if (syllable.type === 'normal') {
        // 处理普通音节
        const consonantRoman = consonantMap[syllable.consonant] || '';
        
        // 检查是否有组合元音
        let vowelRoman = '';
        let foundCombined = false;
        
        for (const [combo, roman] of Object.entries(combinedVowelMap)) {
          if (syllable.vowelPart.includes(combo)) {
            vowelRoman = roman;
            foundCombined = true;
            break;
          }
        }
        
        if (!foundCombined) {
          // 处理元音和声调
          for (const char of syllable.vowelPart) {
            if (vowelMap[char]) {
              vowelRoman += vowelMap[char];
            }
            // 忽略声调
          }
        }
        
        // 如果没有元音，添加默认元音
        if (!vowelRoman && consonantRoman) {
          vowelRoman = 'a';
        }
        
        // 简化元音组合
        vowelRoman = vowelRoman.replace(/([aeiou])\1+/g, '$1');
        
        // 添加辅音和元音
        syllableResult = consonantRoman + vowelRoman;
        
        // 添加音节尾辅音
        if (syllable.finalConsonant) {
          syllableResult += consonantMap[syllable.finalConsonant] || '';
        }
      }
      
      romanizedSyllables.push(syllableResult);
    }

    // 合并音节
    result.push(romanizedSyllables.join(''));
  }

  // 合并单词
  let finalResult = result.join(' ');
  
  // 最终检查，确保没有老挝文字符
  if (/[\u0E80-\u0EFF]/.test(finalResult)) {
    // 如果还有老挝文字符，尝试逐字符转换
    let cleanResult = '';
    for (const char of finalResult) {
      if (/[\u0E80-\u0EFF]/.test(char)) {
        cleanResult += vowelMap[char] || consonantMap[char] || '';
      } else {
        cleanResult += char;
      }
    }
    return cleanResult || text;
  }

  return finalResult || text;
}
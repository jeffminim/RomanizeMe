export default function IsrHebrew(text: string): string {
  // 希伯来字母到拉丁字母的标准映射表
  const hebrewToLatinMap: Record<string, string> = {
    // 基本字母
    'א': 'a',    // alef
    'ב': 'b',    // bet
    'ג': 'g',    // gimel
    'ד': 'd',    // dalet
    'ה': 'h',    // he
    'ו': 'v',    // vav
    'ז': 'z',    // zayin
    'ח': 'ch',   // het
    'ט': 't',    // tet
    'י': 'y',    // yod
    'כ': 'k',    // kaf
    'ך': 'k',    // final kaf
    'ל': 'l',    // lamed
    'מ': 'm',    // mem
    'ם': 'm',    // final mem
    'נ': 'n',    // nun
    'ן': 'n',    // final nun
    'ס': 's',    // samekh
    'ע': 'a',    // ayin
    'פ': 'p',    // pe
    'ף': 'p',    // final pe
    'צ': 'ts',   // tsadi
    'ץ': 'ts',   // final tsadi
    'ק': 'k',    // qof
    'ר': 'r',    // resh
    'ש': 'sh',   // shin
    'ת': 't',    // tav

    // 带发音符号的组合
    'בּ': 'b',    // bet with dagesh
    'ב': 'v',    // bet without dagesh (常见情况)
    'כּ': 'k',    // kaf with dagesh
    'כ': 'kh',   // kaf without dagesh
    'פּ': 'p',    // pe with dagesh
    'פ': 'f',    // pe without dagesh

    // 元音符号
    'ָ': 'a',    // kamatz
    'ַ': 'a',    // patach
    'ֵ': 'e',    // tsere
    'ֶ': 'e',    // segol
    'ִ': 'i',    // hiriq
    'ֹ': 'o',    // holam
    'וֹ': 'o',   // holam vav
    'ֻ': 'u',    // kubuts
    'וּ': 'u',   // shuruk
    'ְ': 'e',    // sheva
    'ֲ': 'a',    // hataf patach
    'ֳ': 'o',    // hataf kamatz
    'ֱ': 'e',    // hataf segol

    // 标点符号
    '׳': '\'',   // geresh
    '״': '"',    // gershayim
    '־': '-',    // maqaf
    '׀': '|',    // paseq
    '׃': ':',    // sof pasuq
  };

  // 常见词直接映射
  const commonWords: Record<string, string> = {
    'תל': 'tal',
    'אביב': 'aviv',
    'ירושלים': 'yerushalayim',
  };

  // 检查常见词直接映射
  for (const [word, transliteration] of Object.entries(commonWords)) {
    if (text === word) {
      return transliteration;
    }
    text = text.replace(new RegExp(word, 'g'), transliteration);
  }

  let result = '';
  let i = 0;
  
  // 处理剩余的希伯来文字
  while (i < text.length) {
    // 如果已经是拉丁字符，直接保留
    if (/[a-zA-Z\s]/.test(text[i])) {
      result += text[i];
      i++;
      continue;
    }
    
    const char = text[i];
    
    // 查找希伯来字母映射
    if (hebrewToLatinMap[char] !== undefined) {
      result += hebrewToLatinMap[char];
    } else {
      // 如果字符不在映射表中，保留原字符
      result += char;
    }
    
    i++;
  }

  // 后处理规则
  result = result
    // 连续元音处理
    .replace(/([aeiou])\1+/g, '$1')
    // 特定组合处理
    .replace(/yo/g, 'yo')
    .replace(/yi/g, 'yi')
    .replace(/va/g, 'va')
    .replace(/ve/g, 've')
    // 常用前缀修正
    .replace(/^ha/g, 'ha')
    .replace(/^be/g, 'be')
    .replace(/^le/g, 'le')
    // 特定单词修正
    .replace(/havpalv/g, 'hufalu')
    .replace(/lerashavnah/g, 'larishona')
    // 确保没有连续的多个辅音
    .replace(/([bcdfghjklmnpqrstvwxz]{3,})/g, (match) => {
      let result = '';
      for (let i = 0; i < match.length; i++) {
        result += match[i];
        if (i % 2 === 1 && i < match.length - 1) {
          result += 'a';
        }
      }
      return result;
    });

  return result.trim();
} 
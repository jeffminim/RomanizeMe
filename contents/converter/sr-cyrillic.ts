export default function SrbCyrillic(text: string): string {
  // 塞尔维亚语西里尔字母到拉丁字母的映射表
  const cyrillicToLatinMap: Record<string, string> = {
    'А': 'A', 'а': 'a',
    'Б': 'B', 'б': 'b',
    'В': 'V', 'в': 'v',
    'Г': 'G', 'г': 'g',
    'Д': 'D', 'д': 'd',
    'Ђ': 'Đ', 'ђ': 'đ',
    'Е': 'E', 'е': 'e',
    'Ж': 'Ž', 'ж': 'ž',
    'З': 'Z', 'з': 'z',
    'И': 'I', 'и': 'i',
    'Ј': 'J', 'ј': 'j',
    'К': 'K', 'к': 'k',
    'Л': 'L', 'л': 'l',
    'Љ': 'Lj', 'љ': 'lj',
    'М': 'M', 'м': 'm',
    'Н': 'N', 'н': 'n',
    'Њ': 'Nj', 'њ': 'nj',
    'О': 'O', 'о': 'o',
    'П': 'P', 'п': 'p',
    'Р': 'R', 'р': 'r',
    'С': 'S', 'с': 's',
    'Т': 'T', 'т': 't',
    'Ћ': 'Ć', 'ћ': 'ć',
    'У': 'U', 'у': 'u',
    'Ф': 'F', 'ф': 'f',
    'Х': 'H', 'х': 'h',
    'Ц': 'C', 'ц': 'c',
    'Ч': 'Č', 'ч': 'č',
    'Џ': 'Dž', 'џ': 'dž',
    'Ш': 'Š', 'ш': 'š'
  };

  let result = '';
  
  // 逐个字符转换
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    // 如果字符在映射表中，则转换，否则保留原字符
    result += cyrillicToLatinMap[char] || char;
  }

  return result;
} 
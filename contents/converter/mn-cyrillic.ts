export default function MonCyrillic(text: string): string {
  // 蒙古语西里尔字母到拉丁字母的映射表
  const cyrillicToLatinMap: Record<string, string> = {
    'А': 'A', 'а': 'a',
    'Б': 'B', 'б': 'b',
    'В': 'V', 'в': 'v',
    'Г': 'G', 'г': 'g',
    'Д': 'D', 'д': 'd',
    'Е': 'Ye', 'е': 'ye',
    'Ё': 'Yo', 'ё': 'yo',
    'Ж': 'J', 'ж': 'j',
    'З': 'Z', 'з': 'z',
    'И': 'I', 'и': 'i',
    'Й': 'I', 'й': 'i',
    'К': 'K', 'к': 'k',
    'Л': 'L', 'л': 'l',
    'М': 'M', 'м': 'm',
    'Н': 'N', 'н': 'n',
    'О': 'O', 'о': 'o',
    'Ө': 'Ö', 'ө': 'ö',
    'П': 'P', 'п': 'p',
    'Р': 'R', 'р': 'r',
    'С': 'S', 'с': 's',
    'Т': 'T', 'т': 't',
    'У': 'U', 'у': 'u',
    'Ү': 'Ü', 'ү': 'ü',
    'Ф': 'F', 'ф': 'f',
    'Х': 'Kh', 'х': 'kh',
    'Ц': 'Ts', 'ц': 'ts',
    'Ч': 'Ch', 'ч': 'ch',
    'Ш': 'Sh', 'ш': 'sh',
    'Щ': 'Shch', 'щ': 'shch',
    'Ъ': '', 'ъ': '',  // 硬音符号不发音
    'Ы': 'Y', 'ы': 'y',
    'Ь': '', 'ь': '',  // 软音符号不发音
    'Э': 'E', 'э': 'e',
    'Ю': 'Yu', 'ю': 'yu',
    'Я': 'Ya', 'я': 'ya'
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
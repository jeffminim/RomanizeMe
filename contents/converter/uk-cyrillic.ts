export default function UkrCyrillic(text: string): string {
  // 乌克兰语西里尔字母到拉丁字母的映射表
  const cyrillicToLatinMap: Record<string, string> = {
    'А': 'A', 'а': 'a',
    'Б': 'B', 'б': 'b',
    'В': 'V', 'в': 'v',
    'Г': 'H', 'г': 'h',
    'Ґ': 'G', 'ґ': 'g',
    'Д': 'D', 'д': 'd',
    'Е': 'E', 'е': 'e',
    'Є': 'Ye', 'є': 'ye',
    'Ж': 'Zh', 'ж': 'zh',
    'З': 'Z', 'з': 'z',
    'И': 'Y', 'и': 'y',
    'І': 'I', 'і': 'i',
    'Ї': 'Yi', 'ї': 'yi',
    'Й': 'Y', 'й': 'y',
    'К': 'K', 'к': 'k',
    'Л': 'L', 'л': 'l',
    'М': 'M', 'м': 'm',
    'Н': 'N', 'н': 'n',
    'О': 'O', 'о': 'o',
    'П': 'P', 'п': 'p',
    'Р': 'R', 'р': 'r',
    'С': 'S', 'с': 's',
    'Т': 'T', 'т': 't',
    'У': 'U', 'у': 'u',
    'Ф': 'F', 'ф': 'f',
    'Х': 'Kh', 'х': 'kh',
    'Ц': 'Ts', 'ц': 'ts',
    'Ч': 'Ch', 'ч': 'ch',
    'Ш': 'Sh', 'ш': 'sh',
    'Щ': 'Shch', 'щ': 'shch',
    'Ю': 'Yu', 'ю': 'yu',
    'Я': 'Ya', 'я': 'ya',
    'Ь': '', 'ь': '',  // 软音符号不发音
    '\'': ''  // 撇号不发音
  };

  let result = '';
  
  // 逐个字符转换
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    // 如果字符在映射表中，则转换，否则保留原字符
    const latinChar = cyrillicToLatinMap[char];
    // 如果映射表中存在该字符且转换结果不为空，则添加到结果中
    if (latinChar !== undefined) {
      result += latinChar;
    } else if (!['ь', '\''].includes(char)) {
      // 如果不是软音符号或撇号，则保留原字符
      result += char;
    }
  }

  return result;
} 
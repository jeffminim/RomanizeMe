export default function GeoGeorgian(text: string): string {
  // 格鲁吉亚字母到拉丁字母的映射表（基于ISO 9984标准）
  const georgianToLatinMap: Record<string, string> = {
    // 基本字母
    'ა': 'a', 'ბ': 'b', 'გ': 'g', 'დ': 'd', 'ე': 'e',
    'ვ': 'v', 'ზ': 'z', 'თ': 't', 'ი': 'i', 'კ': 'k',
    'ლ': 'l', 'მ': 'm', 'ნ': 'n', 'ო': 'o', 'პ': 'p',
    'ჟ': 'zh', 'რ': 'r', 'ს': 's', 'ტ': 't', 'უ': 'u',
    'ფ': 'p', 'ქ': 'k', 'ღ': 'gh', 'ყ': 'q', 'შ': 'sh',
    'ჩ': 'ch', 'ც': 'ts', 'ძ': 'dz', 'წ': 'ts', 'ჭ': 'ch',
    'ხ': 'kh', 'ჯ': 'j', 'ჰ': 'h',

    // 大写字母
    'Ⴀ': 'A', 'Ⴁ': 'B', 'Ⴂ': 'G', 'Ⴃ': 'D', 'Ⴄ': 'E',
    'Ⴅ': 'V', 'Ⴆ': 'Z', 'Ⴇ': 'T', 'Ⴈ': 'I', 'Ⴉ': 'K',
    'Ⴊ': 'L', 'Ⴋ': 'M', 'Ⴌ': 'N', 'Ⴍ': 'O', 'Ⴎ': 'P',
    'Ⴏ': 'Zh', 'Ⴐ': 'R', 'Ⴑ': 'S', 'Ⴒ': 'T', 'Ⴓ': 'U',
    'Ⴔ': 'P', 'Ⴕ': 'K', 'Ⴖ': 'Gh', 'Ⴗ': 'Q', 'Ⴘ': 'Sh',
    'Ⴙ': 'Ch', 'Ⴚ': 'Ts', 'Ⴛ': 'Dz', 'Ⴜ': 'Ts', 'Ⴝ': 'Ch',
    'Ⴞ': 'Kh', 'Ⴟ': 'J', 'Ⴠ': 'H'
  };

  // 特殊组合处理
  const specialCombinations: Record<string, string> = {
    'გი': 'gi', 'ქი': 'ki', 'ღი': 'ghi', 'ყი': 'qi',
    'ში': 'shi', 'ჩი': 'chi', 'ხი': 'khi', 'ჯი': 'ji',
    'გე': 'ge', 'ქე': 'ke', 'ღე': 'ghe', 'ყე': 'qe',
    'შე': 'she', 'ჩე': 'che', 'ხე': 'khe', 'ჯე': 'je'
  };

  let result = '';
  let i = 0;

  while (i < text.length) {
    // 先检查双字母组合
    if (i + 1 < text.length) {
      const twoChars = text[i] + text[i + 1];
      if (specialCombinations[twoChars]) {
        result += specialCombinations[twoChars];
        i += 2;
        continue;
      }
    }

    // 处理单个字符
    const char = text[i];
    if (georgianToLatinMap[char]) {
      result += georgianToLatinMap[char];
    } else {
      // 如果不在映射表中，保留原字符
      result += char;
    }
    i++;
  }

  // 后处理规则
  result = result
    // 处理重复辅音
    .replace(/([bcdfghjklmnpqrstvwxz])\1+/g, '$1')
    // 处理词尾的h
    .replace(/h$/g, '')
    // 标准化空格
    .replace(/\s+/g, ' ');

  return result;
} 
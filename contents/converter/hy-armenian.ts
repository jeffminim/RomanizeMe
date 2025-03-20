export default function ArmArmenian(text: string): string {
  // 亚美尼亚字母到拉丁字母的映射表（基于ISO 9985标准）
  const armenianToLatinMap: Record<string, string> = {
    // 大写字母
    'Ա': 'A', 'Բ': 'B', 'Գ': 'G', 'Դ': 'D', 'Ե': 'E',
    'Զ': 'Z', 'Է': 'E', 'Ը': 'Ë', 'Թ': 'T', 'Ժ': 'Zh',
    'Ի': 'I', 'Լ': 'L', 'Խ': 'Kh', 'Ծ': 'Ts', 'Կ': 'K',
    'Հ': 'H', 'Ձ': 'Dz', 'Ղ': 'Gh', 'Ճ': 'Ch', 'Մ': 'M',
    'Յ': 'Y', 'Ն': 'N', 'Շ': 'Sh', 'Ո': 'O', 'Չ': 'Ch',
    'Պ': 'P', 'Ջ': 'J', 'Ռ': 'R', 'Ս': 'S', 'Վ': 'V',
    'Տ': 'T', 'Ր': 'R', 'Ց': 'Ts', 'Ւ': 'W', 'Փ': 'P',
    'Ք': 'K', 'Օ': 'O', 'Ֆ': 'F',

    // 小写字母
    'ա': 'a', 'բ': 'b', 'գ': 'g', 'դ': 'd', 'ե': 'e',
    'զ': 'z', 'է': 'e', 'ը': 'ë', 'թ': 't', 'ժ': 'zh',
    'ի': 'i', 'լ': 'l', 'խ': 'kh', 'ծ': 'ts', 'կ': 'k',
    'հ': 'h', 'ձ': 'dz', 'ղ': 'gh', 'ճ': 'ch', 'մ': 'm',
    'յ': 'y', 'ն': 'n', 'շ': 'sh', 'ո': 'o', 'չ': 'ch',
    'պ': 'p', 'ջ': 'j', 'ռ': 'r', 'ս': 's', 'վ': 'v',
    'տ': 't', 'ր': 'r', 'ց': 'ts', 'ւ': 'w', 'փ': 'p',
    'ք': 'k', 'օ': 'o', 'ֆ': 'f'
  };

  // 特殊组合处理
  const specialCombinations: Record<string, string> = {
    'և': 'ev',  // 连字
    'ու': 'u',  // u 音
    'յա': 'ya', // ya 音
    'յո': 'yo', // yo 音
    'յու': 'yu' // yu 音
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
    if (armenianToLatinMap[char]) {
      result += armenianToLatinMap[char];
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
// 定义韩文字母表类型
type KoreanAlphabet = {
  vowels: string[];
  consonants: {
    initial: string[];
    final: string[];
  };
};

// 韩文字母表定义
const alphabetKorean: KoreanAlphabet = {
  vowels: [
    'a',   // ㅏ
    'ae',  // ㅐ
    'ya',  // ㅑ
    'yae', // ㅒ
    'eo',  // ㅓ
    'e',   // ㅔ
    'yeo', // ㅕ
    'ye',  // ㅖ
    'o',   // ㅗ
    'wa',  // ㅘ
    'wae', // ㅙ
    'oe',  // ㅚ
    'yo',  // ㅛ
    'u',   // ㅜ
    'wo',  // ㅝ
    'we',  // ㅞ
    'wi',  // ㅟ
    'yu',  // ㅠ
    'eu',  // ㅡ
    'ui',  // ㅢ
    'i'    // ㅣ
  ],
  consonants: {
    initial: [
      'g',  // ㄱ
      'kk', // ㄲ
      'n',  // ㄴ
      'd',  // ㄷ
      'tt', // ㄸ
      'r',  // ㄹ
      'm',  // ㅁ
      'b',  // ㅂ
      'pp', // ㅃ
      's',  // ㅅ
      'ss', // ㅆ
      '',   // ㅇ
      'j',  // ㅈ
      'jj', // ㅉ
      'ch', // ㅊ
      'k',  // ㅋ
      't',  // ㅌ
      'p',  // ㅍ
      'h'   // ㅎ
    ],
    final: [
      '',    // 没有终声
      'k',   // ㄱ
      'k',   // ㄲ
      'k',   // ㄳ
      'n',   // ㄴ
      'n',   // ㄵ
      'n',   // ㄶ
      't',   // ㄷ
      'l',   // ㄹ
      'k',   // ㄺ
      'm',   // ㄻ
      'p',   // ㄼ
      't',   // ㄽ
      't',   // ㄾ
      'p',   // ㄿ
      'l',   // ㅀ
      'm',   // ㅁ
      'p',   // ㅂ
      'p',   // ㅄ
      't',   // ㅅ
      't',   // ㅆ
      'ng',  // ㅇ
      't',   // ㅈ
      't',   // ㅊ
      'k',   // ㅋ
      't',   // ㅌ
      'p',   // ㅍ
      'h'    // ㅎ
    ]
  }
};

// 韩文罗马音转换函数
function getKoreanRomanization(text: string): string {
  let result = '';
  let currentSyllable = '';
  let isFirstSyllable = true;

  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i);

    if (charCode >= 0xAC00 && charCode <= 0xD7A3) {
      // 处理韩文音节
      const syllableIndex = charCode - 0xAC00;
      const initialIndex = Math.floor(syllableIndex / 588);
      const vowelIndex = Math.floor((syllableIndex % 588) / 28);
      const finalIndex = syllableIndex % 28;

      currentSyllable = '';
      
      // 添加初声（声母）
      currentSyllable += alphabetKorean.consonants.initial[initialIndex];
      
      // 添加中声（元音）
      currentSyllable += alphabetKorean.vowels[vowelIndex];
      
      // 添加终声（韵母），如果有的话
      if (finalIndex > 0) {
        currentSyllable += alphabetKorean.consonants.final[finalIndex];
      }

      // 处理连音规则
      if (!isFirstSyllable) {
        if (result.endsWith('k') || result.endsWith('t') || result.endsWith('p')) {
          const lastChar = result.charAt(result.length - 1);
          if (currentSyllable.startsWith('i') || currentSyllable.startsWith('y')) {
            const changes: Record<string, string> = { 'k': 'g', 't': 'd', 'p': 'b' };
            result = result.slice(0, -1) + changes[lastChar];
          }
        }
      }
      
      result += currentSyllable;
      isFirstSyllable = false;
    } else {
      result += text[i];
      isFirstSyllable = true;
    }
  }

  // 应用后处理规则
  result = result
    .replace(/n(g|k)/g, 'ng')
    .replace(/l(g|k)/g, 'lg')
    .replace(/l(m|b)/g, 'lm')
    .replace(/l(s|t)/g, 'lt')
    .replace(/ls/g, 'ss')
    .replace(/lt/g, 'll')
    .replace(/wi/g, 'ui')
    .replace(/wo/g, 'wo')
    .replace(/kk/g, 'k')
    .replace(/tt/g, 't')
    .replace(/pp/g, 'p')
    .replace(/ss/g, 's');

  return result;
}

export default function KorHangul(text: string): string {
  return getKoreanRomanization(text);
}

var alphabetKorean = {
  vowels: [
    'a',   // ㅏ
    'ae',  // ㅐ
    'ya',  // ㅑ
    'yee', // ㅒ
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
      '',
      'k',  // ㄱ
      'k',  // ㄲ
      'kt', // ㄳ
      'n',  // ㄴ
      'nt', // ㄵ
      'nh', // ㄶ
      't',  // ㄷ
      'l',  // ㄹ
      'lk', // ㄺ
      'lm', // ㄻ
      'lp', // ㄼ
      'lt', // ㄽ
      'lt', // ㄾ
      'lp', // ㄿ
      'lh', // ㅀ
      'm',  // ㅁ
      'p',  // ㅂ
      'pt', // ㅄ
      't',  // ㅅ
      'tt', // ㅆ
      'ng', // ㅇ
      't',  // ㅈ
      't',  // ㅊ
      'k',  // ㅋ
      't',  // ㅌ
      'p',  // ㅍ
      'h'   // ㅎ
    ]
  }
};

function romanizeKorean(text) {
  let result = '';
  let currentSyllable = '';

  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i);

    if (charCode >= 0xAC00 && charCode <= 0xD7A3) {
      const syllableIndex = charCode - 0xAC00;
      const initialIndex = Math.floor(syllableIndex / 588);
      const vowelIndex = Math.floor((syllableIndex % 588) / 28);
      const finalIndex = syllableIndex % 28;

      currentSyllable += alphabetKorean.consonants.initial[initialIndex];
      currentSyllable += alphabetKorean.vowels[vowelIndex];
      currentSyllable += alphabetKorean.consonants.final[finalIndex];

      result += currentSyllable;
      currentSyllable = '';
    } else {
      result += text[i];
    }
  }

  return result;
}
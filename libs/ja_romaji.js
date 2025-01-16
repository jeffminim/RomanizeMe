/**
 * 日语假名转罗马音转换函数
 * @param {string} text - 需要转换的假名文本
 * @returns {string} - 转换后的罗马音文本
 */
function getJapaneseRomanization(text) {
    // 平假名到罗马音的映射表
    const hiraganaMap = {
      'あ': 'a', 'い': 'i', 'う': 'u', 'え': 'e', 'お': 'o',
      'か': 'ka', 'き': 'ki', 'く': 'ku', 'け': 'ke', 'こ': 'ko',
      'さ': 'sa', 'し': 'shi', 'す': 'su', 'せ': 'se', 'そ': 'so',
      'た': 'ta', 'ち': 'chi', 'つ': 'tsu', 'て': 'te', 'と': 'to',
      'な': 'na', 'に': 'ni', 'ぬ': 'nu', 'ね': 'ne', 'の': 'no',
      'は': 'ha', 'ひ': 'hi', 'ふ': 'fu', 'へ': 'he', 'ほ': 'ho',
      'ま': 'ma', 'み': 'mi', 'む': 'mu', 'め': 'me', 'も': 'mo',
      'や': 'ya', 'ゆ': 'yu', 'よ': 'yo',
      'ら': 'ra', 'り': 'ri', 'る': 'ru', 'れ': 're', 'ろ': 'ro',
      'わ': 'wa', 'を': 'wo', 'ん': 'n',
      'が': 'ga', 'ぎ': 'gi', 'ぐ': 'gu', 'げ': 'ge', 'ご': 'go',
      'ざ': 'za', 'じ': 'ji', 'ず': 'zu', 'ぜ': 'ze', 'ぞ': 'zo',
      'だ': 'da', 'ぢ': 'ji', 'づ': 'zu', 'で': 'de', 'ど': 'do',
      'ば': 'ba', 'び': 'bi', 'ぶ': 'bu', 'べ': 'be', 'ぼ': 'bo',
      'ぱ': 'pa', 'ぴ': 'pi', 'ぷ': 'pu', 'ぺ': 'pe', 'ぽ': 'po',
      // 拗音-清音
      'きゃ': 'kya', 'きゅ': 'kyu', 'きょ': 'kyo',
      'しゃ': 'sha', 'しゅ': 'shu', 'しょ': 'sho',
      'ちゃ': 'cha', 'ちゅ': 'chu', 'ちょ': 'cho',
      'にゃ': 'nya', 'にゅ': 'nyu', 'にょ': 'nyo',
      'ひゃ': 'hya', 'ひゅ': 'hyu', 'ひょ': 'hyo',
      'みゃ': 'mya', 'みゅ': 'myu', 'みょ': 'myo',
      'りゃ': 'rya', 'りゅ': 'ryu', 'りょ': 'ryo',
      // 拗音-浊音
      'ぎゃ': 'gya', 'ぎゅ': 'gyu', 'ぎょ': 'gyo',
      'じゃ': 'ja',  'じゅ': 'ju',  'じょ': 'jo',
      'ぢゃ': 'ja',  'ぢゅ': 'ju',  'ぢょ': 'jo',
      'びゃ': 'bya', 'びゅ': 'byu', 'びょ': 'byo',
      // 拗音-半浊音
      'ぴゃ': 'pya', 'ぴゅ': 'pyu', 'ぴょ': 'pyo',
      // 合拗音
      'くゎ': 'kwa', 'ぐゎ': 'gwa'
    };

    // 片假名到罗马音的映射表
    const katakanaMap = {
      'ア': 'a', 'イ': 'i', 'ウ': 'u', 'エ': 'e', 'オ': 'o',
      'カ': 'ka', 'キ': 'ki', 'ク': 'ku', 'ケ': 'ke', 'コ': 'ko',
      'サ': 'sa', 'シ': 'shi', 'ス': 'su', 'セ': 'se', 'ソ': 'so',
      'タ': 'ta', 'チ': 'chi', 'ツ': 'tsu', 'テ': 'te', 'ト': 'to',
      'ナ': 'na', 'ニ': 'ni', 'ヌ': 'nu', 'ネ': 'ne', 'ノ': 'no',
      'ハ': 'ha', 'ヒ': 'hi', 'フ': 'fu', 'ヘ': 'he', 'ホ': 'ho',
      'マ': 'ma', 'ミ': 'mi', 'ム': 'mu', 'メ': 'me', 'モ': 'mo',
      'ヤ': 'ya', 'ユ': 'yu', 'ヨ': 'yo',
      'ラ': 'ra', 'リ': 'ri', 'ル': 'ru', 'レ': 're', 'ロ': 'ro',
      'ワ': 'wa', 'ヲ': 'wo', 'ン': 'n',
      'ガ': 'ga', 'ギ': 'gi', 'グ': 'gu', 'ゲ': 'ge', 'ゴ': 'go',
      'ザ': 'za', 'ジ': 'ji', 'ズ': 'zu', 'ゼ': 'ze', 'ゾ': 'zo',
      'ダ': 'da', 'ヂ': 'ji', 'ヅ': 'zu', 'デ': 'de', 'ド': 'do',
      'バ': 'ba', 'ビ': 'bi', 'ブ': 'bu', 'ベ': 'be', 'ボ': 'bo',
      'パ': 'pa', 'ピ': 'pi', 'プ': 'pu', 'ペ': 'pe', 'ポ': 'po',
      // 拗音-清音
      'キャ': 'kya', 'キュ': 'kyu', 'キョ': 'kyo',
      'シャ': 'sha', 'シュ': 'shu', 'ショ': 'sho',
      'チャ': 'cha', 'チュ': 'chu', 'チョ': 'cho',
      'ニャ': 'nya', 'ニュ': 'nyu', 'ニョ': 'nyo',
      'ヒャ': 'hya', 'ヒュ': 'hyu', 'ヒョ': 'hyo',
      'ミャ': 'mya', 'ミュ': 'myu', 'ミョ': 'myo',
      'リャ': 'rya', 'リュ': 'ryu', 'リョ': 'ryo',
      // 拗音-浊音
      'ギャ': 'gya', 'ギュ': 'gyu', 'ギョ': 'gyo',
      'ジャ': 'ja',  'ジュ': 'ju',  'ジョ': 'jo',
      'ヂャ': 'ja',  'ヂュ': 'ju',  'ヂョ': 'jo',
      'ビャ': 'bya', 'ビュ': 'byu', 'ビョ': 'byo',
      // 拗音-半浊音
      'ピャ': 'pya', 'ピュ': 'pyu', 'ピョ': 'pyo',
      // 合拗音
      'クヮ': 'kwa', 'グヮ': 'gwa'
    };

    let result = '';
    let i = 0;
    
    while (i < text.length) {
        // 先检查两个字符的组合
        if (i + 1 < text.length) {
            const twoChars = text[i] + text[i + 1];
            if (hiraganaMap[twoChars] || katakanaMap[twoChars]) {
                result += hiraganaMap[twoChars] || katakanaMap[twoChars];
                i += 2;
                continue;
            }
        }
        
        // 单字符处理
        const char = text[i];
        if (hiraganaMap[char]) {
            result += hiraganaMap[char];
        } else if (katakanaMap[char]) {
            result += katakanaMap[char];
        } else {
            result += char;
        }
        i++;
    }

    return result;
  };
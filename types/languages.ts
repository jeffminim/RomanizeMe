import { TextSegmentation } from './text-segmentation'

// 文字种类 Script 接口
export interface Script {
  code: string // 文字代码，如 'hiragana', 'mandarin'
  i18n: Record<string, string> // 多语言名称
  isoCode: string // ISO 639 标准代码
  unicodeRanges: Array<[number, number]> // Unicode 范围，支持多组
  segmentation: TextSegmentation // 文本分割方式
}

// 语言种类 Language 接口
export interface Language {
  code: string // 语言代码，如 'zh', 'en'
  i18n: Record<string, string> // 多语言名称
  writtenScript: Script[]
  romanizationComponent: string // 对应的罗马音转换组件
}

// 文字分组 Group 接口
export interface Group {
  name: string // 分组名称
  order: number // 排序
  enabled: boolean // 是否启用
  languages: Language[] // 包含的文字种类
  i18n: Record<string, string> // 多语言名称
}

/////////////////////////////////////
// Configs

//////


// List of Scripts
export const scriptPanelScripts: Script[] = [
  {
    code: 'hanzi',
    i18n: {
      zh_cn: '汉字',
      en: 'Chinese Characters',
      ja: '漢字',
      ko: '한자',
      fr: 'Caractères chinois',
      ru: 'Китайские иероглифы'
    },
    isoCode: 'zh',
    unicodeRanges: [
      [0x4E00, 0x9FFF],    // 基本汉字
      [0x3400, 0x4DBF],   // 扩展A
      [0x20000, 0x2A6DF], // 扩展B
      [0x2A700, 0x2B73F], // 扩展C
      [0x2B740, 0x2B81F], // 扩展D
      [0x2B820, 0x2CEAF], // 扩展E
      [0xF900, 0xFAFF]    // 兼容汉字
    ], // 常用汉字范围
    segmentation: TextSegmentation.CHN
  },
  {
    code: 'kana',
    i18n: {
      zh_cn: '假名',
      en: 'Japanese Kana',
      ja: '仮名',
      ko: '가나',
      fr: 'Kana japonais',
      ru: 'Японская кана'
    },
    isoCode: 'ja',
    unicodeRanges: [
      [0x3040, 0x309F], // 平假名 (Hiragana)
      [0x30A0, 0x30FF], // 片假名 (Katakana)
      [0x31F0, 0x31FF], // 片假名扩展 (Katakana Phonetic Extensions)
      [0xFF65, 0xFF9F]  // 半角片假名 (Halfwidth Katakana)
    ], // 假名范围
    segmentation: TextSegmentation.JPN
  },
  {
    code: 'hangul',
    i18n: {
      zh_cn: '谚文',
      en: 'Hangul',
      ja: 'ハングル',
      ko: '한글',
      fr: 'Hangul',
      ru: 'Хангыль'
    },
    isoCode: 'ko',
    unicodeRanges: [
      [0xAC00, 0xD7AF], // 现代韩文音节 (Modern Hangul Syllables)
      [0x1100, 0x11FF], // 韩文字母 (Hangul Jamo)
      [0x3130, 0x318F]  // 韩文兼容字母 (Hangul Compatibility Jamo)
    ],
    segmentation: TextSegmentation.WORD
  },
  {
    code: 'cyrillic',
    i18n: {
      zh_cn: '西里尔字母',
      en: 'Cyrillic',
      ja: 'キリル文字',
      ko: '키릴 문자',
      fr: 'Cyrillique',
      ru: 'Кириллица'
    },
    isoCode: 'ru',
    unicodeRanges: [
      [0x0400, 0x04FF],    // 基本西里尔字母
      [0x0500, 0x052F],   // 西里尔字母补充
      [0x2DE0, 0x2DFF],  // 西里尔字母扩展A
      [0xA640, 0xA69F]   // 西里尔字母扩展B
    ],
    segmentation: TextSegmentation.WORD
  },
  {
    code: 'thai',
    i18n: {
      zh_cn: '泰文字母',
      en: 'Thai Script',
      ja: 'タイ文字',
      ko: '태국 문자',
      fr: 'Alphabet thaï',
      ru: 'Тайский алфавит'
    },
    isoCode: 'th',
    unicodeRanges: [
      [0x0E00, 0x0E7F] // 泰文字母范围
    ],
    segmentation: TextSegmentation.THA
  },
  {
    code: 'vietnamese',
    i18n: {
      zh_cn: '越南语字母',
      en: 'Vietnamese Script',
      ja: 'ベトナム語文字',
      ko: '베트남어 문자',
      fr: 'Alphabet vietnamien',
      ru: 'Вьетнамский алфавит'
    },
    isoCode: 'vi',
    unicodeRanges: [
      [0x0020, 0x007E], // 基本拉丁字母
      [0x00C0, 0x1EF9], // 带声调的越南语字母
      [0x1EA0, 0x1EFF]  // 扩展的越南语字母
    ],
    segmentation: TextSegmentation.WORD
  },
  {
    code: 'khmer',
    i18n: {
      zh_cn: '高棉字母',
      en: 'Khmer Script',
      ja: 'クメール文字',
      ko: '크메르 문자',
      fr: 'Alphabet khmer',
      ru: 'Кхмерский алфавит'
    },
    isoCode: 'km',
    unicodeRanges: [
      [0x1780, 0x17FF], // 高棉字母范围
      [0x19E0, 0x19FF]  // 高棉符号范围
    ],
    segmentation: TextSegmentation.KHM
  },
  {
    code: 'myanmar',
    i18n: {
      zh_cn: '缅文',
      en: 'Myanmar Script',
      ja: 'ミャンマー文字',
      ko: '미얀마 문자',
      fr: 'Alphabet birman',
      ru: 'Мьянманский алфавит'
    },
    isoCode: 'my',
    unicodeRanges: [
      [0x1000, 0x109F], // 缅文范围
      [0xAA60, 0xAA7F]  // 缅文扩展
    ],
    segmentation: TextSegmentation.MYA
  },
  {
    code: 'lao',
    i18n: {
      zh_cn: '老挝文',
      en: 'Lao Script',
      ja: 'ラオス文字',
      ko: '라오스 문자',
      fr: 'Alphabet lao',
      ru: 'Лаосский алфавит'
    },
    isoCode: 'lo',
    unicodeRanges: [
      [0x0E80, 0x0EFF] // 老挝文范围
    ],
    segmentation: TextSegmentation.LAO
  },
  {
    code: 'arabic',
    i18n: {
      zh_cn: '阿拉伯文',
      en: 'Arabic Script',
      ja: 'アラビア文字',
      ko: '아랍 문자',
      fr: 'Écriture arabe',
      ru: 'Арабское письмо'
    },
    isoCode: 'ar',
    unicodeRanges: [
      [0x0600, 0x06FF],    // 基本阿拉伯文
      [0x0750, 0x077F],   // 阿拉伯文扩展A
      [0x08A0, 0x08FF],   // 阿拉伯文扩展B
      [0xFB50, 0xFDFF],   // 阿拉伯文表现形式A
      [0xFE70, 0xFEFF],   // 阿拉伯文表现形式B
      [0x0670, 0x067F],   // 阿拉伯文字母扩展（包含波斯语、乌尔都语特有字母）
      [0x0698, 0x0698],   // 波斯语字母 "ژ"
      [0x06A9, 0x06A9],   // 波斯语字母 "ک"
      [0x06AF, 0x06AF],   // 波斯语字母 "گ"
      [0x06CC, 0x06CC],   // 波斯语字母 "ی"
      [0x06D2, 0x06D2],   // 乌尔都语字母 "ے"
      [0x06BE, 0x06BE],   // 乌尔都语字母 "ھ"
      [0x06C1, 0x06C1],   // 乌尔都语字母 "ہ"
      [0x06C3, 0x06C3],   // 乌尔都语字母 "ۃ"
      [0x06D0, 0x06D0]    // 库尔德语字母 "ۋ"
    ],
    segmentation: TextSegmentation.WORD
  },
  {
    code: 'greek',
    i18n: {
      zh_cn: '希腊字母',
      en: 'Greek Alphabet',
      ja: 'ギリシャ文字',
      ko: '그리스 문자',
      fr: 'Alphabet grec',
      ru: 'Греческий алфавит'
    },
    isoCode: 'el',
    unicodeRanges: [
      [0x0370, 0x03FF], // 基本希腊字母
      [0x1F00, 0x1FFF]  // 扩展希腊字母
    ],
    segmentation: TextSegmentation.WORD
  },
  {
    code: 'hebrew',
    i18n: {
      zh_cn: '希伯来文',
      en: 'Hebrew Script',
      ja: 'ヘブライ文字',
      ko: '히브리 문자',
      fr: 'Écriture hébraïque',
      ru: 'Иврит'
    },
    isoCode: 'he',
    unicodeRanges: [
      [0x0590, 0x05FF], // 基本希伯来字母
      [0xFB1D, 0xFB4F]  // 希伯来字母表现形式
    ],
    segmentation: TextSegmentation.WORD
  },
  {
    code: 'tifinagh',
    i18n: {
      zh_cn: '柏柏尔语',
      en: 'Berber',
      ja: 'ベルベル語',
      ko: '베르베르어',
      fr: 'Berbère',
      ru: 'Берберский'
    },
    isoCode: 'ber',
    unicodeRanges: [
      [0x2D30, 0x2D7F], // 柏柏尔字母范围
      [0x2D80, 0x2DDF], // 柏柏尔符号范围
      [0x2DE0, 0x2DFF], // 柏柏尔字母扩展A
      [0x2E00, 0x2E7F]  // 柏柏尔字母扩展B
    ],
    segmentation: TextSegmentation.WORD
  },
  {
    code: 'georgian',
    i18n: {
      zh_cn: '格鲁吉亚文',
      en: 'Georgian Script',
      ja: 'グルジア文字',
      ko: '조지아 문자',
      fr: 'Alphabet géorgien',
      ru: 'Грузинский алфавит'
    },
    isoCode: 'ka',
    unicodeRanges: [
      [0x10A0, 0x10FF] // 格鲁吉亚字母范围
    ],
    segmentation: TextSegmentation.WORD
  },
  {
    code: 'armenian',
    i18n: {
      zh_cn: '亚美尼亚文',
      en: 'Armenian Script',
      ja: 'アルメニア文字',
      ko: '아르메니아 문자',
      fr: 'Alphabet arménien',
      ru: 'Армянский алфавит'
    },
    isoCode: 'hy',
    unicodeRanges: [
      [0x0530, 0x058F] // 亚美尼亚字母范围
    ],
    segmentation: TextSegmentation.WORD
  }
]

//////
// List of Languages
export const scriptPanelLanguages: Language[] = [
  {
    code: 'chn_mandarin',
    i18n: {
      zh_cn: '汉语普通话',
      en: 'Mandarin Chinese',
      ja: '中国語（普通話）',
      ko: '중국어 (보통화)',
      fr: 'Chinois mandarin',
      ru: 'Китайский (путунхуа)'
    },
    writtenScript: scriptPanelScripts.filter(s => s.code === 'hanzi'),
    romanizationComponent: 'ChnPinyin'
  },
  {
    code: 'jpn_romaji',
    i18n: {
      zh_cn: '日语假名罗马音',
      en: 'Japanese Romaji',
      ja: '日本語ローマ字',
      ko: '일본어 로마자',
      fr: 'Romaji japonais',
      ru: 'Японский (ромадзи)'
    },
    writtenScript: scriptPanelScripts.filter(s => s.code === 'kana'),
    romanizationComponent: 'JpnRomaji'
  },
  {
    code: 'kor_hangul',
    i18n: {
      zh_cn: '韩语',
      en: 'Korean',
      ja: '韓国語',
      ko: '한국어',
      fr: 'Coréen',
      ru: 'Корейский'
    },
    writtenScript: scriptPanelScripts.filter(s => s.code === 'hangul'),
    romanizationComponent: 'KorHangul'
  },
  {
    code: 'rus_cyrillic',
    i18n: {
      zh_cn: '俄语',
      en: 'Russian',
      ja: 'ロシア語',
      ko: '러시아어',
      fr: 'Russe',
      ru: 'Русский'
    },
    writtenScript: scriptPanelScripts.filter(s => s.code === 'cyrillic'),
    romanizationComponent: 'RusCyrillic'
  },
  {
    code: 'ukr_cyrillic',
    i18n: {
      zh_cn: '乌克兰语',
      en: 'Ukrainian',
      ja: 'ウクライナ語',
      ko: '우크라이나어',
      fr: 'Ukrainien',
      ru: 'Украинский'
    },
    writtenScript: scriptPanelScripts.filter(s => s.code === 'cyrillic'),
    romanizationComponent: 'UkrCyrillic'
  },
  {
    code: 'mon_cyrillic',
    i18n: {
      zh_cn: '蒙古语',
      en: 'Mongolian',
      ja: 'モンゴル語',
      ko: '몽골어',
      fr: 'Mongol',
      ru: 'Монгольский'
    },
    writtenScript: scriptPanelScripts.filter(s => s.code === 'cyrillic'),
    romanizationComponent: 'MonCyrillic'
  },
  {
    code: 'srb_cyrillic',
    i18n: {
      zh_cn: '塞尔维亚语',
      en: 'Serbian',
      ja: 'セルビア語',
      ko: '세르비아어',
      fr: 'Serbe',
      ru: 'Сербский'
    },
    writtenScript: scriptPanelScripts.filter(s => s.code === 'cyrillic'),
    romanizationComponent: 'SrbCyrillic'
  },
  {
    code: 'tha_thai',
    i18n: {
      zh_cn: '泰语',
      en: 'Thai',
      ja: 'タイ語',
      ko: '태국어',
      fr: 'Thaï',
      ru: 'Тайский'
    },
    writtenScript: scriptPanelScripts.filter(s => s.code === 'thai'),
    romanizationComponent: 'ThaThai'
  },
  {
    code: 'vie_vietnamese',
    i18n: {
      zh_cn: '越南语',
      en: 'Vietnamese',
      ja: 'ベトナム語',
      ko: '베트남어',
      fr: 'Vietnamien',
      ru: 'Вьетнамский'
    },
    writtenScript: scriptPanelScripts.filter(s => s.code === 'vietnamese'),
    romanizationComponent: 'VieVietnamese'
  },
  {
    code: 'khm_khmer',
    i18n: {
      zh_cn: '柬埔寨语',
      en: 'Khmer',
      ja: 'クメール語',
      ko: '크메르어',
      fr: 'Khmer',
      ru: 'Кхмерский'
    },
    writtenScript: scriptPanelScripts.filter(s => s.code === 'khmer'),
    romanizationComponent: 'KhmKhmer'
  },
  {
    code: 'mya_myanmar',
    i18n: {
      zh_cn: '缅甸语',
      en: 'Myanmar',
      ja: 'ミャンマー語',
      ko: '미얀마어',
      fr: 'Birman',
      ru: 'Мьянманский'
    },
    writtenScript: scriptPanelScripts.filter(s => s.code === 'myanmar'),
    romanizationComponent: 'MyaMyanmar'
  },
  {
    code: 'lao_lao',
    i18n: {
      zh_cn: '老挝语',
      en: 'Lao',
      ja: 'ラオス語',
      ko: '라오스어',
      fr: 'Lao',
      ru: 'Лаосский'
    },
    writtenScript: scriptPanelScripts.filter(s => s.code === 'lao'),
    romanizationComponent: 'LaoLao'
  },
  {
    code: 'ara_arabic',
    i18n: {
      zh_cn: '阿拉伯语',
      en: 'Arabic',
      ja: 'アラビア語',
      ko: '아랍어',
      fr: 'Arabe',
      ru: 'Арабский'
    },
    writtenScript: scriptPanelScripts.filter(s => s.code === 'arabic'),
    romanizationComponent: 'AraArabic'
  },
  {
    code: 'per_arabic',
    i18n: {
      zh_cn: '波斯语',
      en: 'Persian',
      ja: 'ペルシア語',
      ko: '페르시아어',
      fr: 'Persan',
      ru: 'Персидский'
    },
    writtenScript: scriptPanelScripts.filter(s => s.code === 'arabic'),
    romanizationComponent: 'PerArabic'
  },
  {
    code: 'urd_arabic',
    i18n: {
      zh_cn: '乌尔都语',
      en: 'Urdu',
      ja: 'ウルドゥー語',
      ko: '우르두어',
      fr: 'Ourdou',
      ru: 'Урду'
    },
    writtenScript: scriptPanelScripts.filter(s => s.code === 'arabic'),
    romanizationComponent: 'UrdArabic'
  },
  {
    code: 'ell_greek',
    i18n: {
      zh_cn: '希腊语',
      en: 'Greek',
      ja: 'ギリシャ語',
      ko: '그리스어',
      fr: 'Grec',
      ru: 'Греческий'
    },
    writtenScript: scriptPanelScripts.filter(s => s.code === 'greek'),
    romanizationComponent: 'EllGreek'
  },
  {
    code: 'isr_hebrew',
    i18n: {
      zh_cn: '以色列语',
      en: 'Hebrew',
      ja: 'ヘブライ語',
      ko: '히브리어',
      fr: 'Hébreu',
      ru: 'Иврит'
    },
    writtenScript: scriptPanelScripts.filter(s => s.code === 'hebrew'),
    romanizationComponent: 'IsrHebrew'
  },
  {
    code: 'ber_tifinagh',
    i18n: {
      zh_cn: '柏柏尔语',
      en: 'Berber',
      ja: 'ベルベル語',
      ko: '베르베르어',
      fr: 'Berbère',
      ru: 'Берберский'
    },
    writtenScript: scriptPanelScripts.filter(s => s.code === 'tifinagh'),
    romanizationComponent: 'BerTifinagh'
  },
  {
    code: 'geo_georgian',
    i18n: {
      zh_cn: '格鲁吉亚语',
      en: 'Georgian',
      ja: 'グルジア語',
      ko: '조지아어',
      fr: 'Géorgien',
      ru: 'Грузинский'
    },
    writtenScript: scriptPanelScripts.filter(s => s.code === 'georgian'),
    romanizationComponent: 'GeoGeorgian'
  },
  {
    code: 'arm_armenian',
    i18n: {
      zh_cn: '亚美尼亚语',
      en: 'Armenian',
      ja: 'アルメニア語',
      ko: '아르메니아어',
      fr: 'Arménien',
      ru: 'Армянский'
    },
    writtenScript: scriptPanelScripts.filter(s => s.code === 'armenian'),
    romanizationComponent: 'ArmArmenian'
  }
]

//////
// List of Groups
export const scriptPanelGroups: Group[] = [
  {
    name: 'chinese',
    order: 1,
    enabled: true,
    languages: scriptPanelLanguages.filter(s =>
      s.code === 'chn_mandarin'),
    i18n: {
      zh_cn: '中文',
      en: 'Chinese',
      ja: '中国語',
      ko: '중국어',
      fr: 'Chinois',
      ru: 'Китайский'
    }
  },
  {
    name: 'east_asian',
    order: 2,
    enabled: true,
    languages: scriptPanelLanguages.filter(s => 
      s.code === 'jpn_romaji' ||
      s.code === 'kor_hangul'
    ),
    i18n: {
      zh_cn: '东亚语言',
      en: 'East Asian',
      ja: '東アジア言語',
      ko: '동아시아 언어',
      fr: 'Langues est-asiatiques',
      ru: 'Восточноазиатские языки'
    }
  },
  {
    name: 'cyrillic',
    order: 3,
    enabled: true,
    languages: scriptPanelLanguages.filter(s => 
      s.code === 'rus_cyrillic' ||
      s.code === 'ukr_cyrillic' ||
      s.code === 'mon_cyrillic' ||
      s.code === 'srb_cyrillic'
    ),
    i18n: {
      zh_cn: '西里尔字母',
      en: 'Cyrillic',
      ja: 'キリル文字',
      ko: '키릴 문자',
      fr: 'Cyrillique',
      ru: 'Кириллица' 
    }
  },
  {
    name: 'southeast_asian',
    order: 4,
    enabled: true,
    languages: scriptPanelLanguages.filter(s => 
      s.code === 'tha_thai' ||
      s.code === 'khm_khmer' ||
      s.code === 'vie_vietnamese' ||
      s.code === 'mya_myanmar' ||
      s.code === 'lao_lao'
    ),
    i18n: {
      zh_cn: '东南亚语言',
      en: 'Southeast Asian',
      ja: '東南アジア言語',
      ko: '동남아시아 언어',
      fr: 'Langues d\'Asie du Sud-Est',
      ru: 'Юго-Восточная Азия'
    }
  },
  {
    name: 'arabic',
    order: 5,
    enabled: true,
    languages: scriptPanelLanguages.filter(s => 
      s.code === 'ara_arabic' ||
      s.code === 'per_arabic' ||
      s.code === 'urd_arabic' ||
      s.code === 'kur_arabic'
    ),
    i18n: {
      zh_cn: '阿拉伯字母',
      en: 'Arabic Script',
      ja: 'アラビア文字',
      ko: '아랍 문자',
      fr: 'Écriture arabe',
      ru: 'Арабское письмо'
    }
  },
  {
    name: 'mediterranean',
    order: 6,
    enabled: true,
    languages: scriptPanelLanguages.filter(s => 
      s.code === 'ell_greek' || // 希腊语
      s.code === 'isr_hebrew' ||   // 新增的以色列语
      s.code === 'ber_tifinagh'
    ),
    i18n: {
      zh_cn: '地中海地区',
      en: 'Mediterranean',
      ja: '地中海地域',
      ko: '지중해 지역',
      fr: 'Méditerranée',
      ru: 'Средиземноморье'
    }
  },
  {
    name: 'caucasus',
    order: 7,
    enabled: true,
    languages: scriptPanelLanguages.filter(s => 
      s.code === 'geo_georgian' ||
      s.code === 'arm_armenian'  // 新增亚美尼亚语
    ),
    i18n: {
      zh_cn: '高加索地区',
      en: 'Caucasus',
      ja: 'コーカサス地域',
      ko: '코카서스 지역',
      fr: 'Caucase',
      ru: 'Кавказ'
    }
  }
]

// 修改语言代码映射表，添加更灵活的正则匹配
export const languageCodeMapping: Record<string, string> = {
  // 中文
  zh: 'chn_mandarin',
  zh_cn: 'chn_mandarin',
  zh_hans: 'chn_mandarin',
  zh_hant: 'chn_mandarin',
  
  // 日语
  ja: 'jpn_romaji',
  jp: 'jpn_romaji',
  
  // 韩语
  ko: 'kor_hangul',
  kr: 'kor_hangul',
  
  // 俄语
  ru: 'rus_cyrillic',
  
  // 乌克兰语
  uk: 'ukr_cyrillic',
  
  // 蒙古语
  mn: 'mon_cyrillic',
  
  // 塞尔维亚语
  sr: 'srb_cyrillic',
  
  // 泰语
  th: 'tha_thai',
  
  // 越南语
  vi: 'vie_vietnamese',
  
  // 柬埔寨语
  km: 'khm_khmer',
  
  // 缅甸语
  my: 'mya_myanmar',
  
  // 老挝语
  lo: 'lao_lao',
  
  // 阿拉伯语
  ar: 'ara_arabic',
  
  // 波斯语
  per: 'per_arabic',
  fa: 'per_arabic',
  
  // 乌尔都语
  urd: 'urd_arabic',
  ur: 'urd_arabic',
  
  // 希腊语
  el: 'ell_greek',
  gr: 'ell_greek',
  
  // 希伯来语和以色列
  he: 'isr_hebrew',
  il: 'isr_hebrew',
  he_il: 'isr_hebrew',
  
  // 柏柏尔语
  ber: 'ber_tifinagh',
  tmh: 'ber_tifinagh',
  zgh: 'ber_tifinagh',
  
  // 格鲁吉亚语
  ka: 'geo_georgian',
  ge: 'geo_georgian',
  ka_ge: 'geo_georgian',
  // 亚美尼亚语
  hy: 'arm_armenian',
  am: 'arm_armenian',
  hy_am: 'arm_armenian'
};

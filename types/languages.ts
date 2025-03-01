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
      fr: 'Caractères chinois'
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
      fr: 'Kana japonais'
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
      fr: 'Hangul'
    },
    isoCode: 'ko',
    unicodeRanges: [
      [0xAC00, 0xD7AF], // 现代韩文音节 (Modern Hangul Syllables)
      [0x1100, 0x11FF], // 韩文字母 (Hangul Jamo)
      [0x3130, 0x318F]  // 韩文兼容字母 (Hangul Compatibility Jamo)
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
      fr: 'Chinois mandarin'
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
      fr: 'Romaji japonais'
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
      fr: 'Coréen'
    },
    writtenScript: scriptPanelScripts.filter(s => s.code === 'hangul'),
    romanizationComponent: 'KorHangul'
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
      fr: 'Chinois'
    }
  },
  {
    name: 'japanese',
    order: 2,
    enabled: true,
    languages: scriptPanelLanguages.filter(s => s.code === 'jpn_romaji'),
    i18n: {
      zh_cn: '日语',
      en: 'Japanese',
      ja: '日本語',
      ko: '일본어',
      fr: 'Japonais'
    }
  },
  {
    name: 'korean',
    order: 3,
    enabled: true,
    languages: scriptPanelLanguages.filter(s => s.code === 'kor_hangul'),
    i18n: {
      zh_cn: '韩语',
      en: 'Korean',
      ja: '韓国語',
      ko: '한국어',
      fr: 'Coréen'
    }
  }
] 

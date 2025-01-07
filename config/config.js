const config = {
  "scripts": [
    {
      "scriptId": "hanzi",
      "name": "汉字",
      "isEnabled": false,
      "unicodeRanges": [
        "4E00-9FFF",
        "3400-4DBF",
        "20000-2A6DF",
        "2A700-2B73F",
        "2B740-2B81F",
        "2B820-2CEAF",
        "F900-FAFF"
      ],
      "languages": [
        {
          "id": "chinese_mandarin",
          "name": "汉语普通话",
          "isAvailable": false,
          "libFile": "zh_hanzi.js",
          "functionName": "getChineseRomanization"
        },
        {
          "id": "japanese_kanji",
          "name": "日语汉字",
          "isAvailable": false,
          "libFile": "ja_kanji.js",
          "functionName": "getJapaneseKanjiRomanization"
        }
      ]
    },
    {
      "scriptId": "kana",
      "name": "假名",
      "isEnabled": true,
      "unicodeRanges": [
        "3040-309F",
        "30A0-30FF",
        "31F0-31FF",
        "FF65-FF9F"
      ],
      "languages": [
        {
          "id": "hiragana",
          "name": "平假名",
          "isAvailable": false,
          "libFile": "ja_hiragana.js",
          "functionName": "getHiraganaRomanization"
        },
        {
          "id": "katakana_romaji",
          "name": "片假名（罗马音）",
          "isAvailable": true,
          "libFile": "ja_katakana_romaji.js",
          "functionName": "getKatakanaRomaji"
        },
        {
          "id": "katakana_original",
          "name": "片假名（原文）",
          "isAvailable": false,
          "libFile": "ja_katakana_original.js",
          "functionName": "getKatakanaOriginal"
        }
      ]
    },
    {
      "scriptId": "hangul",
      "name": "谚文",
      "isEnabled": true,
      "unicodeRanges": [
        "AC00-D7AF",
        "1100-11FF",
        "3130-318F",
        "A960-A97F",
        "D7B0-D7FF"
      ],
      "languages": [
        {
          "id": "korean",
          "name": "韩语",
          "isAvailable": true,
          "libFile": "ko_hangul.js",
          "functionName": "getKoreanRomanization"
        }
      ]
    },
    {
      "scriptId": "cyrillic",
      "name": "西里尔字母",
      "isEnabled": false,
      "unicodeRanges": [
        "0400-04FF",
        "0500-052F",
        "2DE0-2DFF",
        "A640-A69F",
        "1C80-1C8F"
      ],
      "languages": [
        {
          "id": "russian",
          "name": "俄语",
          "disabled": false,
          "libFile": "ru_cyrillic.js",
          "functionName": "getRussianRomanization"
        },
        {
          "id": "ukrainian",
          "name": "乌克兰语",
          "disabled": false,
          "libFile": "uk_cyrillic.js",
          "functionName": "getUkrainianRomanization"
        }
      ]
    },
    {
      "scriptId": "greek",
      "name": "希腊字母",
      "isEnabled": false,
      "unicodeRanges": [
        "0370-03FF",
        "1F00-1FFF"
      ],
      "languages": [
        {
          "id": "modern_greek",
          "name": "现代希腊语",
          "disabled": false,
          "libFile": "el_modern.js",
          "functionName": "getModernGreekRomanization"
        },
        {
          "id": "ancient_greek",
          "name": "古希腊语",
          "disabled": false,
          "libFile": "el_ancient.js",
          "functionName": "getAncientGreekRomanization"
        }
      ]
    },
    {
      "scriptId": "arabic",
      "name": "阿拉伯字母",
      "isEnabled": false,
      "unicodeRanges": [
        "0600-06FF",
        "0750-077F",
        "08A0-08FF",
        "FB50-FDFF",
        "FE70-FEFF"
      ],
      "languages": [
        {
          "id": "arabic",
          "name": "阿拉伯语",
          "disabled": false,
          "libFile": "ar_arabic.js",
          "functionName": "getArabicRomanization"
        }
      ]
    },
    {
      "scriptId": "hebrew",
      "name": "希伯来字母",
      "isEnabled": false,
      "unicodeRanges": [
        "0590-05FF",
        "FB1D-FB4F"
      ],
      "languages": [
        {
          "id": "hebrew",
          "name": "希伯来语",
          "disabled": false,
          "libFile": "he_hebrew.js",
          "functionName": "getHebrewRomanization"
        }
      ]
    },
    {
      "scriptId": "mongolian",
      "name": "蒙古文字",
      "isEnabled": false,
      "unicodeRanges": [
        "1800-18AF",
        "11660-1167F"
      ],
      "languages": [
        {
          "id": "mongolian",
          "name": "蒙古语",
          "disabled": false,
          "libFile": "mn_mongolian.js",
          "functionName": "getMongolianRomanization"
        }
      ]
    }
  ]
}; 
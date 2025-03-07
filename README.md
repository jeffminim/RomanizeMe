<p align="center">
  <a href="https://github.com/jeffminim/RomanizeMe" rel="noopener">
 <img width=200px height=200px src="assets/romanizemelogo256.png" alt="RomanizeMe - Browser Extension Logo"></a>
  <br>
  <a href="Readme/README.zh.md">中文</a> | <a href="./README.md">English</a> | <a href="Readme/README.ja.md">日本語</a> | <a href="Readme/README.ko.md">한국어</a> | <a href="Readme/README.fr.md">Français</a>
</p>

<h3 align="center">RomanizeMe - Browser Extension for Romanizing Non-Latin Scripts</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)
[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/nmakcdfenoniomkbnnmpommgnaondfhk
)](https://chromewebstore.google.com/detail/romanizeme/nmakcdfenoniomkbnnmpommgnaondfhk)
[![Edge Add-ons](https://img.shields.io/badge/Edge_Store-RomanizeMe-blue)](https://microsoftedge.microsoft.com/addons/detail/fdeofmabkieoopbbehanpfjglmidjjai)
[![Version](https://img.shields.io/badge/version-2.0.4-blue.svg)](https://github.com/jeffminim/RomanizeMe/releases/tag/v2.0.4)

</div>

---

<p align="center"> A browser extension designed for language enthusiasts, providing romanization for non-Latin scripts.
    <br> 
</p>

## 📝 Table of Contents

- [📝 Table of Contents](#-table-of-contents)
- [🧐 About ](#-about-)
- [🏁 Getting Started ](#-getting-started-)
  - [🔧 Installation](#-installation)
  - [🖱️ Usage](#️-usage)
- [📅 Version History ](#-version-history-)
- [📅 Development Roadmap ](#-development-roadmap-)
  - [🌍 Supported Scripts/Languages ](#-supported-scriptslanguages-)
  - [✅ TODO List](#-todo-list)
- [❓ FAQ ](#-faq-)
- [🤝 Contributing ](#-contributing-)
- [🙏 Acknowledgments ](#-acknowledgments-)
- [📜 License ](#-license-)

## 🧐 About <a name = "about"></a>

This is a browser extension designed for language learners with the following main features:

- Romanize pronunciation of non-Latin scripts
- Extensible language support architecture
- Simple and easy-to-use interface

## 🏁 Getting Started <a name = "getting-started"></a>

### 🔧 Installation

- [Chrome](https://chromewebstore.google.com/detail/romanizeme/nmakcdfenoniomkbnnmpommgnaondfhk)

- [Edge](https://microsoftedge.microsoft.com/addons/detail/fdeofmabkieoopbbehanpfjglmidjjai)

- ~~Firefox~~ (Not yet supported. Researching adaptation for Firefox.)

### 🖱️ Usage

1. Open any web page containing non-Latin scripts
2. Click the extension icon in the browser toolbar
3. Select the script/language you want to romanize
4. Click "Romanize"
5. Hover over characters to see their pronunciation

## 📅 Version History <a name = "version-history"></a>

- 1.0.0 (2025-01-08)
  - Initial release with basic functionality
  - Support for Korean (Hangul)

- 1.1.0 (2025-01-16)
  - Added support for Japanese (Kana-Romaji)

- 1.2.0 (2025-01-17)
  - UI improvements and i18n support (now supports Chinese, English, Japanese, Korean)

- 1.2.1 & 1.2.2 (2025-01-23)
  - Added French language support for i18n

- 1.3.0 & 1.3.1 (2025-02-05)
  - Added support for Mandarin Chinese (Pinyin)
  - Optimized display effect when overflowing

- 2.0.0 (2025-2-22)
  - Refactored the entire program with React+Plasmo, optimized the running logic
  - Added Toast notifications (when conversion and restoration are completed)
  - Optimized UI styling
  - 2.0.1
    - Adjusted some features according to different browsers
  - 2.0.2
    - Greatly optimized the conversion algorithm to avoid page freezing
    - Fixed UI display issue when resetting settings
  - 2.0.3
    - Met Chrome Web Store review requirements, fixed some bugs
  - 2.0.4
    - Optimized display style in case of overflowing

## 📅 Development Roadmap <a name = "development-roadmap"></a>

### 🌍 Supported Scripts/Languages <a name = "supported-languages"></a>

- [x] Chinese Characters
  - [x] Mandarin Chinese (Supported in v1.3.0)
  - [ ] Cantonese
  - [ ] Other dialects...
- [x] Hangul (Korean)
- [x] Japanese
  - [x] Kana (Romaji)
  - [ ] Kanji
  - [ ] Katakana (Original language, e.g., English)
- [ ] Cyrillic
  - [ ] Russian
  - [ ] Ukrainian
  - [ ] Other languages...
- [ ] Arabic
  - [ ] Arabic
  - [ ] Other languages...
- [ ] Tibetan
- [ ] Other scripts/languages...

### ✅ TODO List

- [ ] Add shortcut key support
- [ ] Add feature guide and sample page
- [x] Add i18n support
- [x] Add Toast notifications
- [x] Develop settings page
- [ ] Implement annotation style customization
- [ ] Add pronunciation audio support
- [ ] Add more language support

## ❓ FAQ <a name = "faq"></a>

**Q: Which browsers are supported?**
A: Currently supports Chrome and all Chromium-based browsers (e.g. Edge, etc.)

**Q: How to update the extension?**
A: Just download the latest version and reload.

**Q: Does the extension collect user data?**
A: No. In fact, the extension itself does not need to collect any user data.

## 🤝 Contributing <a name = "contributing"></a>

Welcome to contribute to the RomanizeMe project! If you have any questions, suggestions or code contributions, please follow these steps:

1. Submit an Issue on GitHub describing your problem or suggestion.
2. Fork the project repository and make changes in your local environment.
3. Submit a Pull Request with a detailed description of your changes.

## 🙏 Acknowledgments <a name = "acknowledgments"></a>

Special thanks to the [Pinyin-Pro](https://pinyin-pro.cn/) project, a professional JavaScript library for converting Chinese to pinyin, featuring accurate polyphonic recognition, lightweight, high performance, and rich functionality. Pinyin-Pro is free software that can be used and redistributed under the MIT License.

## 📜 License <a name = "license"></a>

RomanizeMe is distributed under the [MIT License](/LICENSE).

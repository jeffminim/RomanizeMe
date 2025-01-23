<p align="center">
  <a href="https://github.com/jeffminim/RomanizeMe" rel="noopener">
 <img width=200px height=200px src="assets/romanizemelogo256.png" alt="RomanizeMe - Browser Extension Logo"></a>
 <br>
 <a href="./README.zh.md">中文</a> | <a href="./README.md">English</a> | <a href="./README.ja.md">日本語</a> | <a href="./README.ko.md">한국어</a> | <a href="./README.fr.md">Français</a>
</p>

<h3 align="center">RomanizeMe - Browser Extension for Romanizing Non-Latin Scripts</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)
[![Chrome Web Store](https://img.shields.io/badge/chrome-web--store-coming_soon-blue.svg)]()
[![Edge Add-ons](https://img.shields.io/badge/Edge_Store-RomanizeMe-blue)](https://microsoftedge.microsoft.com/addons/detail/fdeofmabkieoopbbehanpfjglmidjjai)
[![Version](https://img.shields.io/badge/version-1.2.2-blue.svg)](https://github.com/jeffminim/RomanizeMe/releases/tag/v1.2.2)

</div>

---

<p align="center"> A browser extension for romanizing the pronunciation of non-Latin scripts.
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

This is a browser extension for language learners with the following main features:

- Romanize pronunciation of non-Latin scripts
- Extensible language support architecture
- Simple and easy-to-use interface

## 🏁 Getting Started <a name = "getting-started"></a>

### 🔧 Installation

- ~~Chrome~~ (Pending Google Chrome Web Store approval)

- ~~Edge~~ (Pending Microsoft Partner Center approval)

- ~~Firefox~~ (Not yet supported. Researching adaptation for Firefox.)

For now, you can manually download the installation package and drag & drop it into your browser to install.

### 🖱️ Usage

1. Open a web page containing non-Latin scripts
2. Click the extension icon in the browser toolbar
3. Select the script/language you want to romanize
4. Click "Romanize"
5. Hover over characters to see their pronunciation

## 📅 Version History <a name = "version-history"></a>

- 1.0.0 (2025-01-08)
  - Basic functionality implementation
  - Hangul (Korean) support

- 1.1.0 (2025-01-16)
  - Japanese Kana (Romaji) support

- 1.2.0 (2025-01-17)
  - UI optimization and i18n support (Chinese, English, Japanese, Korean)

- 1.2.1 & 1.2.2 (2025-01-23)
  - i18n support (French added)

## 📅 Development Roadmap <a name = "development-roadmap"></a>

### 🌍 Supported Scripts/Languages <a name = "supported-scriptslanguages"></a>

- [ ] Hanzi
  - [ ] Mandarin (planned for v1.3.0)
  - [ ] Cantonese
  - [ ] Other dialects...
- [X] Hangul
- [x] Japanese
  - [x] Kana (Romaji)
  - [ ] Kanji
  - [ ] Katakana (original language, e.g. English)
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

- [ ] Shortcut key support
- [x] i18n support
- [ ] Settings page development
- [ ] Annotation style customization
- [ ] Pronunciation audio support
- [ ] Support for more languages
- [ ] Adaptation for major browsers

## ❓ FAQ <a name = "faq"></a>

**Q: Which browsers are supported?**
A: Currently Chrome and Chromium-based browsers (e.g. Edge) are supported.

**Q: How do I update the extension?**
A: Just download the latest version and reload.

**Q: Does the extension collect user data?**
A: No. In fact, the extension has no need to collect user data.

## 🤝 Contributing <a name = "contributing"></a>

Contributions to the RomanizeMe project are welcome! If you have questions, suggestions, or code contributions, please follow these steps:

1. Create an Issue on GitHub describing the problem.
2. Fork the repository and make changes in your local environment.
3. Submit a Pull Request with detailed description of your changes.

## 🙏 Acknowledgments <a name = "acknowledgments"></a>

Thanks to the [Tiny Segmenter](http://www.chasen.org/~taku/software/TinySegmenter/) project. This is a JavaScript library for segmenting Japanese text, providing critical functionality for RomanizeMe. Tiny Segmenter is free software available under the modified BSD license.

## 📜 License <a name = "license"></a>

RomanizeMe is distributed under the [MIT License](/LICENSE).

<p align="center">
  <a href="https://github.com/jeffminim/RomanizeMe" rel="noopener">
 <img width=200px height=200px src="assets/romanizemelogo256.png" alt="RomanizeMe - Browser Extension Logo"></a>
 <br>
 <a href="./README.zh.md">中文版</a> | <a href="./README.md">English</a> | <a href="./README.ja.md">日本語</a> | <a href="./README.ko.md">한국어</a> | <a href="./README.fr.md">Français</a>
</p>

<h3 align="center">RomanizeMe - 一个为非拉丁文字注音的浏览器扩展程序</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)
[![Chrome Web Store](https://img.shields.io/badge/chrome-web--store-coming_soon-blue.svg)]()
[![Edge Add-ons](https://img.shields.io/badge/Edge_Store-RomanizeMe-blue)](https://microsoftedge.microsoft.com/addons/detail/fdeofmabkieoopbbehanpfjglmidjjai)
[![Version](https://img.shields.io/badge/version-1.2.2-blue.svg)](https://github.com/jeffminim/RomanizeMe/releases/tag/v1.2.2)

</div>

---

<p align="center"> 专为语言爱好者设计的浏览器扩展，为非拉丁字母标注其罗马音发音。
    <br> 
</p>

## 📝 目录

- [📝 目录](#-目录)
- [🧐 关于 ](#-关于-)
- [🏁 安装使用 ](#-安装使用-)
  - [🔧 安装步骤](#-安装步骤)
  - [🖱️ 使用方法](#️-使用方法)
- [📅 版本 ](#-版本-)
- [📅 开发计划 ](#-开发计划-)
  - [🌍 支持文字/语言 ](#-支持文字语言-)
  - [✅ TODO List](#-todo-list)
- [❓ 常见问题 ](#-常见问题-)
- [🤝 贡献指南 ](#-贡献指南-)
- [🙏 致谢 ](#-致谢-)
- [📜 许可证 ](#-许可证-)

## 🧐 关于 <a name = "关于"></a>

这是一个专为语言学习者设计的浏览器扩展，主要功能包括：

- 为非拉丁字母文字标注罗马音发音
- 可扩展的语言支持架构
- 简单易用的界面

## 🏁 安装使用 <a name = "安装使用"></a>

### 🔧 安装步骤

- ~~Chrome~~（正在申请Google Chrome Web Store认证）

- [Edge](https://microsoftedge.microsoft.com/addons/detail/fdeofmabkieoopbbehanpfjglmidjjai)

- ~~Firefox~~（暂不支持，还在研究怎么适配Firefox）

但目前，您可以手动下载安装包，并拖入浏览器中进行安装。

### 🖱️ 使用方法

1. 打开任意包含非拉丁文字内容的网页
2. 点击浏览器工具栏中的扩展图标
3. 选中你想要注音的文字/语言
4. 点击"罗马音转换"
5. 将鼠标移动到具体的文字上查看。

## 📅 版本 <a name = "版本"></a>

- 1.0.0 (2025-01-08)
  
  - 实现基础功能。
  - 支持谚文（韩语）

- 1.1.0 (2025-01-16)
  
  - 支持日文（假名-罗马音）

- 1.2.0 (2025-01-17)
  
  - UI优化与国际化（i18n）支持（现在支持中文、英语、日语、韩语）

- 1.2.1 & 1.2.2 (2025-01-23)
  
  - 国际化（i18n）支持（新增法语）

## 📅 开发计划 <a name = "开发计划"></a>

### 🌍 支持文字/语言 <a name = "支持语言"></a>

- [ ] 汉字
  - [ ] 普通话（计划于v1.3.0支持）
  - [ ] 粤语
  - [ ] 更多方言...
- [x] 谚文（韩语）
- [x] 日文
  - [x] 假名（罗马音）
  - [ ] 日语汉字
  - [ ] 片假名（原语言，如英语）
- [ ] 西里尔字母
  - [ ] 俄语
  - [ ] 乌克兰语
  - [ ] 更多语言...
- [ ] 阿拉伯文
  - [ ] 阿拉伯语
  - [ ] 更多语言...
- [ ] 藏文（藏语）
- [ ] 更多文字/语言...

### ✅ TODO List

- [ ] 添加快捷键支持
- [ ] 增加功能引导及示例页面
- [x] 添加i18n支持
- [ ] 开发设置页面
- [ ] 实现标注样式自定义
- [ ] 添加发音音频支持
- [ ] 添加更多语言支持
- [ ] 适配主流浏览器

## ❓ 常见问题 <a name = "常见问题"></a>

**Q: 扩展支持哪些浏览器？**
A: 目前支持Chrome及所有基于Chromium的浏览器（如Edge等）

**Q: 如何更新扩展？**
A: 只需下载最新版本并重新加载即可

**Q: 扩展会收集用户数据吗？**
A: 不会。事实上，扩展本身并不需要收集任何用户数据。

## 🤝 贡献指南 <a name = "贡献指南"></a>

欢迎您为 RomanizeMe 项目做出贡献！如果您有任何问题、建议或代码贡献，请遵循以下步骤：

1. 在 GitHub 上提交 Issue，描述您的问题或建议。
2. Fork 项目仓库，并在您的本地环境中进行修改。
3. 提交 Pull Request，详细说明您的修改内容。

## 🙏 致谢 <a name = "致谢"></a>

特别感谢 [Tiny Segmenter](http://www.chasen.org/~taku/software/TinySegmenter/) 项目，这是一个用于日语分词的 JavaScript 库，为 RomanizeMe 提供了重要的功能支持。Tiny Segmenter 是自由软件，可以根据修正 BSD 许可证进行使用和再分发。

## 📜 许可证 <a name = "许可证"></a>

RomanizeMe 采用 [MIT 许可证](/LICENSE)。

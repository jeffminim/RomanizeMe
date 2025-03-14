<p align="center">
  <a href="https://github.com/jeffminim/RomanizeMe" rel="noopener">
 <img width=200px height=200px src="../assets/romanizemelogo256.png" alt="RomanizeMe - Browser Extension Logo"></a>
 <br>
 <a href="./README.zh.md">中文</a> | <a href="../README.md">English</a> | <a href="./README.ja.md">日本語</a> | <a href="./README.ko.md">한국어</a> | <a href="./README.fr.md">Français</a> | <a href="./README.ru.md">Русский</a>
</p>

<h3 align="center">RomanizeMe - 一个为非拉丁文字注音的浏览器扩展程序</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](../LICENSE)
[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/nmakcdfenoniomkbnnmpommgnaondfhk
)](https://chromewebstore.google.com/detail/romanizeme/nmakcdfenoniomkbnnmpommgnaondfhk)
[![Edge Add-ons](https://img.shields.io/badge/Edge_Store-RomanizeMe-blue)](https://microsoftedge.microsoft.com/addons/detail/fdeofmabkieoopbbehanpfjglmidjjai)
[![Mozilla Add-on](https://img.shields.io/amo/v/eb54163f4d70456c8e98cbea1f22cecd%40windminim.com)](https://addons.mozilla.org/firefox/addon/romanizeme/)
[![Version](https://img.shields.io/badge/version-2.2.0-blue.svg)](https://github.com/jeffminim/RomanizeMe/releases/tag/v2.2.0)

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

- [Chrome](https://chromewebstore.google.com/detail/romanizeme/nmakcdfenoniomkbnnmpommgnaondfhk)

- [Edge](https://microsoftedge.microsoft.com/addons/detail/fdeofmabkieoopbbehanpfjglmidjjai)

- [Firefox](https://addons.mozilla.org/zh-CN/firefox/addon/romanizeme/) （终于学会兼容Firefox了）

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

- 1.3.0 & 1.3.1 (2025-02-05)
  
  - 支持中文普通话（汉语拼音）
  - 优化溢出时的显示效果

- 2.0.0 (2025-2-22)
  - 用React+Plasmo重构了整个程序，优化了运行逻辑
  - 增加了Toast提示（完成转换、还原时）
  - 优化了UI样式
  - 2.0.1
    - 根据浏览器的不同，调整了部分功能
  - 2.0.2
    - 大幅优化了转换算法，避免页面假死
    - 修复了重置设置项时，toast的UI显示问题
  - 2.0.3
    - 符合Chrome Web Store的审核要求，修复了一些bug
  - 2.0.4
    - 优化了显示样式，现在转换后不会再发生重叠

- 2.1.0 (2025-3-8)
  - 支持西里尔文字的相关语言（俄语、乌克兰语、蒙古语、塞尔维亚语）
  - UI界面国际化（i18n）支持（新增俄语）

- 2.2.0 (2025-3-14)
  - 支持东南亚主要非拉丁文字语言（泰语、缅甸语、柬埔寨语、老挝语）及部分拉丁文字语言（越南语）
  - 采用<ruby>标签，优化注音的标签及样式
  - 现在语言选项面板会根据当前页面的语言种类，自动展开相应组

## 📅 开发计划 <a name = "开发计划"></a>

### 🌍 支持文字/语言 <a name = "支持语言"></a>

- [x] 汉字
  - [x] 普通话
  - [ ] 粤语
  - [ ] 更多方言...
- [x] 谚文（韩语）
- [x] 日文
  - [x] 假名（罗马音）
  - [ ] 日语汉字
  - [ ] 片假名（转换至源语言，如英文）
- [x] 西里尔字母
  - [x] 俄语
  - [x] 乌克兰语
  - [x] 蒙古语
  - [x] 塞尔维亚语
  - [ ] 更多语言...
- [ ] 阿拉伯文
  - [ ] 阿拉伯语
  - [ ] 更多语言...
- [x] 东南亚语言
  - [x] 泰语
  - [x] 越南语
  - [x] 柬埔寨语（高棉语）
  - [x] 缅甸语
  - [x] 老挝语
  - [ ] 更多语言...
- [ ] 中国其他语言
  - [ ] 藏文（藏语）
  - [ ] 蒙古文（内蒙古）
  - [ ] 更多语言...
- [ ] 更多文字/语言...

### ✅ TODO List

- [ ] 添加快捷键支持
- [ ] 增加功能引导及示例页面
- [x] 添加i18n支持
- [x] 添加Toast提示
- [x] 开发设置页面
- [ ] 实现标注样式自定义
- [ ] 添加发音音频支持
- [ ] 添加更多语言支持

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

特别感谢 [Pinyin-Pro](https://pinyin-pro.cn/) 项目，这是一个专业的 JavaScript 中文转拼音的库，具备多音字识别准确、体积轻量、性能优异、功能丰富等特点。Pinyin-Pro 是自由软件，可以根据 MIT 许可证进行使用和再分发。

## 📜 许可证 <a name = "许可证"></a>

RomanizeMe 采用 [MIT 许可证](../LICENSE)。

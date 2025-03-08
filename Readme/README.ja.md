<p align="center">
  <a href="https://github.com/jeffminim/RomanizeMe" rel="noopener">
 <img width=200px height=200px src="../assets/romanizemelogo256.png" alt="RomanizeMe - ブラウザ拡張機能のロゴ"></a>
  <br>
  <a href="./README.zh.md">中文</a> | <a href="../README.md">English</a> | <a href="./README.ja.md">日本語</a> | <a href="./README.ko.md">한국어</a> | <a href="./README.fr.md">Français</a> | <a href="./README.ru.md">Русский</a>
</p>

<h3 align="center">RomanizeMe - 非ラテン文字をローマ字化するブラウザ拡張機能</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)
[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/nmakcdfenoniomkbnnmpommgnaondfhk
)](https://chromewebstore.google.com/detail/romanizeme/nmakcdfenoniomkbnnmpommgnaondfhk)
[![Edge Add-ons](https://img.shields.io/badge/Edge_Store-RomanizeMe-blue)](https://microsoftedge.microsoft.com/addons/detail/fdeofmabkieoopbbehanpfjglmidjjai)
[![Version](https://img.shields.io/badge/version-2.1.0-blue.svg)](https://github.com/jeffminim/RomanizeMe/releases/tag/v2.1.0)

</div>

---

<p align="center"> 非ラテン文字の発音をローマ字化するブラウザ拡張機能です。
    <br> 
</p>

## 📝 目次

- [📝 目次](#-目次)
- [🧐 概要 ](#-概要-)
- [🏁 始める ](#-始める-)
  - [🔧 インストール](#-インストール)
  - [🖱️ 使い方](#️-使い方)
- [📅 バージョン履歴 ](#-バージョン履歴-)
- [📅 開発ロードマップ ](#-開発ロードマップ-)
  - [🌍 対応スクリプト/言語 ](#-対応スクリプト言語-)
  - [✅ TODOリスト](#-todoリスト)
- [❓ FAQ ](#-faq-)
- [🤝 貢献 ](#-貢献-)
- [🙏 謝辞 ](#-謝辞-)
- [📜 ライセンス ](#-ライセンス-)

## 🧐 概要 <a name = "概要"></a>

これは言語学習者向けのブラウザ拡張機能で、以下の主な機能があります：

- 非ラテン文字の発音をローマ字化
- 拡張可能な言語サポートアーキテクチャ
- シンプルで使いやすいインターフェース

## 🏁 始める <a name = "始める"></a>

### 🔧 インストール

- [Chrome](https://chromewebstore.google.com/detail/romanizeme/nmakcdfenoniomkbnnmpommgnaondfhk)

- [Edge](https://microsoftedge.microsoft.com/addons/detail/fdeofmabkieoopbbehanpfjglmidjjai)

- ~~Firefox~~ (まだサポートされていません。Firefoxへの適応を研究中です。)

### 🖱️ 使い方

1. 非ラテン文字を含むウェブページを開く
2. ブラウザのツールバーにある拡張機能のアイコンをクリック
3. ローマ字化したいスクリプト/言語を選択
4. 「ローマ字化」をクリック
5. 文字の上にカーソルを合わせると発音が表示されます

## 📅 バージョン履歴 <a name = "バージョン履歴"></a>

- 1.0.0 (2025-01-08)
  - 基本機能の実装
  - ハングル（韓国語）のサポート

- 1.1.0 (2025-01-16)
  - 日本語仮名（ローマ字）のサポート

- 1.2.0 (2025-01-17)
  - UIの最適化とi18nサポート（中国語、英語、日本語、韓国語）

- 1.2.1 & 1.2.2 (2025-01-23)
  - i18nサポート（フランス語追加）

- 1.3.0 & 1.3.1 (2025-02-05)
  - 普通話（v1.3.0で予定）
  - オーバーフロー時の表示効果を最適化しました

- 2.0.0 (2025-2-22)
  - React+Plasmoでプログラム全体を再構築し、実行ロジックを最適化
  - Toast通知を追加（変換と復元完了時）
  - UIスタイルを最適化
  - 2.0.1
    - ブラウザの違いに応じて一部の機能を調整
  - 2.0.2
    - ページがフリーズするのを避けるために、変換アルゴリズムを大幅に最適化しました
    - 設定をリセットするときのUI表示の問題を修正しました
  - 2.0.3
    - Chrome Web Storeのレビュー要件を満たし、いくつかのバグを修正しました
  - 2.0.4
    - オーバーフロー時に表示が重ならないように、表示スタイルを最適化しました

- 2.1.0 (2025-3-8)
  - キリル文字のサポートを追加（ロシア語、ウクライナ語、モンゴル語、セルビア語）
  - UIインターフェースにロシア語サポートを追加

## 📅 開発ロードマップ <a name = "開発ロードマップ"></a>

### 🌍 対応スクリプト/言語 <a name = "対応スクリプト言語"></a>

- [x] 漢字
  - [x] 普通話
  - [ ] 広東語
  - [ ] その他の方言...
- [x] ハングル
- [x] 日本語
  - [x] 仮名（ローマ字）
  - [ ] 漢字
  - [ ] カタカナ（元の言語、例：英語）
- [x] キリル文字
  - [x] ロシア語
  - [x] ウクライナ語
  - [x] モンゴル語
  - [x] セルビア語
  - [ ] その他の言語...
- [ ] アラビア文字
  - [ ] アラビア語
  - [ ] その他の言語...
- [ ] 東南アジアの言語
  - [ ] タイ語
  - [ ] ベトナム語
  - [ ] クメール語
  - [ ] ビルマ語
  - [ ] ラオス語
  - [ ] その他の言語...
- [ ] 中国のその他の言語
  - [ ] チベット語
  - [ ] モンゴル語（内モンゴル）
  - [ ] その他の言語...
- [ ] その他のスクリプト/言語...

### ✅ TODOリスト

- [ ] ショートカットキーのサポート
- [ ] 機能の追加ガイドとサンプルページ
- [x] i18nサポート
- [ ] 設定ページの開発
- [ ] 注釈スタイルのカスタマイズ
- [ ] 発音音声のサポート
- [ ] より多くの言語のサポート
- [ ] 主要ブラウザへの適応

## ❓ FAQ <a name = "FAQ"></a>

**Q: どのブラウザがサポートされていますか？**
A: 現在、ChromeとChromiumベースのブラウザ（例：Edge）がサポートされています。

**Q: 拡張機能を更新するにはどうすればよいですか？**
A: 最新バージョンをダウンロードしてリロードするだけです。

**Q: 拡張機能はユーザーデータを収集しますか？**
A: いいえ。実際、拡張機能はユーザーデータを収集する必要がありません。

## 🤝 貢献 <a name = "貢献"></a>

RomanizeMeプロジェクトへの貢献を歓迎します！質問、提案、コードの貢献がある場合は、以下の手順に従ってください：

1. GitHubで問題を説明するIssueを作成します。
2. リポジトリをフォークし、ローカル環境で変更を行います。
3. 変更内容を詳細に説明したPull Requestを提出します。

## 🙏 謝辞 <a name = "謝辞"></a>

特に、[Pinyin-Pro](https://pinyin-pro.cn/)プロジェクトに感謝します。これは、正確な多音字認識、軽量、優れたパフォーマンス、豊富な機能を備えたJavaScriptの中国語からピンインへの変換ライブラリです。Pinyin-Proは自由ソフトウェアであり、MITライセンスに基づいて使用および再配布できます。

## 📜 ライセンス <a name = "ライセンス"></a>

RomanizeMeは[MITライセンス](../LICENSE)の下で配布されています。

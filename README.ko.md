<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="assets/romanizemelogo256.png" alt="RomanizeMe - 브라우저 확장 프로그램 로고"></a>
 <br>
 <a href="./README.zh.md">中文版</a> | <a href="./README.md">English</a> | <a href="./README.ja.md">日本語</a> | <a href="./README.ko.md">한국어</a>
</p>

<h3 align="center">RomanizeMe - 비라틴 문자 로마자 표기 브라우저 확장 프로그램</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)
[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/your-extension-id.svg)](https://chrome.google.com/webstore/detail/your-extension-id)
[![Edge Add-ons](https://img.shields.io/badge/edge-add--ons-blue.svg)](https://microsoftedge.microsoft.com/addons/detail/your-extension-id)
[![Version](https://img.shields.io/badge/version-1.2.0-blue.svg)](https://github.com/jeffminim/RomanizeMe/releases/tag/v1.2.0)

</div>

---

<p align="center"> 비라틴 문자를 로마자로 표기해주는 브라우저 확장 프로그램입니다.
    <br> 
</p>

## 📝 목차

- [📝 목차](#-목차)
- [🧐 개요 ](#-개요-)
- [🏁 시작하기 ](#-시작하기-)
  - [🔧 설치](#-설치)
  - [🖱️ 사용 방법](#️-사용-방법)
- [📅 버전 기록 ](#-버전-기록-)
- [📅 개발 로드맵 ](#-개발-로드맵-)
  - [🌍 지원 문자/언어 ](#-지원-문자언어-)
  - [✅ TODO 리스트](#-todo-리스트)
- [❓ 자주 묻는 질문 ](#-자주-묻는-질문-)
- [🤝 기여 가이드 ](#-기여-가이드-)
- [🙏 감사의 말 ](#-감사의-말-)
- [📜 라이선스 ](#-라이선스-)

## 🧐 개요 <a name = "개요"></a>

언어 학습자를 위해 설계된 브라우저 확장 프로그램으로, 주요 기능은 다음과 같습니다:

- 비라틴 문자 로마자 표기
- 확장 가능한 언어 지원 아키텍처
- 간단하고 사용하기 쉬운 인터페이스

## 🏁 시작하기 <a name = "시작하기"></a>

### 🔧 설치

- ~~Chrome~~（Google Chrome Web Store 승인 대기 중）

- ~~Edge~~（Microsoft Partner Center 승인 대기 중）

- ~~Firefox~~（Mozilla Add-ons 승인 대기 중）

현재는 수동으로 패키지를 다운로드하여 브라우저에 드래그하여 설치할 수 있습니다.

### 🖱️ 사용 방법

1. 비라틴 문자가 포함된 웹 페이지 열기
2. 브라우저 툴바의 확장 프로그램 아이콘 클릭
3. 로마자로 표기하고 싶은 문자/언어 선택
4. "로마자 변환" 클릭
5. 특정 문자에 마우스를 올려 로마자 표기 확인

## 📅 버전 기록 <a name = "버전-기록"></a>

- 1.0.0 (2025-01-08)
  - 기본 기능 구현
  - 한글 지원

- 1.1.0 (2025-01-16)
  - 일본어 가나（로마자）지원

- 1.2.0 (2025-01-17)
  - UI 개선 및 i18n 지원（현재 중국어, 영어, 일본어, 한국어 지원）

## 📅 개발 로드맵 <a name = "개발-로드맵"></a>

### 🌍 지원 문자/언어 <a name = "지원-문자언어"></a>

- [ ] 한자
  - [ ] 보통화（v1.3.0 지원 예정）
  - [ ] 광둥어
  - [ ] 기타 방언...
- [X] 한글
- [x] 일본어
  - [x] 가나（로마자）
  - [ ] 한자
  - [ ] 가타카나（원래 언어, 예: 영어）
- [ ] 키릴 문자
  - [ ] 러시아어
  - [ ] 우크라이나어
  - [ ] 기타 언어...
- [ ] 아랍 문자
  - [ ] 아랍어
  - [ ] 기타 언어...
- [ ] 티베트 문자（티베트어）
- [ ] 기타 문자/언어...

### ✅ TODO 리스트

- [ ] 단축키 지원 추가
- [x] i18n 지원 추가
- [ ] 설정 페이지 개발
- [ ] 주석 스타일 커스터마이징 구현
- [ ] 발음 오디오 지원 추가
- [ ] 더 많은 언어 지원 추가
- [ ] 주요 브라우저 지원

## ❓ 자주 묻는 질문 <a name = "자주-묻는-질문"></a>

**Q: 어떤 브라우저를 지원하나요?**
A: 현재 Chrome 및 모든 Chromium 기반 브라우저（예: Edge 등）를 지원합니다

**Q: 확장 프로그램을 업데이트하려면 어떻게 해야 하나요?**
A: 최신 버전을 다운로드하여 다시 로드하면 됩니다

**Q: 확장 프로그램이 사용자 데이터를 수집하나요?**
A: 아니요. 실제로 이 확장 프로그램은 사용자 데이터를 수집할 필요가 없습니다.

## 🤝 기여 가이드 <a name = "기여-가이드"></a>

RomanizeMe 프로젝트에 기여를 환영합니다! 질문, 제안, 코드 기여가 있다면 다음 단계를 따르세요:

1. GitHub에서 Issue를 제출하고 질문이나 제안을 설명하세요.
2. 프로젝트 저장소를 포크하고 로컬 환경에서 변경 사항을 적용하세요.
3. 변경 사항을 자세히 설명한 Pull Request를 제출하세요.

## 🙏 감사의 말 <a name = "감사의-말"></a>

[Tiny Segmenter](http://www.chasen.org/~taku/software/TinySegmenter/) 프로젝트에 특별한 감사를 드립니다. 이는 일본어 분할을 위한 JavaScript 라이브러리로, RomanizeMe에 중요한 기능을 제공합니다. Tiny Segmenter는 자유 소프트웨어이며 수정된 BSD 라이선스 하에서 사용 및 재배포할 수 있습니다.

## 📜 라이선스 <a name = "라이선스"></a>

RomanizeMe는[MIT 라이선스](/LICENSE) 하에 제공됩니다.

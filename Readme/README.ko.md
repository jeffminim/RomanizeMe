<p align="center">
  <a href="https://github.com/jeffminim/RomanizeMe" rel="noopener">
 <img width=200px height=200px src="../assets/romanizemelogo256.png" alt="RomanizeMe - 브라우저 확장 프로그램 로고"></a>
  <br>
  <a href="./README.zh.md">中文</a> | <a href="../README.md">English</a> | <a href="./README.ja.md">日本語</a> | <a href="./README.ko.md">한국어</a> | <a href="./README.fr.md">Français</a> | <a href="./README.ru.md">Русский</a>
</p>

<h3 align="center">RomanizeMe - 비라틴 문자를 로마자로 변환하는 브라우저 확장 프로그램</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)
[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/nmakcdfenoniomkbnnmpommgnaondfhk
)](https://chromewebstore.google.com/detail/romanizeme/nmakcdfenoniomkbnnmpommgnaondfhk)
[![Edge Add-ons](https://img.shields.io/badge/Edge_Store-RomanizeMe-blue)](https://microsoftedge.microsoft.com/addons/detail/fdeofmabkieoopbbehanpfjglmidjjai)
[![Mozilla Add-on](https://img.shields.io/amo/v/eb54163f4d70456c8e98cbea1f22cecd%40windminim.com)](https://addons.mozilla.org/firefox/addon/romanizeme/)
[![Version](https://img.shields.io/badge/version-2.3.0-blue.svg)](https://github.com/jeffminim/RomanizeMe/releases/tag/v2.3.0)

</div>

---

<p align="center"> 비라틴 문자의 발음을 로마자로 변환하는 브라우저 확장 프로그램입니다.
    <br> 
</p>

## 📝 목차

- [📝 목차](#-목차)
- [🧐 개요 ](#-개요-)
- [🏁 시작하기 ](#-시작하기-)
  - [🔧 설치](#-설치)
  - [🖱️ 사용법](#️-사용법)
- [📅 버전 기록 ](#-버전-기록-)
- [📅 개발 로드맵 ](#-개발-로드맵-)
  - [🌍 지원 스크립트/언어 ](#-지원-스크립트언어-)
  - [✅ TODO 리스트](#-todo-리스트)
- [❓ FAQ ](#-faq-)
- [🤝 기여하기 ](#-기여하기-)
- [🙏 감사의 말 ](#-감사의-말-)
- [📜 라이선스 ](#-라이선스-)

## 🧐 개요 <a name = "개요"></a>

이것은 언어 학습자를 위한 브라우저 확장 프로그램으로, 다음과 같은 주요 기능이 있습니다:

- 비라틴 문자의 발음을 로마자로 변환
- 확장 가능한 언어 지원 아키텍처
- 간단하고 사용하기 쉬운 인터페이스

## 🏁 시작하기 <a name = "시작하기"></a>

### 🔧 설치

- [Chrome](https://chromewebstore.google.com/detail/romanizeme/nmakcdfenoniomkbnnmpommgnaondfhk)

- [Edge](https://microsoftedge.microsoft.com/addons/detail/fdeofmabkieoopbbehanpfjglmidjjai)

- [Firefox](https://addons.mozilla.org/ko/firefox/addon/romanizeme/)  

### 🖱️ 사용법

1. 비라틴 문자가 포함된 웹 페이지 열기
2. 브라우저 도구 모음에서 확장 프로그램 아이콘 클릭
3. 로마자로 변환할 스크립트/언어 선택
4. "로마자화" 클릭
5. 문자 위에 마우스를 올리면 발음이 표시됩니다

## 📅 버전 기록 <a name = "버전-기록"></a>

- 1.0.0 (2025-01-08)
  - 기본 기능 구현
  - 한글 지원

- 1.1.0 (2025-01-16)
  - 일본어 가나(로마자) 지원

- 1.2.0 (2025-01-17)
  - UI 최적화 및 i18n 지원(중국어, 영어, 일본어, 한국어)

- 1.2.1 & 1.2.2 (2025-01-23)
  - i18n 지원(프랑스어 추가)

- 1.3.0 & 1.3.1 (2025-02-05)
  - 보통화(v1.3.0 예정)
  - 오버플로 시 표시 효과를 최적화했습니다.

- 2.0.0 (2025-2-22)
  - React+Plasmo로 전체 프로그램을 재구축하고 실행 로직을 최적화했습니다
  - Toast 알림 추가 (변환 및 복원 완료 시)
  - UI 스타일 최적화
  - 2.0.1
    - 브라우저에 따라 일부 기능 조정
  - 2.0.2
    - 페이지 고정을 방지하기 위해 변환 알고리즘을 크게 최적화했습니다.
    - 설정 항목을 재설정할 때 UI 표시 문제 수정
  - 2.0.3
    - Chrome 웹 스토어 검토 요구 사항을 충족하고 일부 버그 수정
  - 2.0.4
    - 오버플로 시 표시 효과를 최적화했습니다.

- 2.1.0 (2025-3-8)
  - 키릴 문자 지원 추가 (러시아어, 우크라이나어, 몽골어, 세르비아어)
  - UI 인터페이스에 러시아어 지원 추가

- 2.2.0 (2025-3-14)
  - 동남아시아 주요 비라틴 문자 언어(태국어, 미얀마어, 캄보디아어, 라오스어) 및 일부 라틴 문자 언어(베트남어) 지원 추가
  - <ruby> 태그를 사용하여 로마자 주석의 태그와 스타일을 최적화했습니다.
  - 이제 언어 옵션 패널은 페이지의 언어에 따라 자동으로 해당 그룹을 확장합니다.

- 2.3.0 (2025-3-21)
  - 아랍 문자 지원 추가 (아랍어, 페르시아어, 우르두어)
  - 지중해 지역 언어 지원 추가 (그리스어, 히브리어, 베르베르어)
  - 코카서스 지역 언어 지원 추가 (조지아어, 아르메니아어)
  - 일부 언어 주석 표시 오류 수정

## 📅 개발 로드맵 <a name = "개발-로드맵"></a>

### 🌍 지원 스크립트/언어 <a name = "지원-스크립트언어"></a>

- [x] 한자
  - [x] 보통화
  - [ ] 광둥어
  - [ ] 기타 방언...
- [x] 한글
- [x] 일본어
  - [x] 가나(로마자)
  - [ ] 한자
  - [ ] 가타카나(원래 언어, 예: 영어)
- [x] 키릴 문자
  - [x] 러시아어
  - [x] 우크라이나어
  - [x] 몽골어
  - [x] 세르비아어
  - [ ] 기타 언어...
- [x] 아랍 문자
  - [x] 아랍어
  - [x] 페르시아어
  - [x] 우르두어
  - [ ] 기타 언어...
- [x] 동남아시아 언어
  - [x] 태국어
  - [x] 베트남어
  - [x] 크메르어
  - [x] 미얀마어
  - [x] 라오스어
  - [ ] 기타 언어...
- [x] 지중해 지역 언어
  - [x] 그리스어
  - [x] 히브리어
  - [x] 베르베르어
  - [ ] 기타 언어...
- [x] 코카서스 지역 언어
  - [x] 조지아어
  - [x] 아르메니아어
- [ ] 중국의 기타 언어
  - [ ] 티베트어
  - [ ] 몽골어(내몽골)
  - [ ] 아랍어(위구르어)
  - [ ] 기타 언어...
- [ ] 기타 스크립트/언어...

### ✅ TODO 리스트

- [ ] 단축키 지원
- [ ] 기능 안내 및 예시 페이지 추가합니다
- [x] i18n 지원
- [x] 개발 페이지 개발
- [ ] 주석 스타일 커스터마이징
- [ ] 발음 음성 지원
- [ ] 더 많은 언어 지원
- [ ] 주요 브라우저 적응

## ❓ FAQ <a name = "FAQ"></a>

**Q: 어떤 브라우저가 지원됩니까?**
A: 현재 Chrome 및 Chromium 기반 브라우저(예: Edge)가 지원됩니다.

**Q: 확장 프로그램을 업데이트하려면 어떻게 해야 합니까?**
A: 최신 버전을 다운로드하고 다시 로드하기만 하면 됩니다.

**Q: 확장 프로그램이 사용자 데이터를 수집합니까?**
A: 아니요. 실제로 확장 프로그램은 사용자 데이터를 수집할 필요가 없습니다.

## 🤝 기여하기 <a name = "기여하기"></a>

RomanizeMe 프로젝트에 기여를 환영합니다! 질문, 제안 또는 코드 기여가 있다면 다음 단계를 따르세요:

1. GitHub에서 문제를 설명하는 Issue를 만듭니다.
2. 저장소를 포크하고 로컬 환경에서 변경합니다.
3. 변경 사항을 자세히 설명하는 Pull Request를 제출합니다.

## 🙏 감사의 말 <a name = "감사의-말"></a>

특히 [Pinyin-Pro](https://pinyin-pro.cn/) 프로젝트에 감사드립니다. 이는 다의어 인식이 정확하고, 경량이며, 성능이 우수하고, 기능이 풍부한 JavaScript 중국어에서 핀인으로 변환하는 라이브러리입니다. Pinyin-Pro는 자유 소프트웨어로 MIT 라이센스에 따라 사용 및 재배포할 수 있습니다.

## 📜 라이선스 <a name = "라이선스"></a>

RomanizeMe는 [MIT 라이선스](../LICENSE) 하에 배포됩니다.

<p align="center">
  <a href="https://github.com/jeffminim/RomanizeMe" rel="noopener">
 <img width=200px height=200px src="assets/romanizemelogo256.png" alt="RomanizeMe - Logo de l'extension de navigateur"></a>
 <br>
 <a href="./README.zh.md">中文</a> | <a href="./README.md">English</a> | <a href="./README.ja.md">日本語</a> | <a href="./README.ko.md">한국어</a> | <a href="./README.fr.md">Français</a>
</p>

<h3 align="center">RomanizeMe - Une extension de navigateur pour romaniser les textes non latins</h3>

<div align="center">

[![Statut](https://img.shields.io/badge/status-active-success.svg)]()
[![Licence](https://img.shields.io/badge/licence-MIT-blue.svg)](/LICENSE)
[![Chrome Web Store](https://img.shields.io/badge/chrome-web--store-coming_soon-blue.svg)]()
[![Edge Add-ons](https://img.shields.io/badge/edge-add--ons-coming_soon-blue.svg)]()
[![Version](https://img.shields.io/badge/version-1.2.0-blue.svg)](https://github.com/jeffminim/RomanizeMe/releases/tag/v1.2.0)

</div>

---

<p align="center"> Une extension de navigateur conçue pour les amateurs de langues, permettant de romaniser la prononciation des textes non latins.
    <br> 
</p>

## 📝 Table des matières

- [📝 Table des matières](#-table-des-matières)
- [🧐 À propos ](#-à-propos-)
- [🏁 Installation et utilisation ](#-installation-et-utilisation-)
  - [🔧 Étapes d'installation](#-étapes-dinstallation)
  - [🖱️ Mode d'emploi](#️-mode-demploi)
- [📅 Versions ](#-versions-)
- [📅 Plan de développement ](#-plan-de-développement-)
  - [🌍 Langues/écritures supportées ](#-languesécritures-supportées-)
  - [✅ Liste des tâches](#-liste-des-tâches)
- [❓ FAQ ](#-faq-)
- [🤝 Guide de contribution ](#-guide-de-contribution-)
- [🙏 Remerciements ](#-remerciements-)
- [📜 Licence ](#-licence-)

## 🧐 À propos <a name = "à-propos"></a>

Il s'agit d'une extension de navigateur conçue pour les apprenants de langues, avec les fonctionnalités principales suivantes :

- Romanisation de la prononciation des textes non latins
- Architecture extensible pour le support des langues
- Interface simple et intuitive

## 🏁 Installation et utilisation <a name = "installation-et-utilisation"></a>

### 🔧 Étapes d'installation

- ~~Chrome~~ (en attente de certification sur le Chrome Web Store)

- ~~Edge~~ (en attente de certification sur le Microsoft Partner Center)

- ~~Firefox~~ (Pas encore supporté, je travaille encore sur la façon de l'adapter à Firefox add-ons.)

Pour le moment, vous pouvez télécharger manuellement le package d'installation et le glisser-déposer dans votre navigateur.

### 🖱️ Mode d'emploi

1. Ouvrez une page web contenant du texte non latin
2. Cliquez sur l'icône de l'extension dans la barre d'outils du navigateur
3. Sélectionnez la langue/écriture que vous souhaitez romaniser
4. Cliquez sur "Romaniser"
5. Passez la souris sur les caractères pour voir leur prononciation.

## 📅 Versions <a name = "versions"></a>

- 1.0.0 (2025-01-08)
  - Fonctionnalités de base
  - Support du hangul (coréen)

- 1.1.0 (2025-01-16)
  - Support des kana japonais (romaji)

- 1.2.0 (2025-01-17)
  - Optimisation de l'interface et support de l'internationalisation (i18n) (maintenant disponible en chinois, anglais, japonais et coréen)

## 📅 Plan de développement <a name = "plan-de-développement"></a>

### 🌍 Langues/écritures supportées <a name = "langues-supportées"></a>

- [ ] Caractères chinois
  - [ ] Mandarin (prévu pour la v1.3.0)
  - [ ] Cantonais
  - [ ] Plus de dialectes...
- [X] Hangul (coréen)
- [x] Japonais
  - [x] Kana (romaji)
  - [ ] Kanji japonais
  - [ ] Katakana (langue d'origine, par exemple anglais)
- [ ] Alphabet cyrillique
  - [ ] Russe
  - [ ] Ukrainien
  - [ ] Plus de langues...
- [ ] Arabe
  - [ ] Arabe
  - [ ] Plus de langues...
- [ ] Tibétain
- [ ] Plus d'écritures/langues...

### ✅ Liste des tâches

- [ ] Ajouter le support des raccourcis clavier
- [x] Ajouter le support i18n
- [ ] Développer une page de paramètres
- [ ] Implémenter la personnalisation du style des annotations
- [ ] Ajouter le support audio de prononciation
- [ ] Ajouter le support de plus de langues
- [ ] Adapter aux principaux navigateurs

## ❓ FAQ <a name = "faq"></a>

**Q: Quels navigateurs sont supportés ?**
A: Actuellement, Chrome et tous les navigateurs basés sur Chromium (comme Edge) sont supportés.

**Q: Comment mettre à jour l'extension ?**
A: Il suffit de télécharger la dernière version et de recharger l'extension.

**Q: L'extension collecte-t-elle des données utilisateur ?**
A: Non. En fait, l'extension n'a pas besoin de collecter de données utilisateur.

## 🤝 Guide de contribution <a name = "guide-de-contribution"></a>

Nous vous invitons à contribuer au projet RomanizeMe ! Si vous avez des questions, des suggestions ou des contributions de code, veuillez suivre ces étapes :

1. Ouvrez une Issue sur GitHub pour décrire votre problème ou suggestion.
2. Forkez le dépôt et apportez vos modifications dans votre environnement local.
3. Soumettez une Pull Request en détaillant vos modifications.

## 🙏 Remerciements <a name = "remerciements"></a>

Un grand merci au projet [Tiny Segmenter](http://www.chasen.org/~taku/software/TinySegmenter/), une bibliothèque JavaScript pour la segmentation de texte japonais, qui fournit un support essentiel à RomanizeMe. Tiny Segmenter est un logiciel libre disponible sous licence BSD modifiée.

## 📜 Licence <a name = "licence"></a>

RomanizeMe est distribué sous licence [MIT](/LICENSE).

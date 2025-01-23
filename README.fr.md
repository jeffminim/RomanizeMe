<p align="center">
  <a href="https://github.com/jeffminim/RomanizeMe" rel="noopener">
 <img width=200px height=200px src="assets/romanizemelogo256.png" alt="RomanizeMe - Logo de l'extension de navigateur"></a>
 <br>
 <a href="./README.zh.md">中文</a> | <a href="./README.md">English</a> | <a href="./README.ja.md">日本語</a> | <a href="./README.ko.md">한국어</a> | <a href="./README.fr.md">Français</a>
</p>

<h3 align="center">RomanizeMe - Extension de navigateur pour romaniser les écritures non latines</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)
[![Chrome Web Store](https://img.shields.io/badge/chrome-web--store-coming_soon-blue.svg)]()
[![Edge Add-ons](https://img.shields.io/badge/Edge_Store-RomanizeMe-blue)](https://microsoftedge.microsoft.com/addons/detail/fdeofmabkieoopbbehanpfjglmidjjai)
[![Version](https://img.shields.io/badge/version-1.2.2-blue.svg)](https://github.com/jeffminim/RomanizeMe/releases/tag/v1.2.2)

</div>

---

<p align="center"> Une extension de navigateur pour romaniser la prononciation des écritures non latines.
    <br> 
</p>

## 📝 Table des matières

- [📝 Table des matières](#-table-des-matières)
- [🧐 À propos ](#-à-propos-)
- [🏁 Commencer ](#-commencer-)
  - [🔧 Installation](#-installation)
  - [🖱️ Utilisation](#️-utilisation)
- [📅 Historique des versions ](#-historique-des-versions-)
- [📅 Feuille de route de développement ](#-feuille-de-route-de-développement-)
  - [🌍 Écritures/langues prises en charge ](#-écritureslangues-prises-en-charge-)
  - [✅ Liste des tâches](#-liste-des-tâches)
- [❓ FAQ ](#-faq-)
- [🤝 Contribuer ](#-contribuer-)
- [🙏 Remerciements ](#-remerciements-)
- [📜 Licence ](#-licence-)

## 🧐 À propos <a name = "à-propos"></a>

Il s'agit d'une extension de navigateur pour les apprenants de langues avec les principales fonctionnalités suivantes :

- Romaniser la prononciation des écritures non latines
- Architecture de support linguistique extensible
- Interface simple et facile à utiliser

## 🏁 Commencer <a name = "commencer"></a>

### 🔧 Installation

- ~~Chrome~~ (En attente d'approbation du Google Chrome Web Store)

- ~~Edge~~ (En attente d'approbation du Microsoft Partner Center)

- ~~Firefox~~ (Pas encore supporté. Recherche en cours pour l'adaptation à Firefox.)

Pour l'instant, vous pouvez télécharger manuellement le package d'installation et le glisser-déposer dans votre navigateur pour l'installer.

### 🖱️ Utilisation

1. Ouvrez une page web contenant des écritures non latines
2. Cliquez sur l'icône de l'extension dans la barre d'outils du navigateur
3. Sélectionnez l'écriture/langue que vous souhaitez romaniser
4. Cliquez sur "Romaniser"
5. Survolez les caractères pour voir leur prononciation

## 📅 Historique des versions <a name = "historique-des-versions"></a>

- 1.0.0 (2025-01-08)
  - Implémentation des fonctionnalités de base
  - Support du hangul (coréen)

- 1.1.0 (2025-01-16)
  - Support des kana japonais (romaji)

- 1.2.0 (2025-01-17)
  - Optimisation de l'interface et support i18n (chinois, anglais, japonais, coréen)

- 1.2.1 & 1.2.2 (2025-01-23)
  - Support i18n (ajout du français)

## 📅 Feuille de route de développement <a name = "feuille-de-route-de-développement"></a>

### 🌍 Écritures/langues prises en charge <a name = "écritureslangues-prises-en-charge"></a>

- [ ] Hanzi
  - [ ] Mandarin (prévu pour v1.3.0)
  - [ ] Cantonais
  - [ ] Autres dialectes...
- [X] Hangul
- [x] Japonais
  - [x] Kana (romaji)
  - [ ] Kanji
  - [ ] Katakana (langue d'origine, par exemple anglais)
- [ ] Cyrillique
  - [ ] Russe
  - [ ] Ukrainien
  - [ ] Autres langues...
- [ ] Arabe
  - [ ] Arabe
  - [ ] Autres langues...
- [ ] Tibétain
- [ ] Autres écritures/langues...

### ✅ Liste des tâches

- [ ] Support des raccourcis clavier
- [x] Support i18n
- [ ] Développement de la page des paramètres
- [ ] Personnalisation du style des annotations
- [ ] Support audio de la prononciation
- [ ] Support de plus de langues
- [ ] Adaptation aux principaux navigateurs

## ❓ FAQ <a name = "faq"></a>

**Q: Quels navigateurs sont pris en charge ?**
R: Actuellement, Chrome et les navigateurs basés sur Chromium (par exemple Edge) sont pris en charge.

**Q: Comment mettre à jour l'extension ?**
R: Il suffit de télécharger la dernière version et de recharger.

**Q: L'extension collecte-t-elle des données utilisateur ?**
R: Non. En fait, l'extension n'a pas besoin de collecter des données utilisateur.

## 🤝 Contribuer <a name = "contribuer"></a>

Les contributions au projet RomanizeMe sont les bienvenues ! Si vous avez des questions, des suggestions ou des contributions de code, veuillez suivre ces étapes :

1. Créez un Issue sur GitHub décrivant le problème.
2. Forkez le dépôt et effectuez les modifications dans votre environnement local.
3. Soumettez une Pull Request avec une description détaillée de vos modifications.

## 🙏 Remerciements <a name = "remerciements"></a>

Merci au projet [Tiny Segmenter](http://www.chasen.org/~taku/software/TinySegmenter/). Il s'agit d'une bibliothèque JavaScript pour la segmentation de texte japonais, fournissant une fonctionnalité essentielle pour RomanizeMe. Tiny Segmenter est un logiciel libre disponible sous licence BSD modifiée.

## 📜 Licence <a name = "licence"></a>

RomanizeMe est distribué sous la [licence MIT](/LICENSE).

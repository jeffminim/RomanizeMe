<p align="center">
  <a href="https://github.com/jeffminim/RomanizeMe" rel="noopener">
 <img width=200px height=200px src="../assets/romanizemelogo256.png" alt="RomanizeMe - Logo de l'extension de navigateur"></a>
  <br>
  <a href="./README.zh.md">中文</a> | <a href="../README.md">English</a> | <a href="./README.ja.md">日本語</a> | <a href="./README.ko.md">한국어</a> | <a href="./README.fr.md">Français</a> | <a href="./README.ru.md">Русский</a>
</p>

<h3 align="center">RomanizeMe - Extension de navigateur pour romaniser les écritures non latines</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](../LICENSE)
[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/nmakcdfenoniomkbnnmpommgnaondfhk
)](https://chromewebstore.google.com/detail/romanizeme/nmakcdfenoniomkbnnmpommgnaondfhk)
[![Edge Add-ons](https://img.shields.io/badge/Edge_Store-RomanizeMe-blue)](https://microsoftedge.microsoft.com/addons/detail/fdeofmabkieoopbbehanpfjglmidjjai)
[![Version](https://img.shields.io/badge/version-2.1.0-blue.svg)](https://github.com/jeffminim/RomanizeMe/releases/tag/v2.1.0)

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

- [Chrome](https://chromewebstore.google.com/detail/romanizeme/nmakcdfenoniomkbnnmpommgnaondfhk)

- [Edge](https://microsoftedge.microsoft.com/addons/detail/fdeofmabkieoopbbehanpfjglmidjjai)

- ~~Firefox~~ (Pas encore supporté. Recherche en cours pour l'adaptation à Firefox.)

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

- 1.3.0 & 1.3.1 (2025-02-05)
  - Support du mandarin (prévu pour v1.3.0)
  - Optimisation de l'effet d'affichage en cas de débordement

- 2.0.0 (2025-2-22)
  - Refonte complète du programme avec React+Plasmo, optimisation de la logique d'exécution
  - Ajout de notifications Toast (lors de la conversion et de la restauration)
  - Optimisation du style de l'interface utilisateur
  - 2.0.1
    - Ajustement de certaines fonctionnalités en fonction des différents navigateurs
  - 2.0.2
    - Optimisation considérable de l'algorithme de conversion pour éviter le blocage de la page
    - Correction du problème d'affichage de l'interface utilisateur lors de la réinitialisation des paramètres
  - 2.0.3
    - Conformité aux exigences d'examen du Chrome Web Store, correction de certains bugs
  - 2.0.4
    - Optimisation du style d'affichage en cas de débordement

- 2.1.0 (2025-3-8)
  - Ajout du support des écritures cyrilliques (russe, ukrainien, mongol, serbe)
  - Ajout du support de la langue russe pour l'interface utilisateur

## 📅 Feuille de route de développement <a name = "feuille-de-route-de-développement"></a>

### 🌍 Écritures/langues prises en charge <a name = "écritureslangues-prises-en-charge"></a>

- [x] Hanzi
  - [x] Mandarin
  - [ ] Cantonais
  - [ ] Autres dialectes...
- [x] Hangul
- [x] Japonais
  - [x] Kana (romaji)
  - [ ] Kanji
  - [ ] Katakana (langue d'origine, par exemple anglais)
- [x] Cyrillique
  - [x] Russe
  - [x] Ukrainien
  - [x] Mongol
  - [x] Serbe
  - [ ] Autres langues...
- [ ] Arabe
  - [ ] Arabe
  - [ ] Autres langues...
- [ ] Langues d'Asie du Sud-Est
  - [ ] Thaï
  - [ ] Vietnamien
  - [ ] Khmer
  - [ ] Birman
  - [ ] Lao
  - [ ] Autres langues...
- [ ] Autres langues chinoises
  - [ ] Tibétain
  - [ ] Mongol (Mongolie intérieure)
  - [ ] Plus de langues...
- [ ] Autres écritures/langues...

### ✅ Liste des tâches

- [ ] Support des raccourcis clavier
- [ ] Augmenter les pages de guide et d'exemple des fonctionnalités
- [x] Support i18n
- [x] Développement de la page des paramètres
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

Un grand merci au projet [Pinyin-Pro](https://pinyin-pro.cn/), qui est une bibliothèque JavaScript pour la conversion du chinois en pinyin, avec une reconnaissance précise des homophones, légère, performante et riche en fonctionnalités. Pinyin-Pro est un logiciel libre, utilisable et redistribuable sous la licence MIT.

## 📜 Licence <a name = "licence"></a>

RomanizeMe est distribué sous la [licence MIT](../LICENSE).

import { romanizeText, restorePage } from '../content/content.js';

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('romanize-button').addEventListener('click', function() {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      console.log("Tabs queried:", tabs);
      const tabId = tabs[0].id;
      const selectedLanguages = getSelectedLanguages();
       chrome.scripting.executeScript({
        target: { tabId },
        func: romanizePage,
        args: [selectedLanguages]
      }, (results) => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
          return;
        }
        console.log("Script executed:", results);
      });
    });
  });

  document.getElementById("restore-button").addEventListener("click", () => {
    console.log("Restore button clicked");
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0].id;
      chrome.scripting.executeScript({
        target: { tabId },
        func: restorePage
      });
    });
  });
});

function getSelectedLanguages() {
  const selectedLanguages = [];
  if (document.getElementById("lang-japanese").checked) selectedLanguages.push('japanese');
  if (document.getElementById("lang-korean").checked) selectedLanguages.push('korean');
  if (document.getElementById("lang-arabic").checked) selectedLanguages.push('arabic');
  if (document.getElementById("lang-russian").checked) selectedLanguages.push('russian');
  return selectedLanguages;
}

function romanizePage(selectedLanguages) {
  const elements = document.querySelectorAll('*');
  elements.forEach(element => {
    console.log("Processing element:", element);
    const originalText = element.textContent;
    const romanizedText = romanizeText(originalText, selectedLanguages);
    if (originalText !== romanizedText) {
      element.innerHTML = romanizedText;
      element.classList.add('romanized');
      element.setAttribute('data-original-text', originalText);
    }
  });
}
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('romanize-button').addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      console.log("Tabs queried:", tabs);
      const tabId = tabs[0].id;
      const selectedLanguages = getSelectedLanguages();
      
      // 注入内容脚本
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ['content/content.js']
      }).then(() => {
        // 执行 romanizePage 函数
        chrome.scripting.executeScript({
          target: { tabId: tabId },
          func: (languages) => {
            // 确保 romanizePage 在全局作用域可用
            window.romanizePage(languages);
          },
          args: [selectedLanguages]
        }).then(() => {
          console.log('Romanization completed');
        }).catch((err) => {
          console.error('Error during romanization:', err);
        });
      }).catch((err) => {
        console.error('Error injecting content script:', err);
      });
    });
  });

  document.getElementById("restore-button").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0].id;
      chrome.scripting.executeScript({
        target: { tabId },
        func: () => {
          // 确保 restorePage 在全局作用域可用
          window.restorePage();
        }
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
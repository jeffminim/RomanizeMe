document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('romanize-button').addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0].id;
      const selectedLanguages = getSelectedLanguages();
      chrome.scripting.executeScript({
        target: { tabId },
        // func: romanizePage,
        func: () => {
          console.log('罗马音化按钮被点击');
        },
        args: [selectedLanguages]
      }, () => {
        console.log("Script executed");
      });
    });
  });

  document.getElementById("restore-button").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0].id;
      chrome.scripting.executeScript({
        target: { tabId },
        // func: restorePage
        func: () => {
          console.log("还原按钮被点击");
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

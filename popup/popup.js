document.getElementById("romanize-button").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0].id;
      const selectedLanguages = getSelectedLanguages();
      chrome.scripting.executeScript({
        target: { tabId },
        func: romanizePage,
        args: [selectedLanguages]
      });
    });
  });
  
  document.getElementById("restore-button").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0].id;
      chrome.scripting.executeScript({
        target: { tabId },
        func: restorePage
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
  
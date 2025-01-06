document.addEventListener('DOMContentLoaded', function() {
  // 获取按钮和语言选择框元素
  const romanizeButton = document.getElementById('romanize-button');
  const restoreButton = document.getElementById('restore-button');
  
  // 分别获取可用和禁用的语言选择框
  const availableCheckboxes = document.querySelectorAll('input[type="checkbox"]:not([disabled])');
  const disabledCheckboxes = document.querySelectorAll('input[type="checkbox"][disabled]');
  
  // 初始状态设置
  restoreButton.disabled = true;  // 初始时"还原"按钮禁用

  // 罗马音化按钮点击事件
  romanizeButton.addEventListener('click', function() {
    const selectedLanguages = getSelectedLanguages();
    
    if (selectedLanguages.length === 0) {
      alert('请至少选择一种语言');
      return;
    }

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0].id;
      
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ['content/content.js']
      }).then(() => {
        chrome.scripting.executeScript({
          target: { tabId: tabId },
          func: (languages) => {
            window.romanizePage(languages);
          },
          args: [selectedLanguages]
        }).then(() => {
          // 更新按钮状态
          romanizeButton.disabled = true;
          restoreButton.disabled = false;
          
          // 只禁用可用的语言选择框
          availableCheckboxes.forEach(checkbox => {
            checkbox.disabled = true;
          });
        });
      });
    });
  });

  // 还原按钮点击事件
  restoreButton.addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0].id;
      chrome.scripting.executeScript({
        target: { tabId },
        func: () => {
          window.restorePage();
        }
      }).then(() => {
        // 更新按钮状态
        romanizeButton.disabled = false;
        restoreButton.disabled = true;
        
        // 只启用原本可用的语言选择框
        availableCheckboxes.forEach(checkbox => {
          checkbox.disabled = false;
        });
        
        // 确保开发中的选择框保持禁用状态
        disabledCheckboxes.forEach(checkbox => {
          checkbox.disabled = true;
          checkbox.checked = false; // 确保未选中状态
        });
      });
    });
  });
});

function getSelectedLanguages() {
  const selectedLanguages = [];
  if (document.getElementById("lang-japanese").checked) selectedLanguages.push('japanese');
  if (document.getElementById("lang-korean").checked) selectedLanguages.push('korean');
  // 不检查禁用的选择框
  return selectedLanguages;
}
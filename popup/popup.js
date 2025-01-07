document.addEventListener('DOMContentLoaded', async function() {
  const romanizeButton = document.getElementById('romanize-button');
  const restoreButton = document.getElementById('restore-button');
  
  // 加载语言配置
  const response = await fetch(chrome.runtime.getURL('config/languages.json'));
  const config = await response.json();
  
  // 初始化时检查当前页面状态
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tabId = tabs[0].id;
    
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      func: () => {
        return document.querySelectorAll('.romanized').length > 0;
      }
    }).then((results) => {
      const isCurrentPageRomanized = results[0].result;
      
      if (isCurrentPageRomanized) {
        // 从存储中获取选中的脚本和语言
        chrome.storage.local.get(['selectedScripts'], function(result) {
          romanizeButton.disabled = true;
          restoreButton.disabled = false;
          
          if (result.selectedScripts) {
            restoreRadioSelections(result.selectedScripts);
            disableAllRadios(true);
          }
        });
      } else {
        romanizeButton.disabled = false;
        restoreButton.disabled = true;
        
        // 恢复上次的选择
        chrome.storage.local.get(['selectedScripts'], function(result) {
          if (result.selectedScripts) {
            restoreRadioSelections(result.selectedScripts);
          }
        });
      }
    });
  });

  // 罗马音化按钮点击事件
  romanizeButton.addEventListener('click', function() {
    const selectedScripts = getSelectedScripts();
    
    if (Object.keys(selectedScripts).length === 0) {
      alert('请至少选择一种文字的语言');
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
          func: (scripts, config) => {
            window.romanizePage(scripts, config);
          },
          args: [selectedScripts, config]
        }).then(() => {
          romanizeButton.disabled = true;
          restoreButton.disabled = false;
          disableAllRadios(true);
          
          chrome.storage.local.set({
            isRomanized: true,
            selectedScripts: selectedScripts
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
        romanizeButton.disabled = false;
        restoreButton.disabled = true;
        disableAllRadios(false);
        
        chrome.storage.local.set({
          isRomanized: false
        });
      });
    });
  });
});

// 获取选中的脚本和语言
function getSelectedScripts() {
  const selectedScripts = {};
  document.querySelectorAll('.script-item').forEach(item => {
    const scriptCheckbox = item.querySelector('.script-checkbox');
    const scriptHeader = item.querySelector('.script-header label').textContent;
    const selectedRadio = item.querySelector('input[type="radio"]:checked');
    
    if (scriptCheckbox && scriptCheckbox.checked && selectedRadio && !selectedRadio.disabled) {
      selectedScripts[scriptHeader] = selectedRadio.value;
    }
  });
  return selectedScripts;
}

// 恢复单选按钮选择
function restoreRadioSelections(selections) {
  Object.entries(selections).forEach(([script, language]) => {
    const radio = document.querySelector(`input[type="radio"][value="${language}"]`);
    if (radio) {
      radio.checked = true;
    }
  });
}

// 禁用/启用所有单选按钮
function disableAllRadios(disabled) {
  document.querySelectorAll('.script-group:not(.disabled) input[type="radio"]')
    .forEach(radio => {
      radio.disabled = disabled;
    });
}

// 添加复选框和单选按钮的联动
document.querySelectorAll('.script-checkbox').forEach(checkbox => {
  checkbox.addEventListener('change', function() {
    const scriptItem = this.closest('.script-item');
    const radioButtons = scriptItem.querySelectorAll('input[type="radio"]');
    
    radioButtons.forEach(radio => {
      radio.disabled = !this.checked;
    });
    
    // 如果取消选中复选框，同时取消选中对应的单选按钮
    if (!this.checked) {
      radioButtons.forEach(radio => radio.checked = false);
    } else {
      // 如果选中复选框，默认选中第一个单选按钮
      radioButtons[0].checked = true;
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const scriptCheckboxes = document.querySelectorAll('.script-checkbox');

  scriptCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      const scriptSection = this.closest('.script-section');
      const radioOptions = scriptSection.querySelectorAll('.radio-option input[type="radio"]');

      // 根据复选框的状态更新卡片的样式和单选框的可用性
      if (this.checked) {
        scriptSection.classList.add('active'); // 添加选中样式
        radioOptions.forEach(radio => {
          radio.disabled = false; // 启用单选框
        });
        scriptSection.style.borderColor = '#1a73e8'; // 设置边框颜色为蓝色
      } else {
        scriptSection.classList.remove('active'); // 移除选中样式
        radioOptions.forEach(radio => {
          radio.disabled = true; // 禁用单选框
          radio.checked = false; // 取消选中状态
        });
        scriptSection.style.borderColor = '#e0e0e0'; // 恢复边框颜色
      }
    });

    // 初始化时禁用未选中的单选框
    const scriptSection = checkbox.closest('.script-section');
    const radioOptions = scriptSection.querySelectorAll('.radio-option input[type="radio"]');
    if (!checkbox.checked) {
      radioOptions.forEach(radio => {
        radio.disabled = true; // 禁用单选框
      });
    }
  });
});
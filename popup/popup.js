document.addEventListener('DOMContentLoaded', async function() {
  const romanizeButton = document.getElementById('romanize-button');
  const restoreButton = document.getElementById('restore-button');
  
  // 加载语言配置
  const response = await fetch(chrome.runtime.getURL('config/languages.json'));
  const config = await response.json();
  
  // 生成动态内容
  generateScriptSections(config);
  
  // 初始化按钮状态
  updateRomanizeButtonState();

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

  // 添加罗马音转换按钮点击事件
  romanizeButton.addEventListener('click', async () => {
    const selectedScripts = [];
    
    // 获取所有选中的语言及其对应的转换函数信息
    document.querySelectorAll('input[type="radio"]:checked').forEach(radio => {
      if (!radio.disabled) {
        const scriptId = radio.name.replace('-lang', '');
        const languageId = radio.value;
        
        // 从配置中找到对应的语言配置
        const script = config.scripts.find(s => s.id === scriptId);
        const language = script.languages.find(l => l.id === languageId);
        
        console.log('Selected language config:', language);

        selectedScripts.push({
          scriptId: scriptId,
          languageId: languageId,
          libFile: language.libFile,
          functionName: language.functionName
        });
      }
    });

    console.log('Selected scripts:', selectedScripts);

    if (selectedScripts.length > 0) {
      try {
        // 获取当前标签页
        const tabs = await chrome.tabs.query({active: true, currentWindow: true});
        if (!tabs[0]) {
          console.error('No active tab found');
          return;
        }

        // 直接发送消息到 content.js
        const response = await chrome.tabs.sendMessage(tabs[0].id, {
          action: 'romanize',
          scripts: selectedScripts
        });

        console.log('Message sent, response:', response);
        
        romanizeButton.disabled = true;
        restoreButton.disabled = false;
      } catch (error) {
        console.error('Error:', error);
      }
    }
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

function generateScriptSections(config) {
  const container = document.getElementById('script-sections-container');
  container.innerHTML = '';

  config.scripts.forEach(script => {
    // 创建卡片容器
    const section = document.createElement('div');
    section.className = 'script-section';

    // 创建卡片头部（包含文字类型名称和开关）
    const header = document.createElement('div');
    header.className = 'section-header';
    header.innerHTML = `
      <span>${script.name}</span>
      <div class="switch">
        <input type="checkbox" class="script-checkbox" id="script-${script.id}">
        <label for="script-${script.id}"></label>
      </div>
    `;
    section.appendChild(header);

    // 创建语言选项容器
    const options = document.createElement('div');
    options.className = 'language-options';

    // 遍历并创建每个语言选项
    script.languages.forEach(lang => {
      const option = document.createElement('label');
      option.className = 'radio-option';
      option.innerHTML = `
        <input type="radio" 
               name="${script.id}-lang" 
               value="${lang.id}"
               data-available="${lang.isAvailable}"
               checked="false">
        <span>${lang.name}</span>
      `;
      options.appendChild(option);
    });

    section.appendChild(options);
    container.appendChild(section);

    // 获取当前卡片的开关和选项
    const checkbox = section.querySelector(`#script-${script.id}`);
    const radios = options.querySelectorAll('input[type="radio"]');

    // 初始化状态
    checkbox.checked = false; // 开关默认关闭
    radios.forEach(radio => {
      radio.checked = false; // 明确设置所有选项为未选中
      radio.disabled = true; // 初始状态下禁用所有选项
    });

    // 添加开关事件监听
    checkbox.addEventListener('change', () => {
      const isChecked = checkbox.checked;
      
      radios.forEach(radio => {
        const isAvailable = radio.getAttribute('data-available') === 'true';
        // 如果开关打开且语言可用，则启用选项；否则禁用
        radio.disabled = !isChecked || !isAvailable;
        
        // 如果开关关闭，取消选中所有选项
        if (!isChecked) {
          radio.checked = false;
        }
      });

      // 更新罗马音转换按钮状态
      updateRomanizeButtonState();
    });

    // 为每个radio添加change事件监听
    radios.forEach(radio => {
      radio.addEventListener('change', () => {
        updateRomanizeButtonState();
      });
    });
  });
}

// 添加检查选中状态的函数
function updateRomanizeButtonState() {
  const romanizeButton = document.getElementById('romanize-button');
  const hasSelection = Array.from(document.querySelectorAll('input[type="radio"]'))
    .some(radio => radio.checked && !radio.disabled);
  
  romanizeButton.disabled = !hasSelection;
}
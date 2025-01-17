let currentLocale = getBrowserLanguage(); // 默认语言
let localesConfig = null;

document.addEventListener('DOMContentLoaded', async function() {
  const romanizeButton = document.getElementById('romanize-button');
  const restoreButton = document.getElementById('restore-button');
  
  // 加载语言配置
  const response = await fetch(chrome.runtime.getURL('config/languages.json'));
  window.languageConfig = await response.json();
  
  // 加载语言配置
  const localesResponse = await fetch(chrome.runtime.getURL('config/locales.json'));
  localesConfig = await localesResponse.json();
  
  // 初始化语言选择器
  initializeLanguageSelector();
  
  // 从存储中获取上次选择的语言,如果没有则使用浏览器语言
  chrome.storage.local.get(['selectedLocale'], function(result) {
    if (result.selectedLocale) {
      currentLocale = result.selectedLocale;
    }
    // 设置语言选择器的值
    document.getElementById('language-selector').value = currentLocale;
    // 更新界面语言
    updateUILanguage();
  });
  
  // 生成动态内容
  generateScriptSections(window.languageConfig);
  
  // 初始化按钮状态
  updateRomanizeButtonState();

  // 初始化时检查当前页面状态
  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    const tabId = tabs[0].id;
    
    try {
      // 检查页面是否已经被转换
      const results = await chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: () => {
          return document.querySelectorAll('.romanized-word').length > 0;
        }
      });
      
      const isCurrentPageRomanized = results[0].result;
      
      if (isCurrentPageRomanized) {
        // 从存储中获取选中的脚本和语言
        chrome.storage.local.get(['selectedScripts'], function(result) {
          if (result.selectedScripts) {
            // 恢复选中状态
            restoreSelections(result.selectedScripts);
            // 更新 UI 状态
            updateUIAfterRomanization();
          }
        });
      } else {
        // 确保 UI 处于重置状态
        resetUIState();
      }
    } catch (error) {
      console.error('Error checking page state:', error);
      // 发生错误时也确保 UI 处于重置状态
      resetUIState();
    }
  });

  // 添加罗马音转换按钮点击事件
  romanizeButton.addEventListener('click', async () => {
    const selectedScripts = [];
    
    // 获取选中的语言及其对应的转换函数信息
    const selectedRadio = document.querySelector('input[type="radio"]:checked');
    if (selectedRadio) {
      // 现在value直接包含scriptId和languageId，用分隔符连接
      const [scriptId, languageId] = selectedRadio.value.split('|');
      
      // 从配置中找到对应的语言配置
      const script = window.languageConfig.scripts.find(s => s.scriptId === scriptId);
      const language = script.languages.find(l => l.id === languageId);
      
      selectedScripts.push({
        scriptId: scriptId,
        languageId: languageId,
        libFile: language.libFile,
        functionName: language.functionName,
        segmentation: language.segmentation
      });
    }
    
    if (selectedScripts.length > 0) {
      try {
        const tabs = await chrome.tabs.query({active: true, currentWindow: true});
        if (!tabs[0]) {
          console.error('No active tab found');
          return;
        }
        
        // 发送消息到 content.js
        await chrome.tabs.sendMessage(tabs[0].id, {
          action: 'romanize',
          scripts: selectedScripts
        });
        
        // 保存当前状态
        await chrome.storage.local.set({ 
          selectedScripts: selectedScripts,
          lastSelection: selectedScripts  // 保存最后一次的选择
        });
        
        // 更新 UI 状态
        updateUIAfterRomanization();
        
      } catch (error) {
        console.error('Error:', error);
      }
    }
  });

  // 更新 UI 状态的函数
  function updateUIAfterRomanization() {
    // 1. 禁用所有单选框
    document.querySelectorAll('input[type="radio"]').forEach(input => {
      input.disabled = true;
    });

    // 2. 高亮选中的卡片
    document.querySelectorAll('.script-section').forEach(section => {
      const radio = section.querySelector('input[type="radio"]:checked');
      if (radio) {
        section.style.backgroundColor = '#e8f0fe';
        section.style.borderColor = '#1a73e8';
      }
    });

    // 3. 更新按钮状态和样式
    const romanizeButton = document.getElementById('romanize-button');
    const restoreButton = document.getElementById('restore-button');

    romanizeButton.disabled = true;
    romanizeButton.style.backgroundColor = '#e0e0e0';
    romanizeButton.style.cursor = 'not-allowed';

    restoreButton.disabled = false;
    restoreButton.style.backgroundColor = '#dc3545';
    restoreButton.style.borderColor = '#dc3545';
    restoreButton.style.color = 'white';
    restoreButton.style.cursor = 'pointer';
  }

  // 还原按钮点击事件
  restoreButton.addEventListener('click', async function() {
    try {
      const tabs = await chrome.tabs.query({active: true, currentWindow: true});
      if (!tabs[0]) {
        console.error('No active tab found');
        return;
      }

      // 发送还原消息
      await chrome.tabs.sendMessage(tabs[0].id, {
        action: 'restore'
      });

      // 清除所有存储的状态
      await chrome.storage.local.remove(['selectedScripts', 'lastSelection']);

      // 重置 UI 状态
      resetUIState();

      // 移除所有激活状态
      document.querySelectorAll('.radio-option').forEach(option => {
        option.classList.remove('active');
      });

    } catch (error) {
      console.error('Error:', error);
    }
  });

  // 重置 UI 状态的函数
  function resetUIState() {
    // 1. 重置卡片样式
    document.querySelectorAll('.script-section').forEach(section => {
      section.style.backgroundColor = '';
      section.style.borderColor = '#e0e0e0';
    });

    // 2. 重置按钮状态和样式
    const romanizeButton = document.getElementById('romanize-button');
    const restoreButton = document.getElementById('restore-button');

    romanizeButton.disabled = false;
    romanizeButton.style.backgroundColor = '';
    romanizeButton.style.cursor = 'pointer';

    restoreButton.disabled = true;
    restoreButton.style.backgroundColor = '';
    restoreButton.style.borderColor = '';
    restoreButton.style.color = '';
    restoreButton.style.cursor = 'not-allowed';

    // 3. 启用所有单选框
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
      radio.disabled = false;
      radio.checked = false;
    });
  }
});


// 恢复选择状态的函数
function restoreSelections(selectedScripts) {
  selectedScripts.forEach(script => {
    // 直接查找对应的单选框
    const radio = document.querySelector(`input[name="language-option"][value="${script.scriptId}|${script.languageId}"]`);
    if (radio) {
      radio.checked = true;
      // 触发UI更新
      const section = radio.closest('.script-section');
      if (section) {
        section.style.backgroundColor = '#e8f0fe';
        section.style.borderColor = '#1a73e8';
      }
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

function generateScriptSections(config) {
  const container = document.getElementById('script-sections-container');
  if (!container) {
    console.error('Container element not found');
    return;
  }
  container.innerHTML = '';

  // 确保config和scripts存在
  if (!config || !Array.isArray(config.scripts)) {
    console.error('Invalid config format');
    return;
  }

  // 过滤出启用的脚本
  config.scripts.filter(script => script && script.isEnabled).forEach(script => {
    // 确保脚本有语言选项
    if (!script.languages || !Array.isArray(script.languages)) {
      console.warn(`Script "${script.name}" does not have valid languages.`);
      return;
    }

    // 过滤出可用的语言
    const availableLanguages = script.languages.filter(lang => lang && lang.isAvailable);
    
    // 如果有可用的语言才创建卡片
    if (availableLanguages.length > 0) {
      // 创建卡片容器
      const section = document.createElement('div');
      section.className = 'script-section';
      section.setAttribute('data-script-id', script.scriptId);

      // 创建卡片头部（包含文字类型名称）
      const header = document.createElement('div');
      header.className = 'section-header';
      header.innerHTML = `<span>${script.name || 'Unnamed Script'}</span>`;
      section.appendChild(header);

      // 创建语言选项容器
      const options = document.createElement('div');
      options.className = 'script-section-options';

      availableLanguages.forEach(lang => {
        const option = document.createElement('label');
        option.className = 'radio-option';
        option.innerHTML = `
          <input type="radio" 
                 name="language-option"
                 value="${script.scriptId}|${lang.id}">
          <span>${lang.name}</span>
        `;
        option.querySelector('span').setAttribute('data-language-id', lang.id);
        options.appendChild(option);
      });

      section.appendChild(options);
      container.appendChild(section);
    }
  });
}

// 添加检查选中状态的函数
function updateRomanizeButtonState() {
  const romanizeButton = document.getElementById('romanize-button');
  const hasSelection = Array.from(document.querySelectorAll('input[type="radio"]'))
    .some(radio => radio.checked && !radio.disabled);
  
  romanizeButton.disabled = !hasSelection;
}

// 在罗马音转换按钮点击事件中添加激活状态
document.getElementById('romanize-button').addEventListener('click', () => {
  // 获取当前选中的语言选项
  const selectedOption = document.querySelector('input[name="language-option"]:checked');
  
  // 移除所有激活状态
  document.querySelectorAll('.radio-option').forEach(option => {
    option.classList.remove('active');
  });
  
  // 为当前选中的选项添加激活状态
  if (selectedOption) {
    selectedOption.closest('.radio-option').classList.add('active');
  }
  
  // ... 其他转换逻辑保持不变 ...
});

function initializeLanguageSelector() {
  const languageSelector = document.getElementById('language-selector');
  languageSelector.addEventListener('change', async function(e) {
    currentLocale = e.target.value;
    // 保存语言选择
    await chrome.storage.local.set({ selectedLocale: currentLocale });
    updateUILanguage();
  });
}

function updateUILanguage() {
  // 版本号
  const versionText = '1.0';

  // 更新按钮文本
  document.getElementById('romanize-button').textContent = 
    localesConfig.ui.buttons.romanize[currentLocale];
  document.getElementById('restore-button').textContent = 
    localesConfig.ui.buttons.restore[currentLocale];
  
  // 更新标题
  document.querySelector('.list-card h2 span').textContent = 
    localesConfig.ui.title[currentLocale];
  
  // 更新版本文本
  document.querySelector('.version').textContent = 
    `${localesConfig.ui.version[currentLocale]}: ${versionText}`;
    
  // 更新脚本和语言选项的文本
  updateScriptSectionsLanguage();
}

function updateScriptSectionsLanguage() {
  const sections = document.querySelectorAll('.script-section');
  sections.forEach(section => {
    const scriptId = section.getAttribute('data-script-id');
    const scriptConfig = window.languageConfig.scripts.find(s => s.scriptId === scriptId);
    
    if (scriptConfig) {
      // 更新脚本名称
      section.querySelector('.section-header span').textContent = 
        scriptConfig.name[currentLocale];
      
      // 更新语言选项
      const options = section.querySelectorAll('.radio-option span');
      options.forEach(option => {
        const languageId = option.getAttribute('data-language-id');
        const language = scriptConfig.languages.find(l => l.id === languageId);
        if (language) {
          option.textContent = language.name[currentLocale];
        }
      });
    }
  });
}

// 获取浏览器默认语言
function getBrowserLanguage() {
  // 获取完整的浏览器语言代码 (例如 "zh-CN", "en-US")
  const fullLang = navigator.language;
  
  // 提取主要语言代码 (例如 "zh", "en")
  const primaryLang = fullLang.split('-')[0];
  
  // 检查是否支持该语言,支持的语言有: zh, en, ja, ko
  const supportedLanguages = ['zh', 'en', 'ja', 'ko'];
  
  if (supportedLanguages.includes(primaryLang)) {
    return primaryLang;
  }
  
  // 如果不支持,默认返回英文
  return 'en';
}
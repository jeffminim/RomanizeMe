// 动态加载本地pinyin-pro
const script = document.createElement('script');
script.src = chrome.runtime.getURL('libs/extra/pinyin-pro@3.26.0.js');
script.onload = () => {
  console.log('pinyin-pro loaded');
  
  // 添加详细的初始化检查
  if (typeof pinyinPro !== 'undefined' && 
      pinyinPro.pinyin && 
      typeof pinyinPro.pinyin === 'function' &&
      pinyinPro.pinyin.version === '3.26.0') {
    console.log('pinyinPro initialized successfully');
    window.pinyinProLoaded = true;
  } else {
    console.error('pinyinPro not initialized correctly');
    console.log('pinyinPro object:', pinyinPro);
    window.pinyinProLoaded = false;
  }
};
script.onerror = (error) => {
  console.error('Failed to load pinyin-pro:', error);
  window.pinyinProLoaded = false;
};
document.head.appendChild(script); 
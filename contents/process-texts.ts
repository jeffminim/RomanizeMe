import type { Language } from "~types/languages";

// 动态加载转换组件
async function loadConverter(componentName: string) {
  try {
    const module = await import(`~contents/converter/index`);
    return module[componentName];
  } catch (error) {
    console.error(`Failed to load converter: ${componentName}`, error);
    return null;
  }
}

// 处理文本转换的主函数
export async function processTexts(
  texts: string[],
  selectedLanguage: Language
): Promise<string[]> {
  if (!texts.length || !selectedLanguage) {
    return [];
  }

  // 获取当前语言的转换组件
  const componentName = selectedLanguage.romanizationComponent;
  if (!componentName) {
    console.warn("No romanization component found for the selected language");
    return texts;
  }

  // 加载转换组件
  const converter = await loadConverter(componentName);
  if (!converter) {
    return texts;
  }

  // 创建文档片段以批量处理DOM操作
  const fragment = document.createDocumentFragment();
  const processedTexts: string[] = [];
  
  // 批量处理文本转换
  const promises = texts.map(text => converter(text));
  const results = await Promise.all(promises);

  // 创建一个Map来存储转换结果
  const romanizationMap = new Map<string, string>();
  texts.forEach((text, index) => {
    romanizationMap.set(text, results[index]);
  });

  // 批量处理DOM更新
  const wordSpans = document.querySelectorAll(`span[rm-marker="word"]`);
  wordSpans.forEach(wordSpan => {
    const text = wordSpan.textContent;
    if (text && romanizationMap.has(text)) {
      const romanizedText = romanizationMap.get(text);
      
      // 创建ruby标签结构
      const ruby = document.createElement('ruby');
      ruby.setAttribute('rm-marker', 'obj');
      const rpStart = document.createElement('rp');
      const rt = document.createElement('rt');
      const rpEnd = document.createElement('rp');
      
      // 设置内容
      rpStart.textContent = '(';
      rt.textContent = romanizedText;
      rpEnd.textContent = ')';
      
      // 构建结构
      ruby.appendChild(wordSpan.cloneNode(true)); // 保留原文本
      ruby.appendChild(rpStart);
      ruby.appendChild(rt);
      ruby.appendChild(rpEnd);
      
      // 替换原来的span
      wordSpan.replaceWith(ruby);
      
      processedTexts.push(romanizedText);
    }
  });

  return processedTexts;
}

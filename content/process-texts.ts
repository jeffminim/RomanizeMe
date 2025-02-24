import type { Language } from "~types/languages";

// 动态加载转换组件
async function loadConverter(componentName: string) {
  try {
    const module = await import(`~contents/converter/${componentName}`);
    return module.default;
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

  // 逐个转换文本
  const processedTexts: string[] = [];
  for (const text of texts) {
    try {
      const processedText = await converter(text);
      processedTexts.push(processedText);
    } catch (error) {
      console.error(`Error processing text: ${text}`, error);
      processedTexts.push(text); // 转换失败时保留原文本
    }
  }

  return processedTexts;
}

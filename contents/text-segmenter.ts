import type { Script } from "~types/languages";
import { TextSegmentation } from "~types/text-segmentation";
import { isCharInScript } from "./scan-texts";

import { segment as chineseSegmenter, addDict, OutputFormat } from 'pinyin-pro';
import ModernDict from '@pinyin-pro/data/modern';
addDict(ModernDict);

export class TextSegmenter {
  static segmentText(
    text: string,
    segmentation: TextSegmentation,
    scripts?: Script[]
  ): string[] {
    if (scripts) {
      const targetChars: string[] = [];
      let currentSegment = '';
      
      for (const char of text) {
        if (isCharInScript(char, scripts)) {
          currentSegment += char;
        } else if (currentSegment) {
          targetChars.push(currentSegment);
          currentSegment = '';
        }
      }
      
      if (currentSegment) {
        targetChars.push(currentSegment);
      }
      
      if (!targetChars.length) {
        return [];
      }
      
      text = targetChars.join('');
    }

    switch (segmentation) {
      case TextSegmentation.CHAR:
        return this.splitTextByChar(text);
      case TextSegmentation.WORD:
        return this.splitTextByWord(text);
      case TextSegmentation.CHN:
        return this.tokenizeChinese(text);
      case TextSegmentation.JPN:
        return this.tokenizeJapanese(text);
      default:
        return [text];
    }
  }

  // 按字分割文本
  private static splitTextByChar(text: string): string[] {
    return Array.from(text);
  }

  // 按词分割文本
  private static splitTextByWord(text: string): string[] {
    const words: string[] = [];
    let currentWord = "";

    for (let i = 0; i < text.length; i++) {
      const char = text[i];

      if (
        char.trim() === "" ||
        /[.,!?;:，。！？；：]/.test(char)
      ) {
        if (currentWord) {
          words.push(currentWord);
          currentWord = "";
        }
        words.push(char);
      } else {
        currentWord += char;
      }
    }

    if (currentWord) {
      words.push(currentWord);
    }

    return words;
  }

  // 日文分词
  private static tokenizeJapanese(text: string): string[] {
    try {
      const segmenter = new Intl.Segmenter("ja", { granularity: "word" });
      return Array.from(segmenter.segment(text))
        .map(segment => segment.segment);
    } catch (error) {
      console.error("Error in tokenizeJapanese:", error);
      return [text];
    }
  }

  // 中文分词
  private static tokenizeChinese(text: string): string[] {
    try {
      return Array.from(chineseSegmenter(text,{format: OutputFormat.ZhSegment}))
    } catch (error) {
      console.error("Error in tokenizeChinese:", error);
      return [text];
    }
  }

  // private static tokenizeChinese(text: string): string[] {
  //   try {
  //     const segmenter = new Intl.Segmenter("zh", { granularity: "word" });
  //     return Array.from(segmenter.segment(text))
  //       .map(segment => segment.segment);
  //   } catch (error) {
  //     console.error("Error in tokenizeChinese:", error);
  //     return [text];
  //   }
  // }

  // 新的wrap方法，用于包装分词后的结果
  static wrapSegmentedText(container: HTMLElement, segments: string[]): void {
    // 清空原有内容
    container.innerHTML = '';

    // 为每个分词创建新的span
    segments.forEach(segment => {
      const span = document.createElement('span');
      span.textContent = segment;
      // 添加rm-marker属性
      span.setAttribute('rm-marker', 'word');
      // 添加romanize-word class
      span.classList.add('romanized-word');
      container.appendChild(span);
    });
  }
}

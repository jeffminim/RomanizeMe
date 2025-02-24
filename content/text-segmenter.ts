import { TextSegmentation } from "~types/text-segmentation";

export class TextSegmenter {
  static segmentText(
    text: string,
    segmentation: TextSegmentation
  ): string[] {
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
      const segmenter = new Intl.Segmenter("zh", { granularity: "word" });
      return Array.from(segmenter.segment(text))
        .map(segment => segment.segment);
    } catch (error) {
      console.error("Error in tokenizeChinese:", error);
      return [text];
    }
  }
}

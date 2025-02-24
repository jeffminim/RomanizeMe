import { pinyin, addDict } from 'pinyin-pro';
import ModernDict from '@pinyin-pro/data/modern';
addDict(ModernDict);

export default function ChnPinyin(text: string): string {
    // 实现中文转拼音的逻辑
    return pinyin(text);
  }
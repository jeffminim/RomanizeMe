// 文本分割方式枚举
export enum TextSegmentation {
  CHAR = 'char', // 按单字分割
  WORD = 'word', // 按词组分割
  CHN = 'chn', // 按中文分词
  JPN = 'jpn', // 日文分词
  THA = 'tha', // 泰文分词
  KHM = 'khm'  // 新增高棉语分词类型
} 
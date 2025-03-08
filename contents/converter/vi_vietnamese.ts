export default function VieVietnamese(text: string): string {
  // 使用Map代替对象，提高查找性能
  const vietnameseToLatinMap = new Map<string, string>([
    // 元音和元音变音
    ['a', 'a'], ['à', 'a'], ['á', 'a'], ['ả', 'a'], ['ã', 'a'], ['ạ', 'a'],
    ['ă', 'a'], ['ằ', 'a'], ['ắ', 'a'], ['ẳ', 'a'], ['ẵ', 'a'], ['ặ', 'a'],
    ['â', 'a'], ['ầ', 'a'], ['ấ', 'a'], ['ẩ', 'a'], ['ẫ', 'a'], ['ậ', 'a'],
    ['e', 'e'], ['è', 'e'], ['é', 'e'], ['ẻ', 'e'], ['ẽ', 'e'], ['ẹ', 'e'],
    ['ê', 'e'], ['ề', 'e'], ['ế', 'e'], ['ể', 'e'], ['ễ', 'e'], ['ệ', 'e'],
    ['i', 'i'], ['ì', 'i'], ['í', 'i'], ['ỉ', 'i'], ['ĩ', 'i'], ['ị', 'i'],
    ['o', 'o'], ['ò', 'o'], ['ó', 'o'], ['ỏ', 'o'], ['õ', 'o'], ['ọ', 'o'],
    ['ô', 'o'], ['ồ', 'o'], ['ố', 'o'], ['ổ', 'o'], ['ỗ', 'o'], ['ộ', 'o'],
    ['ơ', 'o'], ['ờ', 'o'], ['ớ', 'o'], ['ở', 'o'], ['ỡ', 'o'], ['ợ', 'o'],
    ['u', 'u'], ['ù', 'u'], ['ú', 'u'], ['ủ', 'u'], ['ũ', 'u'], ['ụ', 'u'],
    ['ư', 'u'], ['ừ', 'u'], ['ứ', 'u'], ['ử', 'u'], ['ữ', 'u'], ['ự', 'u'],
    ['y', 'y'], ['ỳ', 'y'], ['ý', 'y'], ['ỷ', 'y'], ['ỹ', 'y'], ['ỵ', 'y'],
    
    // 辅音
    ['b', 'b'], ['c', 'k'], ['d', 'z'], ['đ', 'd'],
    ['g', 'g'], ['h', 'h'], ['k', 'k'], ['l', 'l'],
    ['m', 'm'], ['n', 'n'], ['p', 'p'], ['q', 'kw'],
    ['r', 'r'], ['s', 's'], ['t', 't'], ['v', 'v'],
    ['x', 's'], ['ch', 'ch'], ['gh', 'g'], ['gi', 'z'],
    ['kh', 'kh'], ['ng', 'ng'], ['ngh', 'ng'], ['nh', 'ny'],
    ['ph', 'f'], ['th', 'th'], ['tr', 'ch']
  ]);

  // 将复合辅音按长度排序，从长到短
  const compoundConsonants = ['ngh', 'ch', 'gh', 'gi', 'kh', 'ng', 'nh', 'ph', 'th', 'tr'];

  const result: string[] = [];
  let i = 0;
  const textLength = text.length;
  const lowerText = text.toLowerCase(); // 提前转换为小写

  while (i < textLength) {
    let matched = false;
    
    // 检查复合辅音
    for (const compound of compoundConsonants) {
      const compoundLength = compound.length;
      if (i + compoundLength <= textLength && 
          lowerText.startsWith(compound, i)) {
        result.push(vietnameseToLatinMap.get(compound) || compound);
        i += compoundLength;
        matched = true;
        break;
      }
    }
    
    // 如果没有匹配复合辅音，则处理单个字符
    if (!matched) {
      const char = lowerText[i];
      result.push(vietnameseToLatinMap.get(char) || char);
      i++;
    }
  }
  
  return result.join('').trim() || ' ';
}

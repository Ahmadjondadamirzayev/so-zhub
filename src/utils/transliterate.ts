/**
 * Official Uzbek Alphabet Transliterator
 * Bidirectional: Lotin (Latin) <-> Kirill (Cyrillic)
 */

export function latinToCyrillic(text: string): string {
  if (!text) return '';

  let res = text;

  // Normalize apostrophes to standard single quote for uniform matching
  res = res.replace(/[ʻ‘’`]/g, "'");

  // Multi-character combinations (case-sensitive)
  const compoundReplacements: [RegExp, string][] = [
    [/Sh/g, 'Ш'],
    [/SH/g, 'Ш'],
    [/sh/g, 'ш'],
    [/Ch/g, 'Ч'],
    [/CH/g, 'Ч'],
    [/ch/g, 'ч'],
    [/O'/g, 'Ў'],
    [/o'/g, 'ў'],
    [/G'/g, 'Ғ'],
    [/g'/g, 'ғ'],
    [/Yo/g, 'Ё'],
    [/YO/g, 'Ё'],
    [/yo/g, 'ё'],
    [/Yu/g, 'Ю'],
    [/YU/g, 'Ю'],
    [/yu/g, 'ю'],
    [/Ya/g, 'Я'],
    [/YA/g, 'Я'],
    [/ya/g, 'я'],
    [/Ye/g, 'Е'],
    [/YE/g, 'Е'],
    [/ye/g, 'е'],
  ];

  for (const [pattern, replacement] of compoundReplacements) {
    res = res.replace(pattern, replacement);
  }

  // Handle word-initial 'E' -> 'Э', 'e' -> 'э'
  res = res.replace(/\bE/g, 'Э');
  res = res.replace(/\be/g, 'э');
  // Handle 'e' after vowels
  res = res.replace(/([АОУИЭЎаоуиэў])E/g, '$1Э');
  res = res.replace(/([АОУИЭЎаоуиэў])e/g, '$1э');

  // Single letter map
  const singleMap: Record<string, string> = {
    A: 'А', a: 'а',
    B: 'Б', b: 'б',
    D: 'Д', d: 'д',
    E: 'Е', e: 'е',
    F: 'Ф', f: 'ф',
    G: 'Г', g: 'г',
    H: 'Ҳ', h: 'ҳ',
    I: 'И', i: 'и',
    J: 'Ж', j: 'ж',
    K: 'К', k: 'к',
    L: 'Л', l: 'л',
    M: 'М', m: 'м',
    N: 'Н', n: 'н',
    O: 'О', o: 'о',
    P: 'П', p: 'п',
    Q: 'Қ', q: 'қ',
    R: 'Р', r: 'р',
    S: 'С', s: 'с',
    T: 'Т', t: 'т',
    U: 'У', u: 'у',
    V: 'В', v: 'в',
    X: 'Х', x: 'х',
    Y: 'Й', y: 'й',
    Z: 'З', z: 'з',
    "'": 'ъ',
  };

  let output = '';
  for (let i = 0; i < res.length; i++) {
    const ch = res[i];
    output += singleMap[ch] !== undefined ? singleMap[ch] : ch;
  }

  return output;
}

export function cyrillicToLatin(text: string): string {
  if (!text) return '';

  let res = text;

  // Compound / special Cyrillic letters
  // Handle 'Е' / 'е' at word boundaries or after vowels
  res = res.replace(/\bЕ/g, 'Ye');
  res = res.replace(/\bе/g, 'ye');
  res = res.replace(/([АОУИЭЎаоуиэўЪъЬь])Е/g, '$1Ye');
  res = res.replace(/([АОУИЭЎаоуиэўЪъЬь])е/g, '$1ye');

  // 'Ц' -> 'Ts' / 's'
  res = res.replace(/\bЦ/g, 'S');
  res = res.replace(/\bц/g, 's');
  res = res.replace(/Ц/g, 'Ts');
  res = res.replace(/ц/g, 'ts');

  const cyrToLatMap: Record<string, string> = {
    А: 'A', а: 'a',
    Б: 'B', б: 'b',
    В: 'V', в: 'v',
    Г: 'G', г: 'g',
    Д: 'D', д: 'd',
    Е: 'E', е: 'e',
    Ё: 'Yo', ё: 'yo',
    Ж: 'J', ж: 'j',
    З: 'Z', з: 'z',
    И: 'I', и: 'i',
    Й: 'Y', й: 'y',
    К: 'K', к: 'k',
    Л: 'L', л: 'l',
    М: 'M', м: 'm',
    Н: 'N', н: 'n',
    О: 'O', о: 'o',
    П: 'P', п: 'p',
    Р: 'R', р: 'r',
    С: 'S', с: 's',
    Т: 'T', т: 't',
    У: 'U', у: 'u',
    Ф: 'F', ф: 'f',
    Х: 'X', х: 'x',
    Ҳ: 'H', ҳ: 'h',
    Ч: 'Ch', ч: 'ch',
    Ш: 'Sh', ш: 'sh',
    Щ: 'Sh', щ: 'sh',
    Ъ: "'", ъ: "'",
    Ы: 'I', ы: 'i',
    Ь: '', ь: '',
    Э: 'E', э: 'e',
    Ю: 'Yu', ю: 'yu',
    Я: 'Ya', я: 'ya',
    Ў: "O'", ў: "o'",
    Ғ: "G'", ғ: "g'",
    Қ: 'Q', қ: 'q',
  };

  let output = '';
  for (let i = 0; i < res.length; i++) {
    const ch = res[i];
    output += cyrToLatMap[ch] !== undefined ? cyrToLatMap[ch] : ch;
  }

  return output;
}

export function formatWithAlphabet(latinText: string, cyrillicText: string | undefined, alphabet: 'latin' | 'cyrillic'): string {
  if (alphabet === 'cyrillic') {
    return cyrillicText || latinToCyrillic(latinText);
  }
  return latinText;
}

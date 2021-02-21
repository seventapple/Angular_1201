//Empty or null check
const isNull = (object: any): boolean => object === null;
const isNullOrUndefined = (object: any): boolean => object === null || object === undefined;
const isUndefined = (object: any): boolean => object === undefined;
const isEmpty = (object: any): boolean => isNullOrUndefined(object) || '' === object;
//数字检查
const isNumber = (value): boolean => /^-?\d+$/.test(value);

//页数入力检查
const isPageFormat = (pagesStr: string, docPageCnt: number): boolean => {
  const pageRegular = /^(,*\d+(-\d+)?,*)+$/;
  if (pageRegular.test(pagesStr)) {
    const pages: any[] = Array.from(new Set(String(pagesStr).split(/[,-]/)));
    const maxPage = Math.max(...pages);
    return !pages.find(str => /^0+$/.test(str)) && docPageCnt >= maxPage;
  }
  return false;
};

// String 转化 boolean
const toBoolean = (str: string = 'false'): boolean => String(str).toLowerCase() === 'true';

//
const displayAliasName = (name: string, alias: string, mode: string = '1'): string => {
  if (alias) {
    return mode === '2' ? `${name}\t${alias}` : `${name}(${alias})`;
  } else {
    return name;
  }
};

//文字列前后记号追加
const addSymbolAroundWord = (str: string, symbol: string): string => {
  if (str) {
    const replaceValue = `${symbol}$1${symbol}`;
    return str.replace(/(\w+)\s*/g, replaceValue);
  }
};

//date -> json
const deepCopy = (data): any => JSON.parse(JSON.stringify(data));

//URL
const convertUrl = (url: string, level: number, prefix: string = `service`): any => {
  const regex = new RegExp(`^\/?${prefix}`);
  const newPrefix = `${'../'.repeat(level)}${prefix}`;
  return url?.replace(regex, newPrefix);
};

//获取文件名
const getFileName = (filename: string): any => {
  return filename.split(/(.+?)(\.[^.]*$|$)/)[1];
};

//获取文件后缀
const getFileExtension = (filename: string): any => {
  return filename.split(/(.+?)(\.[^.]*$|$)/)[2];
};

const fractionToPercentage = (value: string): string => {
  const fractionNumber = value.split('/');
  if (fractionNumber.includes('0')) {
    return '0';
  } else {
    return Number(fractionNumber[0]) / Number(fractionNumber[1]) * 100 + '%';
  }
};

//禁止文字符号判定
const isFolderProhibited = (str: string): boolean => {
  if (str) {
    return /[\\/<>&]/.test(str);
  }
};

export {
  isNull,
  isNullOrUndefined,
  isEmpty,
  isNumber,
  isPageFormat,
  toBoolean,
  displayAliasName,
  isUndefined,
  addSymbolAroundWord,
  deepCopy,
  convertUrl,
  getFileName,
  getFileExtension,
  fractionToPercentage,
  isFolderProhibited
};

import { Dictionary } from '../../shared';

export const wordsAlphabeticSort = (inWords: string[]): string[] => {
  return inWords.sort((prev, next) => prev.localeCompare(next));
};

export const wordsLetterQuantitySort = (inWords: string[]): string[] => {
  return inWords.sort((prev, next) => {
    return prev.length - next.length;
  });
};

export const uniqueWords = (inWords: string[]): string[] => {
  const lWordsCount = inWords.reduce((acc: Dictionary<number>, cur) => {
    acc[cur] = acc[cur] || 1;
    return acc;
  }, {});

  return Object.keys(lWordsCount).filter((key) => lWordsCount[key] === 1);
};

export const uniqueValues = (inUserInput: string[]): string[] => {
  const lValuesCount = inUserInput.reduce((acc: Dictionary<number>, cur) => {
    acc[cur] = acc[cur] || 1;
    return acc;
  }, {});
  return Object.keys(lValuesCount).filter((key) => lValuesCount[key] === 1);
};

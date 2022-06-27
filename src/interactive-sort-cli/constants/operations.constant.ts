import {
  digitsAscSort,
  digitsDescSort,
  uniqueValues,
  uniqueWords,
  wordsAlphabeticSort,
  wordsLetterQuantitySort
} from '../services';

type Operation<T extends string | number> = (inInput: T[]) => T[];

export const OPERATIONS: Map<number, { operationName: string; operation: Operation<string> }> = new Map();
OPERATIONS.set(1, {
  operationName: 'Sort words in ascending order',
  operation: wordsAlphabeticSort
});
OPERATIONS.set(2, {
  operationName: 'Show digits in ASC order',
  operation: digitsAscSort
});
OPERATIONS.set(3, {
  operationName: 'Show digits in DESC order',
  operation: digitsDescSort
});
OPERATIONS.set(4, {
  operationName: 'Words by quantity of letters',
  operation: wordsLetterQuantitySort
});
OPERATIONS.set(5, {
  operationName: 'Only unique words',
  operation: uniqueWords
});
OPERATIONS.set(6, {
  operationName: 'Only unique values: words and digits',
  operation: uniqueValues
});

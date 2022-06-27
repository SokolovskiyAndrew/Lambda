import { Dictionary } from '../types/utility.type';

export function getHashTable<T extends string | number>(inArray: T[]): Dictionary<number> {
  return inArray.reduce((inHash: Dictionary<number>, inCurrentEl: T) => {
    inHash[inCurrentEl] = 0;
    return inHash;
  }, {});
}

export function isNil<T>(inValue: T): boolean {
  return inValue === null || inValue === undefined;
}

export function isObject<T>(inValue: T): boolean {
  return !Array.isArray(inValue) && typeof inValue === 'object' && inValue !== null;
}

export const isNumber = (inValue: string): boolean => {
  return !Number.isNaN(Number(inValue));
};

export function objectKeyDeepSearch<T>(inObject: T, inKey: keyof T & string): T[keyof T] | null {
  let lKeyValue: T[keyof T] | null = null;

  if (inKey in inObject) {
    return inObject[inKey];
  }

  for (const key in inObject) {
    if (isObject(inObject[key])) {
      lKeyValue = objectKeyDeepSearch(inObject[key] as unknown as T, inKey);

      if (!isNil(lKeyValue)) {
        break;
      }
    }
  }

  return lKeyValue;
}

export function inRange(inSearchValue: number, inStart: number, inEnd: number): boolean {
  return inStart <= inSearchValue && inSearchValue <= inEnd;
}

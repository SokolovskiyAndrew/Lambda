import { Dictionary } from './types/utility.type';

export function getHashTable<T extends string | number>(inArray: T[]): Dictionary {
  return inArray.reduce((inHash: Dictionary, inCurrentEl: T) => {
    inHash[inCurrentEl] = 0;
    return inHash;
  }, {});
}

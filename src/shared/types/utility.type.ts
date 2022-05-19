export type Dictionary<T extends string | number> = { [key: string]: T };

export interface PromiseFulfilledResult<T> {
  status: 'fulfilled';
  value: T;
}

export interface PromiseRejectedResult {
  status: 'rejected';
  reason: unknown;
}

export type PromiseSettledResult<T> = PromiseFulfilledResult<T> | PromiseRejectedResult;

export type PropertyWithoutUnderscore<S extends string> = S extends `${infer T}_${infer U}`
  ? `${T}${PropertyWithoutUnderscore<U>}`
  : S;

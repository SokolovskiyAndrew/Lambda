export type Dictionary = { [key: string]: number };

export type PropertyWithoutUnderscore<S extends string> = S extends `${infer T}_${infer U}`
  ? `${T}${PropertyWithoutUnderscore<U>}`
  : S;

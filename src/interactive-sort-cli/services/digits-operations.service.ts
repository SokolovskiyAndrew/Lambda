export const digitsAscSort = (inDigits: string[]): string[] => {
  return inDigits
    .map(Number)
    .sort((prev, next) => prev - next)
    .map(String);
};

export const digitsDescSort = (inDigits: string[]): string[] => {
  return inDigits
    .map(Number)
    .sort((prev, next) => next - prev)
    .map(String);
};

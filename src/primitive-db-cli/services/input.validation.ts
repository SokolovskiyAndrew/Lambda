import { isNumber } from '../../shared';
import { getItemFromDb } from './db.service';

export const userAgeValidation = (inAge: string): string | boolean => {
  if (!inAge) return 'Please, provide a value';

  if (!isNumber(inAge)) return 'Please, provide your age in digits';

  return true;
};

export const userNameValidation = async (inName: string): Promise<string | boolean> => {
  if (!!(await getItemFromDb(inName))) return 'User with provided name already exist';

  return true;
};

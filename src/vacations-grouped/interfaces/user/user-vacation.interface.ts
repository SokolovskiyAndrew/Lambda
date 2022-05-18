import { PropertyWithoutUnderscore } from '../../../shared';
import { User } from './user.interface';
import { VacationDates } from '../vacation/vacation-dates.interface';

type UserInfo<T> = {
  [property in keyof T as `user${Capitalize<PropertyWithoutUnderscore<property & string>>}`]: T[property];
};

export interface UserVacation extends UserInfo<User> {
  weekendDates: VacationDates[];
}

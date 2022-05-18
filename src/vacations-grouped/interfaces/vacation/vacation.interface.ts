import { User } from '../user/user.interface';
import { VacationDates } from './vacation-dates.interface';

export interface Vacation extends VacationDates {
  user: User;
  usedDays: number;
  status: string;
}

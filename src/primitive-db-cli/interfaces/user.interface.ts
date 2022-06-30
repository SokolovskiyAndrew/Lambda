import { UserGender } from '../enums';

export interface User {
  name: string;
  gender: UserGender;
  age?: number;
}

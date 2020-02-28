import { IUser } from './IUser';

export interface IAsistente {
  usuario?: IUser;
  telefono: string;
  first_login: boolean;
}

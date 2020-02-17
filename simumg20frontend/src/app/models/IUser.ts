
export interface IUser {
  id?: number;
  nombres?: string;
  apellidos?: string;
  username: string;
  password?: string;
  email?: string;
  token?: string;
  roles?: string;
  firstLogin?: boolean;
};

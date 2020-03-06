import { IPago } from './IPago';
import { IUser } from './IUser';


export interface IValidacionPago {
  id?: number;
  mensaje: string;
  resultado: ResultadoValidacionPago;
  fecha_hora?: string;
  pago?: number|IPago;
  usuario?: number|IUser;
}

export enum ResultadoValidacionPago {
  RECHAZADO = 1,
  ACEPTADO = 2
}

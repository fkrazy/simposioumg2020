import {IPago} from './IPago';
import {IUser} from './IUser';
import {ResultadoValidacionPago} from './IValidacionPago';

export interface IEvaluacionReembolso {
  id?: number;
  mensaje: string;
  resultado: ResultadoEvaluacionReembolso;
  fecha_hora?: string;
  pago?: number|IPago;
  usuario?: number|IUser;
}

export enum ResultadoEvaluacionReembolso {
  RECHAZADO = 1,
  ACEPTADO = 2,
  REEMBOLSADO = 3
}

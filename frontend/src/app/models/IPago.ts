import { ICuenta } from './ICuenta';
import { IAsistente } from './IAsistente';

export enum EstadoPago {
  PENDIENTE_VALIDACION = 1,
  RECHAZADO,
  ACEPTADO,
  EVALUACION_REEMBOLSO,
  REEMBOLSO_APROBADO,
  REEMBOLSADO
}

export interface IPago {
  codigo_pago: string;
  cuenta?: ICuenta;
  titular?: IAsistente;
  foto: string;
  fecha: string;
  hora: string;
  estado: number;
}

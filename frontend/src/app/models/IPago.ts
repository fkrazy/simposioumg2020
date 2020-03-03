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
  id?: number;
  codigo_pago: string;
  cuenta: number;
  titular: number;
  foto: string;
  fecha?: string;
  hora?: string;
  estado: number;
}

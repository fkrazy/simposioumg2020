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
  cuenta_id?: number;
  cuenta?: ICuenta;
  titular_id?: number;
  titular?: IAsistente;
  foto: string;
  fecha_registro?: string;
  fecha?: string;
  hora?: string;
  estado: number;
}

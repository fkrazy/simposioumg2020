import { IAsistente } from './IAsistente';

export interface ITicket {
  asistente: IAsistente;
  codigo_qr: string;
  estado: EstadoTicket;
}

export enum EstadoTicket {
  VALIDO = 1,
  INVALIDO = 2
}

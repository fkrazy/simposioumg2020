import { ICarrera } from './ICarrera';
import { IPago } from './IPago';

export interface IEstudianteUmg {
  asistente?: number;
  carnet: string;
  semestre: number;
  carrera: number|ICarrera;
  pago?: IPago;
}

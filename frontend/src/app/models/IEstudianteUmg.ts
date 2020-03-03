import { ICarrera } from './ICarrera';

export interface IEstudianteUmg {
  asistente: number;
  carnet: string;
  semestre: number;
  carrera: number|ICarrera;
}

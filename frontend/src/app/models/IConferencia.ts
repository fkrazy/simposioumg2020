import { IConferencista } from './IConferencista';
import { ISalon } from './ISalon';

export interface IConferencia {
  id?: number;
  tema: string;
  inicio: string;
  fin: string;
  id_conferencista?: number;
  conferencista?: IConferencista;
  id_salon?: number;
  salon?: ISalon;
  foto: string;
}

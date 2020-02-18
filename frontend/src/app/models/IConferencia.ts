import { IConferencista } from './IConferencista';
import { ISalon } from './ISalon';

export interface IConferencia {
  id?: number;
  tema: string;
  inicio: string;
  fin: string;
  conferencista?: IConferencista;
  salon?: ISalon;
}

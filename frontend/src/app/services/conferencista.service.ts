import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IConferencista } from '../models/IConferencista';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConferencistaService{

  static BASE_URL = `${environment.apiUrl}/administracion/conferencistas`;

  constructor(private http: HttpClient) { }

  public getAll(): Observable<IConferencista[]> {
    return this.http.get<IConferencista[]>(`${ConferencistaService.BASE_URL}/`);
  }

  public create(conferencista: IConferencista): Observable<any> {
    return this.http.post<any>(`${ConferencistaService.BASE_URL}/`, conferencista);
  }

  public delete(idConferencista: number): Observable<any> {
    return this.http.delete<any>(`${ConferencistaService.BASE_URL}/${idConferencista}`);
  }

}

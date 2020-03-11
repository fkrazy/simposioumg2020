import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IConferencia } from '../models/IConferencia';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConferenciaService {

  static BASE_URL = `${environment.apiUrl}/api/administracion/conferencias`;

  constructor(private http: HttpClient) { }

  public get(idConferencia: number): Observable<IConferencia> {
    return this.http.get<IConferencia>(`${ConferenciaService.BASE_URL}/${idConferencia}/`);
  }

  public getAll(): Observable<IConferencia[]> {
    return this.http.get<IConferencia[]>(`${ConferenciaService.BASE_URL}/`);
  }

  public create(conferencia: FormData): Observable<IConferencia> {
    return this.http.post<IConferencia>(`${ConferenciaService.BASE_URL}/`, conferencia);
  }

  public update(idConferencia: number, conferencia: FormData): Observable<IConferencia> {
    return this.http.put<IConferencia>(`${ConferenciaService.BASE_URL}/${idConferencia}/`, conferencia);
  }

  public delete(idConferencia: number): Observable<null> {
    return this.http.delete<null>(`${ConferenciaService.BASE_URL}/${idConferencia}/`);
  }

}

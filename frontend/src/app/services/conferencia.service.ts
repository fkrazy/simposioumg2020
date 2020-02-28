import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IConferencia } from '../models/IConferencia';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConferenciaService {

  static BASE_URL = `${environment.apiUrl}/administracion/conferencias`;

  constructor(private http: HttpClient) { }

  public getAll(): Observable<IConferencia[]> {
    return this.http.get<IConferencia[]>(`${ConferenciaService.BASE_URL}/`);
  }

  public create(conferencia: IConferencia): Observable<any> {
    return this.http.post<any>(`${ConferenciaService.BASE_URL}/`, conferencia);
  }

  public delete(idConferencia: number): Observable<any> {
    return this.http.delete<any>(`${ConferenciaService.BASE_URL}/`);
  }

}

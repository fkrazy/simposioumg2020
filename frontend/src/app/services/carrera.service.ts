import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICarrera } from '../models/ICarrera';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarreraService {

  static BASE_URL = `${environment.apiUrl}/administracion/carreras`;

  constructor(private http: HttpClient) { }

  public getAll(): Observable<any> {
    return this.http.get<any>(`${CarreraService.BASE_URL}/`);
  }

  public create(carrera: ICarrera): Observable<any> {
    return this.http.post<any>(`${CarreraService.BASE_URL}/`, carrera);
  }

  public delete(codigoCarrera: number): Observable<any> {
    return this.http.delete<any>(`${CarreraService.BASE_URL}/${codigoCarrera}`);
  }

}

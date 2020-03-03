import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICarrera } from '../models/ICarrera';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarreraService {

  static BASE_URL = `${environment.apiUrl}/api/administracion/carreras`;

  constructor(private http: HttpClient) { }

  public getAll(): Observable<ICarrera[]> {
    return this.http.get<ICarrera[]>(`${CarreraService.BASE_URL}/`);
  }

  public create(carrera: ICarrera): Observable<ICarrera> {
    return this.http.post<any>(`${CarreraService.BASE_URL}/`, carrera);
  }

  public delete(idCarrera: number): Observable<any> {
    return this.http.delete<any>(`${CarreraService.BASE_URL}/${idCarrera}`);
  }

  public update(carrera: ICarrera): Observable<ICarrera> {
    return this.http.put<ICarrera>(`${CarreraService.BASE_URL}/${carrera.id}/`, carrera);
  }

}

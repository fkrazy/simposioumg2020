import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ISalon } from '../models/ISalon';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalonService {

  static BASE_URL = `${environment.apiUrl}/administracion/salones`;

  constructor(private http: HttpClient) { }

  public getAll(): Observable<ISalon[]> {
    return this.http.get<ISalon[]>(`${SalonService.BASE_URL}/`);
  }

  public create(salon: ISalon): Observable<any> {
    return this.http.post<any>(`${SalonService.BASE_URL}/`, salon);
  }

  public delete(idSalon: number): Observable<any> {
    return this.http.delete<any>(`${SalonService.BASE_URL}/${idSalon}`);
  }

}

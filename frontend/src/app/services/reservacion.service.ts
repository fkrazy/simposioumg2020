import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IReservacion } from '../models/IReservacion';

@Injectable({
  providedIn: 'root'
})
export class ReservacionService {

  static BASE_URL = `${environment.apiUrl}/api/administracion/reservaciones`;

  constructor(private http: HttpClient) { }

  public getAll(): Observable<IReservacion[]> {
    return this.http.get<IReservacion[]>(`${ReservacionService.BASE_URL}/`);
  }
  public create(reservaciones: IReservacion): Observable<IReservacion>{
    return this.http.post<IReservacion>(`${ReservacionService.BASE_URL}/`,reservaciones);
  }
  public delete(reserva: number): Observable<null>{
    return this.http.delete<null>(`${ReservacionService.BASE_URL}/${reserva}`);
  }
}

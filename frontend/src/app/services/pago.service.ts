import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IPago } from '../models/IPago';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  static BASE_URL = `${environment.apiUrl}/api/administracion/pagos`;

  constructor(
    private http: HttpClient
  ) { }

  public get(idPago: number): Observable<IPago> {
    return this.http.get<IPago>(`${PagoService.BASE_URL}/${idPago}`);
  }

  public create(pago: IPago): Observable<IPago> {
    return this.http.post<IPago>(`${PagoService.BASE_URL}/`, pago);
  }

  public update(pago: IPago): Observable<IPago> {
    return this.http.put<IPago>(`${PagoService.BASE_URL}/${pago.titular}/`, pago);
  }

}

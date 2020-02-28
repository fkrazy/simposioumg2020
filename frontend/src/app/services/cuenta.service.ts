import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICuenta } from '../models/ICuenta';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  static BASE_URL = `${environment.apiUrl}/administracion/cuentas`;

  constructor(private http: HttpClient) { }

  public getAll(): Observable<ICuenta[]> {
    return this.http.get<ICuenta[]>(`${CuentaService.BASE_URL}/`);
  }

  public create(cuenta: ICuenta): Observable<any> {
    return this.http.post<any>(`${CuentaService.BASE_URL}/`, cuenta);
  }

  public delete(idCuenta: number): Observable<any> {
    return this.http.delete<any>(`${CuentaService.BASE_URL}/${idCuenta}`);
  }

}

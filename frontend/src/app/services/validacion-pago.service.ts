import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {IValidacionPago} from '../models/IValidacionPago';

@Injectable({
  providedIn: 'root'
})
export class ValidacionPagoService {

  static BASE_URL = `${environment.apiUrl}/api/administracion/validacion_pagos`;

  constructor(private http: HttpClient) { }

  public create(validacion: IValidacionPago): Observable<IValidacionPago> {
    return this.http.post<IValidacionPago>(`${ValidacionPagoService.BASE_URL}/`, validacion);
  }


}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IEvaluacionReembolso } from '../models/IEvaluacionReembolso';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionReembolsoService {

  static BASE_URL = `${environment.apiUrl}/api/administracion/evaluacion_reembolso`;

  constructor(private http: HttpClient) { }

  public create(evaluacion: IEvaluacionReembolso): Observable<IEvaluacionReembolso> {
    return this.http.post<IEvaluacionReembolso>(`${EvaluacionReembolsoService.BASE_URL}/`, evaluacion);
  }

  public getAllByPago(pagoId: number): Observable<IEvaluacionReembolso[]> {
    return this.http.get<IEvaluacionReembolso[]>(`${environment.apiUrl}/api/administracion/reembolsos/pago/${pagoId}`);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IEstudianteUmg } from '../models/IEstudianteUmg';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  static BASE_URL = `${environment.apiUrl}/api/reportes`;

  constructor(private http: HttpClient) { }

  public getEstudiantes(semestre: number = null, carrera: number = null): Observable<IEstudianteUmg[]> {
    let queryparams = '';
    if (semestre !== null) {
      queryparams = `?semestre=${semestre}`;
    }
    if (carrera !== null) {
      queryparams = (queryparams.length > 0 ? queryparams + '&' : '?') + `carrera=${carrera}`;
    }
    return this.http.get<IEstudianteUmg[]>(`${ReporteService.BASE_URL}/estudiantes${queryparams}`);
  }

  public getPagos(): Observable<IEstudianteUmg[]> {
    return this.http.get<IEstudianteUmg[]>(`${ReporteService.BASE_URL}/pagos`);
  }

  public enviarReportePorCorreo(subject: string, mensaje: string, destination: string, pdf: string, filename: string = 'reporte.pdf'): Observable<null> {
    return this.http.post<null>(`${ReporteService.BASE_URL}/enviarcorreo`, {subject, mensaje, destination, pdf, filename});
  }

}

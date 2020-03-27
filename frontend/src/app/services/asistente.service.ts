import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { IAsistente } from '../models/IAsistente';

@Injectable({
  providedIn: 'root'
})
export class AsistenteService {

  static BASE_URL = `${environment.apiUrl}/api/administracion/asistentes`;

  constructor(
    private http: HttpClient
  ) { }

  public get(id: number): Observable<IAsistente> {
    return this.http.get<IAsistente>(`${AsistenteService.BASE_URL}/${id}`);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IEvento } from '../models/IEvento';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  private datosEvento: IEvento = null;

  constructor(
    private http: HttpClient,
  ) {
    http.get<IEvento>(`${environment.apiUrl}/api/administracion/evento`)
      .subscribe((res) => this.datosEvento = res, console.error);
  }

  public get evento(): IEvento {
    return this.datosEvento;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IConferencia } from '../models/IConferencia';

@Injectable({
  providedIn: 'root'
})
export class ConferenciaService {

  static BASE_URL = 'assets/mock';

  private conferencias: IConferencia[] = [];

  constructor(private http: HttpClient) {
    this.http.get<IConferencia[]>(`${ConferenciaService.BASE_URL}/conferencias.json`)
      .subscribe(res => {
        this.conferencias = res;
      });
  }

  public getAll(): Observable<IConferencia[]> {
    return of(this.conferencias);
  }

  public create(conferencia: IConferencia): Observable<number> {
    const id = 2200 + this.conferencias.length + 1;
    conferencia.id = id;
    this.conferencias.push(conferencia);
    return of(id);
  }


}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ICarrera } from '../models/ICarrera';

@Injectable({
  providedIn: 'root'
})
export class CarreraService {

  static BASE_URL = 'assets/mock';

  private carreras: ICarrera[] = [];

  constructor(private http: HttpClient) {
    this.http.get<ICarrera[]>(`${CarreraService.BASE_URL}/carreras.json`)
      .subscribe((res) => {
        this.carreras.push(...res);
      }, console.error);
  }

  public getAll(): Observable<ICarrera[]> {
    return of(this.carreras);
  }

  public create(carrera: ICarrera): Observable<number> {
    this.carreras.push(carrera);
    return of(carrera.codigo);
  }

}

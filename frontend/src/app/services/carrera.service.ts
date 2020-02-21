import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {ICarrera} from '../models/ICarrera';

@Injectable({
  providedIn: 'root'
})
export class CarreraService {

  static BASE_URL = 'assets/mock';

  constructor(private http: HttpClient) { }

  public getAll(): Observable<ICarrera[]> {
    return this.http.get<ICarrera[]>(`${CarreraService.BASE_URL}/carreras.json`);
  }

}

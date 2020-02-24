import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ISalon } from '../models/ISalon';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalonService {

  static BASE_URL = 'assets/mock';

  private salones: ISalon[] = [];

  constructor(private http: HttpClient) {
    this.http.get<ISalon[]>(`${SalonService.BASE_URL}/salones.json`)
      .subscribe(res => {
        this.salones.push(...res);
      }, console.error);
  }

  public getAll(): Observable<ISalon[]> {
    return of(this.salones);
  }

  public create(salon: ISalon): Observable<number> {
    const id = 2200 + this.salones.length + 1;
    salon.id = id;
    this.salones.push(salon);
    return of(id);
  }

}

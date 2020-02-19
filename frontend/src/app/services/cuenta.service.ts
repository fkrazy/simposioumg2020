import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ICuenta } from '../models/ICuenta';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  static BASE_URL = 'assets/mock';

  private cuentas: ICuenta[] = [];

  constructor(private http: HttpClient) {
    http.get<ICuenta[]>(`${CuentaService.BASE_URL}/cuentas.json`).subscribe(res => {
      this.cuentas.push(...res);
    }, console.error);
  }

  public getAll(): Observable<ICuenta[]> {
    return of(this.cuentas);
  }

  public create(cuenta: ICuenta): Observable<number> {
    const id = 3000 + this.cuentas.length + 1;
    cuenta.id = id;
    this.cuentas.push(cuenta);
    return of(id);
  }

}

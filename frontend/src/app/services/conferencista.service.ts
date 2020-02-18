import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IConferencista } from '../models/IConferencista';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConferencistaService{

  static BASE_URL = 'assets/mock';

  private conferencistas: IConferencista[] = [];

  constructor(private http: HttpClient) {
    this.http.get<IConferencista[]>(`${ConferencistaService.BASE_URL}/conferencistas.json`)
      .subscribe(res => {
        this.conferencistas.push(...res);
      }, console.error);
  }

  public getAll(): Observable<IConferencista[]> {
    return of(this.conferencistas);
  }

  public create(conferencista: IConferencista): Observable<number> {
    const id = 1000 + this.conferencistas.length + 1;
    conferencista.id = id;
    this.conferencistas.push(conferencista);
    return of(id);
  }

}

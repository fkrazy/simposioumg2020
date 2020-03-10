import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ITicket } from '../models/ITicket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  static BASE_URL = `${environment.apiUrl}/api/administracion/tickets`

  constructor(private http: HttpClient) { }

  public get(ticketId: number): Observable<ITicket> {
    return this.http.get<ITicket>(`${TicketService.BASE_URL}/${ticketId}`);
  }

}

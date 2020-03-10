import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { TicketService } from '../../services/ticket.service';
import { ITicket } from '../../models/ITicket';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  public ticket: ITicket = null;

  constructor(
    private ticketService: TicketService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.ticketService.get(this.auth.user.id)
      .subscribe((res) => {
        this.ticket = res;
      }, console.error);
  }

}

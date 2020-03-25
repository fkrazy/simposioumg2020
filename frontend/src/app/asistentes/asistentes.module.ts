import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PagoComponent } from './pago/pago.component';
import { TicketComponent } from './ticket/ticket.component';
import { ReservacionComponent } from './reservacion/reservacion.component'

import { CarouselModule, CardModule, MessageService, MessagesModule } from 'primeng';

const routes: Route[] = [
  {
    path: '',
    redirectTo: 'pago',
    pathMatch: 'full'
  },
  {
    path: 'pago',
    component: PagoComponent
  },
  {
    path: 'ticket',
    component: TicketComponent
  },
  {
    path: 'reservacion',
    component: ReservacionComponent
  }
];

@NgModule({
  declarations: [PagoComponent, TicketComponent,ReservacionComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    FontAwesomeModule,

    CarouselModule,
    CardModule,
    MessagesModule,
  ],
  providers: [
    MessageService,
  ]
})
export class AsistentesModule { }

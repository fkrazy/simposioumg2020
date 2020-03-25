import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';
import { MessagesModule, MessageService } from 'primeng';

import { PagosComponent } from './pagos/pagos.component';
import { ValidacionesPagosComponent } from './validaciones-pagos/validaciones-pagos.component';
import { ReembolsosPagosComponent } from './reembolsos-pagos/reembolsos-pagos.component';
import { PagoDetailComponent } from './pago-detail/pago-detail.component';


const routes: Route[] = [
  {
    path: '',
    component: PagosComponent
  },
  {
    path: 'validaciones',
    component: ValidacionesPagosComponent
  },
  {
    path: 'reembolsos',
    component: ReembolsosPagosComponent
  },
  {
    path: ':id',
    component: PagoDetailComponent
  },
];

@NgModule({
  declarations: [PagosComponent, ValidacionesPagosComponent, ReembolsosPagosComponent, PagoDetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    FontAwesomeModule,
    ToastrModule,

    MessagesModule,
  ],
  providers: [
    MessageService,
  ]
})
export class PagosModule { }

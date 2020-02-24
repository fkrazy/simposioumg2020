import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PagosComponent } from './pagos/pagos.component';
import { ValidacionesPagosComponent } from './validaciones-pagos/validaciones-pagos.component';
import { ReembolsosPagosComponent } from './reembolsos-pagos/reembolsos-pagos.component';

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

];

@NgModule({
  declarations: [PagosComponent, ValidacionesPagosComponent, ReembolsosPagosComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    FontAwesomeModule
  ]
})
export class PagosModule { }

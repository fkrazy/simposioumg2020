import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MessageService, MessagesModule } from 'primeng';

import { ConferenciasComponent } from './conferencias/conferencias.component';
import { SalonesComponent } from './salones/salones.component';
import { ConferencistasComponent } from './conferencistas/conferencistas.component';
import { CuentasComponent } from './cuentas/cuentas.component';
import { CarrerasComponent } from './carreras/carreras.component';

const routes: Route[] = [
  {
    path: '',
    redirectTo: 'conferencias',
    pathMatch: 'full'
  },
  {
    path: 'conferencias',
    component: ConferenciasComponent
  },
  {
    path: 'salones',
    component: SalonesComponent
  },
  {
    path: 'conferencistas',
    component: ConferencistasComponent
  },
  {
    path: 'cuentas',
    component: CuentasComponent
  },
  {
    path: 'carreras',
    component: CarrerasComponent
  },
  {
    path: 'pagos',
    loadChildren: () => import('./pagos/pagos.module').then(m => m.PagosModule)
  },
  {
    path: 'reportes',
    loadChildren: () => import('./reportes/reportes.module').then(m => m.ReportesModule)
  }
];

@NgModule({
  declarations: [ConferenciasComponent, SalonesComponent, ConferencistasComponent, CuentasComponent, CarrerasComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    FontAwesomeModule,

    MessagesModule,
  ],
  providers: [
    MessageService,
  ]
})
export class AdminModule { }

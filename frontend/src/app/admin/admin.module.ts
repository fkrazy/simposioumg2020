import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConferenciasComponent } from './conferencias/conferencias.component';
import { SalonesComponent } from './salones/salones.component';
import { ConferencistasComponent } from './conferencistas/conferencistas.component';

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
    path: 'pagos',
    loadChildren: () => import('./pagos/pagos.module').then(m => m.PagosModule)
  },
  {
    path: 'reportes',
  }
];

@NgModule({
  declarations: [ConferenciasComponent, SalonesComponent, ConferencistasComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    FontAwesomeModule
  ]
})
export class AdminModule { }

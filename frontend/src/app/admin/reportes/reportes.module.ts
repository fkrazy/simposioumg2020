import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReporteAsistenciasComponent } from './reporte-asistencias/reporte-asistencias.component';
import { ReportePagosComponent } from './reporte-pagos/reporte-pagos.component';

const routes: Route[] = [
  {
    path: '',
    redirectTo: 'asistencias',
    pathMatch: 'full'
  },
  {
    path: 'asistencias',
    component: ReporteAsistenciasComponent
  },
  {
    path: 'pagos',
    component: ReportePagosComponent
  },
];

@NgModule({
  declarations: [ReporteAsistenciasComponent, ReportePagosComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    FontAwesomeModule
  ]
})
export class ReportesModule { }

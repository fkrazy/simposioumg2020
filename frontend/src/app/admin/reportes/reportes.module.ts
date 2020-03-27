import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReporteAsistenciasComponent } from './reporte-asistencias/reporte-asistencias.component';
import { ReportePagosComponent } from './reporte-pagos/reporte-pagos.component';
import { ReporteEstudiantesComponent } from './reporte-estudiantes/reporte-estudiantes.component';
import {MultiSelectModule, TableModule} from 'primeng';

const routes: Route[] = [
  {
    path: '',
    redirectTo: 'pagos',
    pathMatch: 'full'
  },
  /*{
    path: 'asistencias',
    component: ReporteAsistenciasComponent
  },*/
  {
    path: 'pagos',
    component: ReportePagosComponent
  },
  {
    path: 'estudiantes',
    component: ReporteEstudiantesComponent,
  },
];

@NgModule({
  declarations: [ReporteAsistenciasComponent, ReportePagosComponent, ReporteEstudiantesComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    FontAwesomeModule,

    TableModule,
    MultiSelectModule,
  ]
})
export class ReportesModule { }

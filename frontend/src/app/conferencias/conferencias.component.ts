import { Component, OnInit } from '@angular/core';
import { IConferencia } from './../models/IConferencia';
import { ConferenciaService } from './../services/conferencia.service';
import { CarouselModule } from 'ngx-bootstrap/carousel';

@Component({
  selector: 'app-conferencias',
  templateUrl: './conferencias.component.html',
  styleUrls: ['./conferencias.component.scss']
})
export class ConferenciasComponent implements OnInit {
  num_lista = 0;
  Lista_conferencias : IConferencia [] = [];

  constructor(
    private cuentaservicio: ConferenciaService
  ) { }

  ngOnInit() {
    this.cuentaservicio.getAll().subscribe((res) => {
      this.Lista_conferencias = res;
    }, console.error);
  }

  obtenerNm(t){
 this.num_lista = t;

  }

}

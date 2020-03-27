import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {faPaperclip} from '@fortawesome/free-solid-svg-icons';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import { ReporteService } from '../../../services/reporte.service';
import { IEstudianteUmg } from '../../../models/IEstudianteUmg';
import { CarreraService } from '../../../services/carrera.service';
import { ICarrera } from '../../../models/ICarrera';

declare var jsPDF: any;

@Component({
  selector: 'app-reporte-estudiantes',
  templateUrl: './reporte-estudiantes.component.html',
  styleUrls: ['./reporte-estudiantes.component.scss']
})
export class ReporteEstudiantesComponent implements OnInit {

  faPaperClip = faPaperclip;

  public estudiantes: IEstudianteUmg[] = [];
  public carreras: ICarrera[] = [];
  public carrera: number = null;
  public semestre: number = null;
  public loading = true;

  public enviandoCorreo = false;

  public formEnvioCorreo = new FormGroup({
    correo: new FormControl('',[
      Validators.required,
      Validators.email
    ]),
  });

  constructor(
    private reporteService: ReporteService,
    private carreraService: CarreraService,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.cargarEstudiantes();
    this.carreraService.getAll().subscribe((res) => {
      this.carreras = res;
    });
  }

  public filtrar(): void {
    this.cargarEstudiantes();
  }

  public onEnviarCorreo(): void {
    this.enviandoCorreo = true;
    this.reporteService.enviarReportePorCorreo('Reporte de estudiantes', 'Listado de estudiantes que asistirán', this.formEnvioCorreo.value.correo, this.crearPdf().output('datauristring'), 'reporte-estudiantes.pdf')
      .subscribe((res) => {
        this.enviandoCorreo = false;
        this.modalService.dismissAll();
      }, error => {
        this.enviandoCorreo = false;
      });
  }

  public openModalEnvioCorreo(content): void {

    this.modalService.open(content, {
      centered: true,
      size: 'lg',
      windowClass: 'animated bounceIn'
    });

  }

  private crearPdf(){

    const pdf = new jsPDF();
    const posX = 15
    let posY = 15;

    pdf.setFontSize(20);
    pdf.fromHTML(`<h1>UNIVERSIDAD MARIANO GALVEZ</h1>`, posX, posY);
    pdf.setFontSize(17);

    posY += 10;
    pdf.fromHTML(`<h2>Centro Universitario de Quetzaltenango</h2>`, posX, posY);

    posY += 15;
    pdf.fromHTML(`<h3>Simposio UMG 2020</h3>`, posX, posY);

    posY += 8;
    pdf.fromHTML(`<p>Lista de alumnos que asistirán al evento</p>`, posX, posY);

    posY += 22;

    pdf.setFontSize(10);
    pdf.autoTable({
      html: '#tabla-reporte', // id de la tabla
      theme: 'plain',
      startY: posY,
      styles: {
        lineColor: [3, 3, 3],
        textColor: [5, 5, 5],
        valign: 'middle',
      }
    });

    return pdf;

  }

  private cargarEstudiantes(): void {
    this.reporteService.getEstudiantes(this.semestre, this.carrera).subscribe((res) => {
      this.estudiantes = res;
      this.loading = false;
    }, console.error);
  }

}

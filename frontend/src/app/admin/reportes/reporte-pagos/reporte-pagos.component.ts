import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';

import { IEstudianteUmg } from '../../../models/IEstudianteUmg';
import { ReporteService } from '../../../services/reporte.service';

declare var jsPDF: any;

@Component({
  selector: 'app-reporte-pagos',
  templateUrl: './reporte-pagos.component.html',
  styleUrls: ['./reporte-pagos.component.scss']
})
export class ReportePagosComponent implements OnInit {

  faPaperClip = faPaperclip;

  public estudiantes: IEstudianteUmg[] = [];

  public enviandoCorreo = false;

  public formEnvioCorreo = new FormGroup({
    correo: new FormControl('',[
      Validators.required,
      Validators.email
    ]),
  });

  constructor(
    private reporteService: ReporteService,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.reporteService.getPagos().subscribe((res) => {
      this.estudiantes = res;
    }, console.error);
  }

  public onEnviarCorreo(): void {
    this.enviandoCorreo = true;
    this.reporteService.enviarReportePorCorreo('Reporte de pagos', 'Listado ordenado de pagos de estudiantes', this.formEnvioCorreo.value.correo, this.crearPdf().output('datauristring'), 'reporte-pagos.pdf')
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
    pdf.fromHTML(`<p>Lista ordenada de pagos de alumnos</p>`, posX, posY);

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

}

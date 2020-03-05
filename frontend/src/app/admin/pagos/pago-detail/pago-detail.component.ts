import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { faCheck, faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';

import { EstadoPago, IPago } from '../../../models/IPago';
import { PagoService } from '../../../services/pago.service';
import { ICuenta } from '../../../models/ICuenta';
import { CuentaService } from '../../../services/cuenta.service';
import { IAsistente } from '../../../models/IAsistente';
import {AsistenteService} from '../../../services/asistente.service';


@Component({
  selector: 'app-pago-detail',
  templateUrl: './pago-detail.component.html',
  styleUrls: ['./pago-detail.component.scss']
})
export class PagoDetailComponent implements OnInit {

  faCheck = faCheck;
  faTimes = faTimes;
  faEdit = faEdit;

  PAGO_PENDIENTE_VALIDACION = EstadoPago.PENDIENTE_VALIDACION;
  PAGO_ACEPTADO = EstadoPago.ACEPTADO;
  PAGO_RECHAZADO = EstadoPago.RECHAZADO;
  PAGO_EVALUACION_REEMBOLSO = EstadoPago.EVALUACION_REEMBOLSO;
  PAGO_REEMBOLSO_APROBADO = EstadoPago.REEMBOLSO_APROBADO;
  PAGO_REEMBOLSADO = EstadoPago.REEMBOLSADO;

  TEXTO_ESTADOSPAGO: string[] = [];

  public pago: IPago = null;
  public cuenta: ICuenta = null;
  public asistente: IAsistente = null;

  constructor(
    private pagoService: PagoService,
    private cuentaService: CuentaService,
    private asistenteService: AsistenteService,
    private route: ActivatedRoute,
  ) {
    this.TEXTO_ESTADOSPAGO[0] = null;
    this.TEXTO_ESTADOSPAGO[EstadoPago.PENDIENTE_VALIDACION] = 'Pendiente';
    this.TEXTO_ESTADOSPAGO[EstadoPago.ACEPTADO] = 'Aceptado';
    this.TEXTO_ESTADOSPAGO[EstadoPago.RECHAZADO] = 'Rechazado';
    this.TEXTO_ESTADOSPAGO[EstadoPago.EVALUACION_REEMBOLSO] = 'Solicitud de reembolso';
    this.TEXTO_ESTADOSPAGO[EstadoPago.REEMBOLSO_APROBADO] = 'Reembolso aprobado';
    this.TEXTO_ESTADOSPAGO[EstadoPago.REEMBOLSADO] = 'Reembolsado';
  }

  ngOnInit() {
    this.route.paramMap.forEach((params: ParamMap) => {
      this.pagoService.get(Number.parseInt(params.get('id'),  10))
        .subscribe((res) => {
          this.pago = res;
          this.cargarCuenta();
          this.cargarAsistente();
        }, console.error);
    });

  }

  private cargarCuenta(): void {
    this.cuentaService.get(this.pago.cuenta)
      .subscribe((resCuenta) => {
        this.cuenta = resCuenta;
      }, console.error);
  }

  private cargarAsistente(): void {
    this.asistenteService.get(this.pago.titular)
      .subscribe((res) => {
        this.asistente = res;
      }, console.error);
  }


}

import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { IPago } from '../../../models/IPago';
import { PagoService } from '../../../services/pago.service';

@Component({
  selector: 'app-reembolsos-pagos',
  templateUrl: './reembolsos-pagos.component.html',
  styleUrls: ['./reembolsos-pagos.component.scss']
})
export class ReembolsosPagosComponent implements OnInit {

  API_URL = environment.apiUrl;

  private pagosReembolsoPendiente: IPago[] = [];
  private pagosReembolsoAprobado: IPago[] = [];
  private pagosReembolsados: IPago[] = [];

  constructor(
    private pagoService: PagoService
  ) { }

  ngOnInit() {
    this.cargarPagosPendientesReembolso();
    this.cargarPagosReembolsoAprobado();
    this.cargarPagosReembolsados();
  }

  private cargarPagosPendientesReembolso(): void {
    this.pagoService.getAllReembolsosPendientes().subscribe((res) => {
      this.pagosReembolsoPendiente = res;
    }, console.error);
  }

  private cargarPagosReembolsoAprobado(): void {
    this.pagoService.getAllReembolsosAprobados().subscribe((res) => {
      this.pagosReembolsoAprobado = res;
    }, console.error);
  }

  private cargarPagosReembolsados(): void {
    this.pagoService.getAllReembolsados().subscribe((res) => {
      this.pagosReembolsados = res;
    }, console.error);
  }


}

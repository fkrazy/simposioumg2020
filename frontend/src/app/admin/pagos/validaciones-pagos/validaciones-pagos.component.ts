import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { PagoService } from '../../../services/pago.service';
import { IPago } from '../../../models/IPago';

@Component({
  selector: 'app-validaciones-pagos',
  templateUrl: './validaciones-pagos.component.html',
  styleUrls: ['./validaciones-pagos.component.scss']
})
export class ValidacionesPagosComponent implements OnInit {

  API_URL = environment.apiUrl;

  public pagosPendientes: IPago[] = [];

  constructor(
    private pagoService: PagoService
  ) { }

  ngOnInit() {
    this.cargarPagosPendientes();
  }

  private cargarPagosPendientes(): void {
    this.pagoService.getAllPendientes().subscribe((res) => {
      this.pagosPendientes = res;
    }, console.error);
  }

}

import { Component, OnInit } from '@angular/core';
import {IPago} from '../../../models/IPago';
import {PagoService} from '../../../services/pago.service';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.scss']
})
export class PagosComponent implements OnInit {

  public pagosAceptados: IPago[] = [];
  public pagosRechazados: IPago[] = [];

  constructor(
    private pagoService: PagoService
  ) { }

  ngOnInit() {
    this.cargarPagosAceptados();
    this.cargarPagosRechazados();
  }

  private cargarPagosAceptados(): void {
    this.pagoService.getAllAceptados().subscribe((res) => {
      this.pagosAceptados = res;
    }, console.error);
  }

  private cargarPagosRechazados(): void {
    this.pagoService.getAllRechazados().subscribe((res) => {
      this.pagosRechazados = res;
    }, console.error);
  }

}

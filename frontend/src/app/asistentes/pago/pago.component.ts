import { Component, OnInit } from '@angular/core';
import { faEdit, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ICuenta } from '../../models/ICuenta';
import { CuentaService } from '../../services/cuenta.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.scss']
})
export class PagoComponent implements OnInit {

  faEdit = faEdit;
  faSave = faSave;
  faTimes = faTimes;

  public cuentas: ICuenta[] = [];

  public registrandoPago = false;

  public formRegistroPago = new FormGroup({
    foto: new FormControl('', [
      Validators.required,
    ])
  });

  constructor(
    private cuentaService: CuentaService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.cuentaService.getAll().subscribe((res) => {
      this.cuentas = res;
    }, console.error);
  }

  public onSubmitFormRegistroPago(): void {

  }

  public openModalRegistroPago(content): void {
    this.modalService.open(content, {
      size: 'lg',
      centered: true,
      windowClass: 'animated bounceIn'
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { faPlus, faTrashAlt, faEdit, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ICuenta } from '../../models/ICuenta';
import { CuentaService } from '../../services/cuenta.service';

@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.scss']
})
export class CuentasComponent implements OnInit {

  faPlus = faPlus;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faSave = faSave;
  faTimes = faTimes;

  public opcionNuevaCuenta = true;
  public cuentas: ICuenta[] = [];
  public selectedCuenta: ICuenta = null;

  public guardando = false;

  public formCuenta = new FormGroup({
    numero: new FormControl('', [
      Validators.required,
      Validators.maxLength(64),
    ]),
    banco: new FormControl('', [
      Validators.required,
      Validators.maxLength(64),
    ]),
    titular: new FormControl('', [
      Validators.required,
      Validators.maxLength(128),
    ]),
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

  public onSubmitFormCuenta(): void {

    if (!this.formCuenta.valid) return;
    this.guardando = true;

    if (this.opcionNuevaCuenta) {
      this.cuentaService.create(this.formCuenta.value)
        .subscribe(res => {

          this.guardando = false;
          this.modalService.dismissAll();

        }, console.error);
    } else {

      this.guardando = false;

    }

  }

  public onEliminarCuenta(): void {
    if (this.selectedCuenta == null) return;
  }

  public onCuentaClicked(cuenta: ICuenta): void {
    if (this.selectedCuenta == null || this.selectedCuenta.id !== cuenta.id) {
      this.selectedCuenta = cuenta;
    } else {
      this.selectedCuenta = null;
    }
  }

  public openModalNueva(content): void {
    this.opcionNuevaCuenta = true;
    this.formCuenta.reset();
    this.openModal(content);
  }

  public openModalEditar(content): void {
    if (this.selectedCuenta == null) return;
    this.opcionNuevaCuenta = false;
    this.formCuenta.reset(this.selectedCuenta);
    this.openModal(content);
  }

  public openModal(content): void {
    this.modalService.open(content, {
      size: 'lg',
      centered: true,
      windowClass: 'animated bounceIn'
    });
  }

}

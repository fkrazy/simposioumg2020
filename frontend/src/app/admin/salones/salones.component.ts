import { Component, OnInit } from '@angular/core';
import { faPlus, faTrashAlt, faEdit, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng';
import swal from 'sweetalert2';

import { ISalon } from '../../models/ISalon';
import { SalonService } from '../../services/salon.service';
import { ErrorWithMessages, ErrorWithToastr } from '../../utils/errores';

@Component({
  selector: 'app-salones',
  templateUrl: './salones.component.html',
  styleUrls: ['./salones.component.scss']
})
export class SalonesComponent implements OnInit {

  faPlus = faPlus;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faSave = faSave;
  faTimes = faTimes;

  public erroresFormSalon: ErrorWithMessages;
  public erroresEliminacion: ErrorWithToastr;

  public opcionNuevoSalon = true;
  public salones: ISalon[] = [];
  public selectedSalon: ISalon = null;

  public guardando = false;

  public formSalon = new FormGroup({
    nombre: new FormControl('', [
      Validators.required,
      Validators.maxLength(64)
    ]),
    ubicacion: new FormControl('', [
      Validators.required,
      Validators.maxLength(128)
    ]),
    capacidad: new FormControl('', [
      Validators.required,
      Validators.pattern('^\\d+$')
    ]),
  });

  constructor(
    private salonService: SalonService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private messageService: MessageService,
  ) {
    this.erroresFormSalon = new ErrorWithMessages(this.messageService, () => this.guardando = false);
    this.erroresEliminacion = new ErrorWithToastr(this.toastr);
  }

  ngOnInit() {
    this.salonService.getAll()
      .subscribe(res => {
        this.salones = res;
      }, console.error);
  }

  public onSubmitFormSalon(): void {

    if (!this.formSalon.valid) return;
    this.guardando = true;

    if (this.opcionNuevoSalon) {
      this.salonService.create(this.formSalon.value)
        .subscribe((res) => {

          this.salones.push(res);

          this.guardando = false;
          this.modalService.dismissAll();

        }, error => this.erroresFormSalon.showError(error));
    } else {

      const salon = this.formSalon.value;
      salon.id = this.selectedSalon.id;
      this.salonService.update(salon)
        .subscribe((res) => {

          this.selectedSalon.nombre = res.nombre;
          this.selectedSalon.ubicacion = res.ubicacion;
          this.selectedSalon.capacidad = res.capacidad;

          this.guardando = false;
          this.modalService.dismissAll();
        }, error => this.erroresFormSalon.showError(error));

    }

  }

  public onEliminarSalon(): void {
    if (this.selectedSalon == null) return;

    swal.fire({
      title: 'Estas a punto de eliminar un salon ',
      text: 'La eliminacion no se puede revertir',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.salonService.delete(this.selectedSalon.id)
          .subscribe((res) => {
            this.salones.splice(this.salones.findIndex((s) => s.id === this.selectedSalon.id), 1);
            this.selectedSalon = null;
          }, error => this.erroresEliminacion.showError(error));
      }
    });
  }

  public onSalonClicked(salon: ISalon): void {
    if (this.selectedSalon == null || this.selectedSalon.id !== salon.id) {
      this.selectedSalon = salon;
    } else {
      this.selectedSalon = null;
    }
  }

  public openModalNuevo(content): void {
    this.opcionNuevoSalon = true;
    this.formSalon.reset();
    this.openModal(content);
  }

  public openModalEditar(content): void {
    if(this.selectedSalon == null) return;
    this.opcionNuevoSalon = false;
    this.formSalon.reset(this.selectedSalon);
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

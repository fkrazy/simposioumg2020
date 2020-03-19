import { Component, OnInit } from '@angular/core';
import { faPlus, faTrashAlt, faEdit, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ICarrera } from '../../models/ICarrera';
import { CarreraService } from '../../services/carrera.service';

import swal from 'sweetalert2';

@Component({
  selector: 'app-carreras',
  templateUrl: './carreras.component.html',
  styleUrls: ['./carreras.component.scss']
})
export class CarrerasComponent implements OnInit {

  faPlus = faPlus;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faSave = faSave;
  faTimes = faTimes;

  public opcionNuevaCarrera = true;
  public carreras: ICarrera[] = [];
  public selectedCarrera: ICarrera = null;

  public guardando = false;

  public formCarrera = new FormGroup({
    codigo: new FormControl('', [
      Validators.required,
    ]),
    nombre: new FormControl('', [
      Validators.required,
      Validators.maxLength(128),
    ]),
  });

  constructor(
    private carreraService: CarreraService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.cargarCarreras();
  }

  public onSubmitFormCarrera(): void {

    if (!this.formCarrera.valid) return;
    this.guardando = true;

    if (this.opcionNuevaCarrera) {
      this.carreraService.create(this.formCarrera.value)
        .subscribe((res) => {

          this.carreras.push(res);

          this.guardando = false;
          this.modalService.dismissAll();

        }, console.error);
    } else {
      const carrera = this.formCarrera.value;
      this.carreraService.update(carrera).subscribe((res) => {

        this.selectedCarrera.nombre = res.nombre;

        this.guardando = false;
        this.modalService.dismissAll();
      }, console.error);
    }

  }

  public onEliminarCarrera(): void {
    if (this.selectedCarrera == null) return;
    swal.fire({
      title: 'Estas a punto de eliminar una carrera',
      text: 'La eliminacion no se puede revertir',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.carreraService.delete(this.selectedCarrera.codigo).subscribe((res) => {
          // this.cargarCarreras();
          this.carreras.splice(this.carreras.findIndex((c) => c.codigo == this.selectedCarrera.codigo), 1);
          this.selectedCarrera = null;
        }, error => {
          if (error.error.detail) {
            this.toastr.error(error.error.detail);
          }
          console.error(error);
        });
      }
    });

  }

  public onCarreraClicked(carrera: ICarrera): void {
    if (this.selectedCarrera == null || this.selectedCarrera.codigo !== carrera.codigo) {
      this.selectedCarrera = carrera;
    } else {
      this.selectedCarrera = null;
    }
  }

  public openModalNueva(content): void {
    this.opcionNuevaCarrera = true;
    this.formCarrera.reset();
    this.openModal(content);
  }

  public openModalEditar(content): void {
    if (this.selectedCarrera == null) return;
    this.opcionNuevaCarrera = false;
    this.formCarrera.reset(this.selectedCarrera);
    this.openModal(content);
  }

  public openModal(content): void {
    this.modalService.open(content, {
      size: 'lg',
      centered: true,
      windowClass: 'animated bounceIn'
    });
  }

  private cargarCarreras(): void {
    this.carreraService.getAll().subscribe((res) => {
      this.carreras = res;
    }, console.error);
  }
}

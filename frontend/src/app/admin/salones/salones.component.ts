import { Component, OnInit } from '@angular/core';
import { ISalon } from '../../models/ISalon';
import { SalonService } from '../../services/salon.service';
import { faPlus, faTrashAlt, faEdit, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
    private modalService: NgbModal
  ) { }

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
        .subscribe(res => {

          this.guardando = false;
          this.modalService.dismissAll();

        }, console.error);
    } else {

      this.guardando = false;

    }

  }

  public onEliminarSalon(): void {
    if (this.selectedSalon == null) return;
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

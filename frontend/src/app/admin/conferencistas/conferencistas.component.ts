import { Component, OnInit } from '@angular/core';
import { faPlus, faTrashAlt, faEdit, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IConferencista } from '../../models/IConferencista';
import { ConferencistaService } from '../../services/conferencista.service';

@Component({
  selector: 'app-conferencistas',
  templateUrl: './conferencistas.component.html',
  styleUrls: ['./conferencistas.component.scss']
})
export class ConferencistasComponent implements OnInit {

  faPlus = faPlus;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faSave = faSave;
  faTimes = faTimes;

  public opcionNuevoConf = false;
  public conferencistas: IConferencista[] = [];
  public selectedConf: IConferencista = null;

  public guardando = false;

  public formConf = new FormGroup({
    nombre: new FormControl('', [
      Validators.required,
      Validators.maxLength(64)
    ]),
    profesion: new FormControl('', [
      Validators.required,
      Validators.maxLength(128)
    ]),
    resumen: new FormControl('', [
      Validators.required,
      Validators.maxLength(256)
    ]),
  });

  constructor(
    private confService: ConferencistaService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.confService.getAll()
      .subscribe(res => {
        this.conferencistas = res;
      }, console.error);
  }

  public onSubmitFormConf(): void {

    if (!this.formConf.valid) return;
    this.guardando = true;

    if (this.opcionNuevoConf) {
      this.confService.create(this.formConf.value)
        .subscribe(res => {

          this.guardando = false;
          this.modalService.dismissAll();

        }, console.error);
    } else {

      this.guardando = false;

    }

  }

  public onEliminarConf(): void {
    if (this.selectedConf == null) return;
  }

  public onConfClicked(conferencista: IConferencista): void {
    if (this.selectedConf == null || this.selectedConf.id !== conferencista.id) {
      this.selectedConf = conferencista;
    } else {
      this.selectedConf = null;
    }
  }

  public openModalNuevo(content): void {
    this.opcionNuevoConf = true;
    this.formConf.reset();
    this.openModal(content);
  }

  public openModalEditar(content): void {
    if (this.selectedConf == null) return;
    this.opcionNuevoConf = false;
    this.formConf.reset(this.selectedConf);
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

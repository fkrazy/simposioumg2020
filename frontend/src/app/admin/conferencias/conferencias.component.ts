import { Component, OnInit } from '@angular/core';
import { faPlus, faTrashAlt, faEdit, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {IConferencista} from '../../models/IConferencista';
import {IConferencia} from '../../models/IConferencia';
import {ISalon} from '../../models/ISalon';
import {ConferenciaService} from '../../services/conferencia.service';
import {ConferencistaService} from '../../services/conferencista.service';
import {SalonService} from '../../services/salon.service';

@Component({
  selector: 'app-conferencias',
  templateUrl: './conferencias.component.html',
  styleUrls: ['./conferencias.component.scss']
})
export class ConferenciasComponent implements OnInit {

  faPlus = faPlus;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faSave = faSave;
  faTimes = faTimes;

  public opcionNuevaConferencia = false;
  public conferencias: IConferencia[] = [];
  public selectedConferencia: IConferencia = null;

  public conferencistas: IConferencista[] = [];
  public salones: ISalon[] = [];

  public guardando = false;

  public formConferencia = new FormGroup({
    tema: new FormControl('', [
      Validators.required,
      Validators.maxLength(64)
    ]),
    inicio: new FormControl('', [
      Validators.required,
      Validators.pattern('^([0-2][0-3]|[0-1]?[0-9])(:[0-5]?[0-9])?$')
    ]),
    fin: new FormControl('', [
      Validators.required,
      Validators.pattern('^([0-2][0-3]|[0-1]?[0-9])(:[0-5]?[0-9])?$')
    ]),
    id_conferencista: new FormControl('', [
      Validators.required,
      Validators.pattern('^\\d+$'),
    ]),
    id_salon: new FormControl('', [
      Validators.required,
      Validators.pattern('^\\d+$'),
    ]),
  });

  constructor(
    private conferenciaService: ConferenciaService,
    private conferencistaService: ConferencistaService,
    private salonService: SalonService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {

    this.conferenciaService.getAll()
      .subscribe(res => {
        this.conferencias = res;
      }, console.error);

    this.conferencistaService.getAll()
      .subscribe(res => {
        this.conferencistas = res;
      }, console.error);

    this.salonService.getAll()
      .subscribe(res => {
        this.salones = res;
      }, console.error);

  }

  public onSubmitFormConferencia(): void {

    if (!this.formConferencia.valid) return;
    this.guardando = true;

    if (this.opcionNuevaConferencia) {
      const conf = this.formConferencia.value;
      conf.conferencista = this.conferencistas.find(c => c.id == conf.id_conferencista);
      conf.salon = this.salones.find(s => s.id == conf.id_salon);
      this.conferenciaService.create(this.formConferencia.value)
        .subscribe(res => {

          this.guardando = false;
          this.modalService.dismissAll();

        }, console.error);
    } else {

      this.guardando = false;

    }

  }

  public onEliminarConferencia(): void {
    if (this.selectedConferencia == null) return;
  }

  public onConferenciaClicked(conferencia: IConferencia): void {
    if (this.selectedConferencia == null || this.selectedConferencia.id !== conferencia.id) {
      this.selectedConferencia = conferencia;
    } else {
      this.selectedConferencia = null;
    }
  }

  public openModalNuevo(content): void {
    this.opcionNuevaConferencia = true;
    this.formConferencia.reset();
    this.openModal(content);
  }

  public openModalEditar(content): void {
    if (this.selectedConferencia == null) return;
    this.opcionNuevaConferencia = false;
    this.formConferencia.reset(this.selectedConferencia);
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

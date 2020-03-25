import { Component, OnInit } from '@angular/core';
import { faPlus, faTrashAlt, faEdit, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng';
import { ToastrService } from 'ngx-toastr';

import { IConferencista } from '../../models/IConferencista';
import { IConferencia } from '../../models/IConferencia';
import { ISalon } from '../../models/ISalon';
import { ConferenciaService } from '../../services/conferencia.service';
import { ConferencistaService } from '../../services/conferencista.service';
import { SalonService } from '../../services/salon.service';
import { ErrorWithMessages, ErrorWithToastr } from '../../utils/errores';
import { pedirConfirmacion } from '../../utils/confirmaciones';

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

  public erroresFormConferencia: ErrorWithMessages;
  public erroresEliminacion: ErrorWithToastr;

  public opcionNuevaConferencia = false;
  public conferencias: IConferencia[] = [];
  public selectedConferencia: IConferencia = null;

  public conferencistas: IConferencista[] = [];
  public salones: ISalon[] = [];

  public guardando = false;

  public fotoUrl: string = null;

  public formConferencia = new FormGroup({
    tema: new FormControl('', [
      Validators.required,
      Validators.maxLength(64)
    ]),
    inicio: new FormControl('', [
      Validators.required,
      Validators.pattern('^([0-2][0-3]|[0-1]?[0-9])(:[0-5]?[0-9])?$'),
      this.horaInicioLtHoraFin()
    ]),
    fin: new FormControl('', [
      Validators.required,
      Validators.pattern('^([0-2][0-3]|[0-1]?[0-9])(:[0-5]?[0-9])?$'),
      this.horaFinGtHoraInicio()
    ]),
    id_conferencista: new FormControl('', [
      Validators.required,
      Validators.pattern('^\\d+$'),
    ]),
    id_salon: new FormControl('', [
      Validators.required,
      Validators.pattern('^\\d+$'),
    ]),
    foto: new FormControl('', [])
  });

  private horarioInicio = undefined;
  private horarioFin = undefined;

  constructor(
    private conferenciaService: ConferenciaService,
    private conferencistaService: ConferencistaService,
    private salonService: SalonService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private messageService: MessageService,
  ) {
    this.erroresFormConferencia = new ErrorWithMessages(messageService, () => this.guardando = false);
    this.erroresEliminacion = new ErrorWithToastr(this.toastr);
  }

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

    const conf = this.formConferencia.value;
    // conf.conferencista = this.conferencistas.find(c => c.id == conf.id_conferencista);
    // conf.salon = this.salones.find(s => s.id == conf.id_salon);
    conf.inicio = this.strToTime(conf.inicio);
    conf.fin = this.strToTime(conf.fin);

    if (this.opcionNuevaConferencia) {

      const formData = new FormData();
      formData.append('conferencista', conf.id_conferencista);
      formData.append('salon', conf.id_salon);
      formData.append('tema', conf.tema);
      formData.append('inicio', conf.inicio);
      formData.append('fin', conf.fin);
      formData.append('foto', this.formConferencia.get('foto').value);

      this.conferenciaService.create(formData)
        .subscribe((res) => {

          this.conferencias.push(res);

          this.guardando = false;
          this.modalService.dismissAll();

        }, error => this.erroresFormConferencia.showError(error));
    } else {

      const formData = new FormData();
      if (this.selectedConferencia.id_conferencista !== conf.id_conferencista) {
        formData.append('conferencista', conf.id_conferencista);
      }
      if (this.selectedConferencia.id_salon !== conf.id_salon) {
        formData.append('salon', conf.id_salon);
      }
      if (this.selectedConferencia.tema !== conf.tema) {
        formData.append('tema', conf.tema);
      }
      if (this.selectedConferencia.inicio !== conf.inicio) {
        formData.append('inicio', conf.inicio);
      }
      if (this.selectedConferencia.fin !== conf.fin) {
        formData.append('fin', conf.fin);
      }
      if (this.selectedConferencia.foto !== this.fotoUrl) {
        formData.append('foto', this.formConferencia.get('foto').value);
      }

      this.conferenciaService.update(this.selectedConferencia.id, formData)
        .subscribe((res) => {

          this.conferencias[this.conferencias.findIndex((c) => c.id === this.selectedConferencia.id)] = res;
          this.selectedConferencia = res;

          this.guardando = false;
          this.modalService.dismissAll();

        }, error => this.erroresFormConferencia.showError(error));

    }

  }

  public onEliminarConferencia(): void {
    if (this.selectedConferencia == null) return;

    pedirConfirmacion('Estas a punto de eliminar una conferencia',
      'La eliminacion no se puede revertir',
      'Eliminar').then((result) => {
      if (result.value) {
        this.conferenciaService.delete(this.selectedConferencia.id)
          .subscribe((res) => {
            this.conferencias.splice(this.conferencias.findIndex((c) => c.id === this.selectedConferencia.id), 1);
            this.selectedConferencia = null;
          }, error => this.erroresEliminacion.showError(error));
      }
    });


  }

  public onConferenciaClicked(conferencia: IConferencia): void {
    if (this.selectedConferencia == null || this.selectedConferencia.id !== conferencia.id) {
      this.selectedConferencia = conferencia;
    } else {
      this.selectedConferencia = null;
    }
  }

  public openModalNuevo(content): void {
    this.fotoUrl = null;
    this.opcionNuevaConferencia = true;
    this.formConferencia.reset();
    this.openModal(content);
  }

  public openModalEditar(content): void {
    if (this.selectedConferencia == null) return;
    this.fotoUrl = this.selectedConferencia.foto;
    this.opcionNuevaConferencia = false;
    const conferencia = Object.assign({}, this.selectedConferencia);
    conferencia.inicio = conferencia.inicio.substring(0, 5);
    conferencia.fin = conferencia.fin.substring(0, 5);
    this.formConferencia.reset(conferencia);
    this.openModal(content);
  }

  public openModal(content): void {
    this.modalService.open(content, {
      size: 'lg',
      centered: true,
      windowClass: 'animated bounceIn'
    });
  }

  public onFotoChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formConferencia.get('foto').setValue(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        const fotoBase64 = reader.result + '';
        this.fotoUrl = fotoBase64;

        /*const img = document.querySelector('#img-foto-conferencia');
        if (img != null)
          img.setAttribute('src', fotoBase64);*/

      };
      reader.readAsDataURL(file);
    }
  }

  // convierte el string ingresado como inicio o fin al
  // formato HH:MM:SS si no lo está
  private strToTime(strTime): string {

    const regex = /^([0-1]?[0-9]|2[0-3])(:([0-5]?[0-9])(:([0-5]?[0-9]))?)?$/g;
    const match = Array.from(strTime.matchAll(regex));

    let time = match[0][1];
    if(time.length === 1) {
      time = '0' + time;
    }

    if (match[0][3]) {
      time += ':' + match[0][3];
    } else {
      time += ':00';
    }

    if (match[0][5]) {
      time += ':' + match[0][5];
    } else {
      time += ':00';
    }

    return time;
  }

  // valida que el inicio sea menor al fin
  private horaInicioLtHoraFin(): ValidatorFn {
    return (controlIni: AbstractControl): {[key: string]: any} | null => {

      const horaInicio = controlIni.value;

      const error = { horarioInvalido : { value: horaInicio }};

      if (horaInicio != null && horaInicio.length >= 1) {
        const regex = /^([0-1]?[0-9]|2[0-3])(:([0-5]?[0-9])(:([0-5]?[0-9]))?)?$/g;

        const matchIni = Array.from(horaInicio.matchAll(regex));

        if (matchIni.length > 0) {
          const horaIni = matchIni[0][1] * 1;
          const minutoIni = matchIni[0][3] * 1;


          if (horaIni != undefined && !Number.isNaN(horaIni)) {
            let inicio = horaIni * 60; // convertir a minutos
            if (minutoIni != undefined && !Number.isNaN(minutoIni)) {
              inicio += minutoIni;
            }
            this.horarioInicio = inicio;

            if (this.horarioFin == undefined || (this.horarioInicio < this.horarioFin)) {
              const controlFin = this.formConferencia.get('fin');
              if (this.horarioFin != undefined && !controlFin.valid) {
                controlFin.updateValueAndValidity();
              }
              return null;
            } else {
              return error;
            }
          }
        }
      }
      this.horarioInicio = undefined;
      return error;

    };
  }

  // valida que el fin sea mayor al inicio
  private horaFinGtHoraInicio(): ValidatorFn {
    return (controlFin: AbstractControl): {[key: string]: any} | null => {
      const horaFin = controlFin.value;

      const error = { horarioInvalido: { value: horaFin } };

      if (horaFin != null && horaFin.length >= 1) {
        const regex = /^([0-1]?[0-9]|2[0-3])(:([0-5]?[0-9])(:([0-5]?[0-9]))?)?$/g;

        const matchFin = Array.from(horaFin.matchAll(regex));

        if (matchFin.length > 0) {
          const horaFinal = matchFin[0][1] * 1;
          const minutoFinal = matchFin[0][3] * 1;

          if (horaFinal != undefined && !Number.isNaN(horaFinal)) {
            let fin = horaFinal * 60; // convertir a minutos
            if (minutoFinal != undefined && !Number.isNaN(minutoFinal)) {
              fin += minutoFinal;
            }
            this.horarioFin = fin;

            if (this.horarioInicio == undefined || ( this.horarioInicio < this.horarioFin)) {
              const controlIni = this.formConferencia.get('inicio');
              if (this.horarioInicio != undefined && !controlIni.valid) {
                controlIni.updateValueAndValidity();
              }
              return null;
            } else {
              return error;
            }
          }
        }
      }
      this.horarioFin = undefined;
      return error;

    };
  }

}

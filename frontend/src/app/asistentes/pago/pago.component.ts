import { Component, OnInit } from '@angular/core';
import { faEdit, faSave, faTimes, faMoneyBill, faReceipt, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng';

import { ICuenta } from '../../models/ICuenta';
import { CuentaService } from '../../services/cuenta.service';
import { IPago, EstadoPago } from '../../models/IPago';
import { PagoService } from '../../services/pago.service';
import { AuthService } from '../../auth/auth.service';
import { IValidacionPago, ResultadoValidacionPago } from '../../models/IValidacionPago';
import { ValidacionPagoService } from '../../services/validacion-pago.service';
import { IEvaluacionReembolso, ResultadoEvaluacionReembolso } from '../../models/IEvaluacionReembolso';
import { EvaluacionReembolsoService } from '../../services/evaluacion-reembolso.service';
import { ErrorWithMessages, ErrorWithToastr } from '../../utils/errores';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.scss'],
})
export class PagoComponent implements OnInit {

  // representacion de un pago sin registrar
  static PAGO_SINREGISTRAR: IPago = {
    codigo_pago: '',
    cuenta_id: 0,
    titular_id: 0,
    foto: '',
    fecha: '',
    hora: '',
    estado: 0
  };

  PAGO_PENDIENTE_VALIDACION = EstadoPago.PENDIENTE_VALIDACION;
  PAGO_ACEPTADO = EstadoPago.ACEPTADO;
  PAGO_RECHAZADO = EstadoPago.RECHAZADO;
  PAGO_EVALUACION_REEMBOLSO = EstadoPago.EVALUACION_REEMBOLSO;
  PAGO_REEMBOLSO_APROBADO = EstadoPago.REEMBOLSO_APROBADO;
  PAGO_REEMBOLSADO = EstadoPago.REEMBOLSADO;

  VALIDACION_PAGO_ACEPTADO = ResultadoValidacionPago.ACEPTADO;
  VALIDACION_PAGO_RECHAZADO = ResultadoValidacionPago.RECHAZADO;

  EVALREEMBOLSO_PAGO_ACEPTADO = ResultadoEvaluacionReembolso.ACEPTADO;
  EVALREEMBOLSO_PAGO_RECHAZADO = ResultadoEvaluacionReembolso.RECHAZADO;
  EVALREEMBOLSO_PAGO_REEMBOLSADO = ResultadoEvaluacionReembolso.REEMBOLSADO;

  TEXTO_ESTADOSPAGO: string[] = [];

  faEdit = faEdit;
  faSave = faSave;
  faTimes = faTimes;
  faMoneyBill = faMoneyBill;
  faReceipt = faReceipt;
  faPaperPlane = faPaperPlane;

  public erroresForms: ErrorWithMessages;
  public erroresToastr: ErrorWithToastr;

  public monto = 300;

  public cuentas: ICuenta[] = [];
  public pago: IPago = null;
  public validacionesPago: IValidacionPago[] = [];
  public reembolsosPago: IEvaluacionReembolso[] = [];

  public registrandoPago = false;
  public guardando = false;
  public solicitandoReembolso = false;

  private fotoStr = '';
  private fotoStrEdicion = '';

  public formRegistroPago = new FormGroup({
    codigo_recibo: new FormControl('', [
      Validators.required,
    ]),
    id_cuenta: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]+$')
    ]),
    foto: new FormControl('', [
      Validators.required,
    ])
  });

  public formEdicionPago = new FormGroup({
    codigo_recibo: new FormControl('', [
      Validators.required,
    ]),
    id_cuenta: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]+$')
    ]),
    foto: new FormControl('', [])
  });

  constructor(
    private pagoService: PagoService,
    private validacionPagoService: ValidacionPagoService,
    private evaluacionReembolsoService: EvaluacionReembolsoService,
    private cuentaService: CuentaService,
    private auth: AuthService,
    private modalService: NgbModal,
    private messageService: MessageService,
    private toastr: ToastrService,
  ) {
    this.TEXTO_ESTADOSPAGO[0] = 'Sin pagar';
    this.TEXTO_ESTADOSPAGO[EstadoPago.PENDIENTE_VALIDACION] = 'Pendiente de validación';
    this.TEXTO_ESTADOSPAGO[EstadoPago.ACEPTADO] = 'Aceptado';
    this.TEXTO_ESTADOSPAGO[EstadoPago.RECHAZADO] = 'Rechazado';
    this.TEXTO_ESTADOSPAGO[EstadoPago.EVALUACION_REEMBOLSO] = 'En evaluación de reembolso';
    this.TEXTO_ESTADOSPAGO[EstadoPago.REEMBOLSO_APROBADO] = 'Reembolso aprobado';
    this.TEXTO_ESTADOSPAGO[EstadoPago.REEMBOLSADO] = 'Reembolsado';
    const resetToFalse = () => {
      this.guardando = false;
      this.registrandoPago = false;
      this.solicitandoReembolso = false;
    };
    this.erroresForms = new ErrorWithMessages(this.messageService, resetToFalse);
    this.erroresToastr = new ErrorWithToastr(this.toastr, resetToFalse);
  }

  ngOnInit() {
    this.pago = PagoComponent.PAGO_SINREGISTRAR;
    this.cargarPago();
    this.cuentaService.getAll().subscribe((res) => {
      this.cuentas = res;
    }, console.error);
  }

  public onSubmitFormRegistroPago(): void {
    if (!this.formRegistroPago.valid) return;

    this.registrandoPago = true;
    const pago = this.formRegistroPago.value;

    this.pagoService.create({
      codigo_pago: pago.codigo_recibo,
      cuenta_id: pago.id_cuenta,
      foto: this.fotoStr,
      estado: EstadoPago.PENDIENTE_VALIDACION,
      titular_id: this.auth.user.id
    }).subscribe((res) => {
      this.pago = res;
      this.registrandoPago = false;
      this.modalService.dismissAll();
    }, error => this.erroresForms.showError(error));

  }

  public onSubmitFormEdicionPago(): void {
    if (!this.formEdicionPago.valid) return;

    this.guardando = true;
    const pago = this.formEdicionPago.value;

    this.pagoService.update({
      codigo_pago: pago.codigo_recibo,
      titular_id: this.pago.titular_id,
      cuenta_id: pago.id_cuenta,
      foto: this.fotoStrEdicion,
      estado: this.pago.estado === this.PAGO_RECHAZADO ? this.PAGO_PENDIENTE_VALIDACION : this.pago.estado,
    }).subscribe((res) => {
      this.pago = res;
      this.guardando = false;
      this.modalService.dismissAll();
    }, error => this.erroresForms.showError(error));
  }

  public openModalRegistroPago(content): void {
    this.formRegistroPago.reset({ foto: '' });
    this.modalService.dismissAll();
    this.openModal(content);
  }

  public openModalEdicionPago(content): void {
    this.fotoStrEdicion = this.pago.foto;
    this.formEdicionPago.reset({
      codigo_recibo: this.pago.codigo_pago,
      id_cuenta: this.pago.cuenta_id,
      foto: ''
    });
    this.modalService.dismissAll();
    this.openModal(content);
  }

  private openModal(content): void {
    this.modalService.open(content, {
      size: 'lg',
      centered: true,
      windowClass: 'animated bounceIn'
    });
  }

  public onSolicitarReembolso(): void {
    if (this.pago.estado !== this.PAGO_ACEPTADO) return;
    this.solicitandoReembolso = true;
    const pago = Object.assign({}, this.pago);
    pago.estado = this.PAGO_EVALUACION_REEMBOLSO;
    this.pagoService.update(pago)
      .subscribe((res) => {
        this.pago = res;
        this.solicitandoReembolso = false;
      }, error => this.erroresToastr.showError(error));
  }

  public onChangeFotoRecibo(event): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = document.querySelector('#img-recibo');
      const fotoBase64 = reader.result + '';
      img.setAttribute('src', fotoBase64);
      this.fotoStr = fotoBase64;
    };
    if (event.target.files.length > 0) {
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  public onChangeFotoEdicionRecibo(event): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = document.querySelector('#img-edicion-recibo');
      const fotoBase64 = reader.result + '';
      img.setAttribute('src', fotoBase64);
      this.fotoStrEdicion = fotoBase64;
    };
    if (event.target.files.length > 0) {
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  private cargarPago(): void {
    this.pagoService.get(this.auth.user.id)
      .subscribe((res) => {
        this.pago = res;
        this.cargarValidacionesPago();
        this.cargarReembolsosPago();
      }, console.error);
  }

  private cargarValidacionesPago(): void {
    this.validacionPagoService.getAllByPago(this.pago.titular_id)
      .subscribe((res) => {
        this.validacionesPago = res;
      }, console.error);
  }

  private cargarReembolsosPago(): void {
    this.evaluacionReembolsoService.getAllByPago(this.pago.titular_id)
      .subscribe((res) => {
        this.reembolsosPago = res;
      }, console.error);
  }

  /*private cargarCuenta(): void {
    this.cuentaService.get(this.pago.cuenta.id)
      .subscribe((resCuenta) => {
        this.cuenta = resCuenta;
      }, console.error);
  }*/

}

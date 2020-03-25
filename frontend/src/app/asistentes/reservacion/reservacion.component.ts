import { Component, OnInit, ErrorHandler } from '@angular/core';
import { IReservacion } from '../../models/IReservacion';
import { ReservacionService } from './../../services/reservacion.service'
import { IConferencia } from './../../models/IConferencia';
import { ConferenciaService } from './../../services/conferencia.service';
import { ValidacionPagoService } from '../../services/validacion-pago.service';
import { IPago, EstadoPago } from '../../models/IPago';
import { PagoService } from '../../services/pago.service';
import { IValidacionPago } from '../../models/IValidacionPago';
import { IEvaluacionReembolso } from '../../models/IEvaluacionReembolso';
import { EvaluacionReembolsoService } from '../../services/evaluacion-reembolso.service';
import { AuthService } from '../../auth/auth.service';



@Component({
  selector: 'app-reservacion',
  templateUrl: './Reservacion.component.html',
  styleUrls: ['./Reservacion.component.scss']
})
export class ReservacionComponent implements OnInit {
  static PAGO_SINREGISTRAR: IPago = {
    codigo_pago: '',
    cuenta_id: 0,
    titular_id: 0,
    foto: '',
    fecha: '',
    hora: '',
    estado: 0
  };
  public pago: IPago = null;
  public validacionesPago: IValidacionPago[] = [];
  public reembolsosPago: IEvaluacionReembolso[] = [];

  estado_todo =false;
  
  Lista_conferencias : IConferencia [] = [];
  
  reservaciones : IReservacion[] =[];
  rese : IReservacion = null;

  PAGO_PENDIENTE_VALIDACION = EstadoPago.PENDIENTE_VALIDACION;
  PAGO_ACEPTADO = EstadoPago.ACEPTADO;
  PAGO_RECHAZADO = EstadoPago.RECHAZADO;
  PAGO_EVALUACION_REEMBOLSO = EstadoPago.EVALUACION_REEMBOLSO;
  PAGO_REEMBOLSO_APROBADO = EstadoPago.REEMBOLSO_APROBADO;
  PAGO_REEMBOLSADO = EstadoPago.REEMBOLSADO;
  TEXTO_ESTADOSPAGO: string[] = [];
  constructor(
    private cuentaservicio: ConferenciaService,
    private reservacionservicio: ReservacionService,
    private pagoService: PagoService,
    private validacionPagoService: ValidacionPagoService,
    private evaluacionReembolsoService: EvaluacionReembolsoService,
    private auth: AuthService
  ) { 
    this.TEXTO_ESTADOSPAGO[0] = 'Sin pagar';
    this.TEXTO_ESTADOSPAGO[EstadoPago.PENDIENTE_VALIDACION] = 'Pendiente de validación';
    this.TEXTO_ESTADOSPAGO[EstadoPago.ACEPTADO] = 'Aceptado';
    this.TEXTO_ESTADOSPAGO[EstadoPago.RECHAZADO] = 'Rechazado';
    this.TEXTO_ESTADOSPAGO[EstadoPago.EVALUACION_REEMBOLSO] = 'En evaluación de reembolso';
    this.TEXTO_ESTADOSPAGO[EstadoPago.REEMBOLSO_APROBADO] = 'Reembolso aprobado';
    this.TEXTO_ESTADOSPAGO[EstadoPago.REEMBOLSADO] = 'Reembolsado';
  }

  ngOnInit() {
    this.inicio();
    this.pago = ReservacionComponent.PAGO_SINREGISTRAR;
    this.cargarPago();
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
  public inicio(){
    this.cuentaservicio.getAll().subscribe((res) => {
      this.Lista_conferencias = res;
    }, console.error);
    this.reservacionservicio.getAll().subscribe((res) =>{
      this.reservaciones = res;
      //console.log(res);
    }, console.error);
  }

  
 public cambiar(){
    if(this.estado_todo == true){
      this.estado_todo = false;
    }else{
      this.estado_todo = true;
    }
  }

  public estados(){
    return this.estado_todo;
  }
  public Asistir(numero){
    const reserv: IReservacion ={
      "conferencia": numero
    };
    this.reservacionservicio.create(reserv).subscribe((res) =>{
      this.rese =res;
      this.cambiar();
      location.reload();
     //console.log(res);
    },console.error)
  }

  public Desasistir(numero){
    this.reservacionservicio.delete(numero).subscribe((res) =>{
     this.rese=res;
     location.reload();
     // console.log(res)
    },console.error);
  }
}

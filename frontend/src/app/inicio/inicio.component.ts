import { Component, OnInit, ViewChild } from '@angular/core';
import { faCalendar, faCalendarAlt, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert2';

import { AuthService } from '../auth/auth.service';
import { EventoService } from '../services/evento.service';
import { IEvento } from '../models/IEvento';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  faCalendar = faCalendarAlt;
  faMapMarker = faMapMarkerAlt;

  @ViewChild('modalPrimerLogin', {static: true}) modalPrimerLogin;

  public evento: IEvento = null;
  public fecha = '10 Mayo 2020';

  constructor(
    public auth: AuthService,
    public eventoService: EventoService,
  ) { }

  ngOnInit() {
    this.evento = this.eventoService.evento;
    if(this.auth.firstLogin() === true && this.auth.isAsistente() === true) {
      swal.fire({
        title: `Bienvenid&#64; ${this.auth.user.nombres}`,
        html: '<p>Bienvenid&#64; , ya tienes una cuenta. Ahora debes realizar el pago de tu asistencia.</p><p>Si ya has pagado y cuentas con un recibo de dep&oacute;sito, debes registrar tu pago.</p><p>De lo contrario, debes realizar un dep&oacute;sito en cualquiera de las cuentas disponibles y despu&eacute;s registra tu pago.</p>',
        icon: 'info',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Entendido',
      });
    }
  }

}

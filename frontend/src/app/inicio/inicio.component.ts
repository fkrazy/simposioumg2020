import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  @ViewChild('modalPrimerLogin', {static: true}) modalPrimerLogin;

  public fecha = '10 Mayo 2020';

  constructor(
    public auth: AuthService,
  ) { }

  ngOnInit() {
    if(this.auth.firstLogin() === true && this.auth.isAsistente() === true) {
      swal.fire({
        title: `Bienvenido ${this.auth.user.nombres}`,
        html: '<p>Bienvenido, ya tienes una cuenta. Ahora debes realizar el pago de tu asistencia.</p><p>Si ya has pagado y cuentas con un recibo de dep&oacute;sito, debes registrar tu pago.</p><p>De lo contrario, debes realizar un dep&oacute;sito en cualquiera de las cuentas disponibles y despu&eacute;s registra tu pago.</p>',
        icon: 'info',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Entendido',
      });
    }
  }

}

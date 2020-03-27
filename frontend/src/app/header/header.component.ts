import { Component, OnInit } from '@angular/core';
import {  faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth/auth.service';
import { MenuItem } from 'primeng';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public itemsMenuUser: MenuItem[] = [];
  public itemsMenuAdmin: MenuItem[] = [];

  faSignInAlt = faSignInAlt;

  isExpanded = false;

  constructor(
    public auth: AuthService
  ) {
    this.itemsMenuAdmin = [
      {label: 'Reporte de pagos', routerLink: '/admin/reportes/pagos'},
      {label: 'Reporte de estudiantes', routerLink: '/admin/reportes/estudiantes'},
      {label: 'Pagos', routerLink: '/admin/pagos'},
      {label: 'Validaciones', routerLink: '/admin/pagos/validaciones'},
      {label: 'Reembolsos', routerLink: '/admin/pagos/reembolsos'},
      {label: 'Conferencias', routerLink: '/admin/conferencias'},
      {label: 'Salones', routerLink: '/admin/salones'},
      {label: 'Conferencistas', routerLink: '/admin/conferencistas'},
      {label: 'Carreras', routerLink: '/admin/carreras'},
      {label: 'Cuentas', routerLink: '/admin/cuentas'},
      {separator: true},
      {label: 'Salir', icon: 'pi pi-sign-out', routerLink: `/logout`},
    ];

    this.itemsMenuUser = [
      {label: 'Salir', icon: 'pi pi-sign-out', routerLink: `/logout`},
    ];
  }

  ngOnInit() {

  }

  collapse() {
    this.isExpanded = false;
  }

  toggle(): void {
    this.isExpanded = !this.isExpanded;
  }

  public isAuthenticated(): boolean {
    return this.auth.isAuthenticated();
  }

  public isAsistente() {
    return this.auth.isAsistente();
  }

  public isAdmin() {
    return this.auth.isAdmin();
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  @ViewChild('modalPrimerLogin', {static: true}) modalPrimerLogin;

  constructor(
    public auth: AuthService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    if(this.auth.firstLogin() == true) {
      this.modalService.open(this.modalPrimerLogin, {
        size: 'sm',
        centered: false,
        windowClass: 'animated bounceIn'
      });
    }
    setTimeout(() =>  this.modalService.dismissAll(), 22000);
  }

}

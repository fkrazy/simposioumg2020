import { Component, OnInit } from '@angular/core';
import {  faSignInAlt, faSignOutAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from '../auth/auth.service';
import {IUser} from '../models/IUser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  faSignInAlt = faSignInAlt;
  faSignOutAlt = faSignOutAlt;
  faTimes = faTimes;

  isExpanded = false;
  public entrando = false;
  public errorLogin: string = null;

  public formLogin = new FormGroup({
    username: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  });

  constructor(
    private auth: AuthService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
  }

  public openModalLogin(content): void {
    this.errorLogin = null;
    this.formLogin.reset();
    this.modalService.open(content, {
      centered: true,
      size: 'lg',
      windowClass: 'animated bounceIn'
    });

  }

  public onEntrar(): void {
    this.entrando = true;
    const {username, password} = this.formLogin.value;
    this.auth.signIn(username, password)
      .then((user: IUser) => {

        this.modalService.dismissAll();
      }).catch((error: any) => {
        this.errorLogin = error;
    }).finally(() => this.entrando = false);
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  public isAuthenticated() {
    return this.auth.isAuthenticated();
  }

}

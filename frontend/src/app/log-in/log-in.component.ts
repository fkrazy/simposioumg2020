import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faTimes, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

import {Message} from 'primeng';

import { IUser } from '../models/IUser';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  public msgs: Message[] = [];

  faTimes = faTimes;
  faSignInAlt = faSignInAlt;

  public entrando = false;

  public formLogin = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  });

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  public onEntrar(): void {
    this.entrando = true;
    const {username, password} = this.formLogin.value;
    this.auth.signIn(username, password)
      .then((user: IUser) => {
        this.router.navigateByUrl('/');
      }).catch((error: any) => {
      if (error.error.detail) {
        this.notificarError(error.error.detail);
      }

    }).finally(() => this.entrando = false);
  }

  private notificarError(msg): void {
    this.msgs = [];
    this.msgs.push({severity: 'error', summary: undefined, detail: msg});
  }

}

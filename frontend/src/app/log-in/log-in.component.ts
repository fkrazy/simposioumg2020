import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faTimes, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

import { MessageService } from 'primeng';

import { IUser } from '../models/IUser';
import { AuthService } from '../auth/auth.service';
import { ErrorWithMessages } from '../utils/errores';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  faTimes = faTimes;
  faSignInAlt = faSignInAlt;

  private erroresForm: ErrorWithMessages;

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
    private router: Router,
    private messageService: MessageService,
  ) {
    this.erroresForm = new ErrorWithMessages(messageService);
  }

  ngOnInit() {
  }

  public onEntrar(): void {
    this.entrando = true;
    const {username, password} = this.formLogin.value;
    this.auth.signIn(username, password)
      .then((user: IUser) => {
        this.router.navigateByUrl('/');
      })
      .catch(error => this.erroresForm.showError(error))
      .finally(() => this.entrando = false);
  }
}

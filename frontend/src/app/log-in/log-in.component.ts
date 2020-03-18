import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { IUser } from '../models/IUser';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  faTimes = faTimes;

  public entrando = false;

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
    private toastr: ToastrService,
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
        this.toastr.error(error.error.detail, undefined, {
          positionClass: 'toast-bottom-right'
        });
      }

    }).finally(() => this.entrando = false);
  }

}

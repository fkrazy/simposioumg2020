import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';

@Component({
  template: '',
})
export class LogOutComponent implements OnInit {

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.auth.signOut();
  }

}

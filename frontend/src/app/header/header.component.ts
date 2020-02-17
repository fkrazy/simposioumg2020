import { Component, OnInit } from '@angular/core';
import {  faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  faSignInAlt = faSignInAlt;
  faSignOutAlt = faSignOutAlt;

  isExpanded = false;

  constructor(
    private auth: AuthService
  ) { }

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

}

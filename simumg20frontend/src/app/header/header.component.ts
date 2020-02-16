import { Component, OnInit } from '@angular/core';
import {  faSignInAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  faSignInAlt = faSignInAlt;

  isExpanded = false;

  constructor() { }

  ngOnInit() {
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  public isAuthenticated() {
    return false;
  }

}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import {Route, RouterModule} from '@angular/router';
import { HeaderComponent } from './header/header.component';

const routes: Route[] = [

];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        FontAwesomeModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

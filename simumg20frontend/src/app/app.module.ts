import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
        RouterModule.forRoot(routes)
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {Route, RouterModule} from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LogOutComponent } from './log-out/log-out.component';
import { LogInComponent } from './log-in/log-in.component';
import { OnlyNotLoggedUsersGuard } from './auth/only-not-logged-users.guard';
import { OnlyLoggedUsersGuard } from './auth/only-logged-users.guard';
import {OnlyAsistentesGuard} from './auth/only-asistentes.guard';

const routes: Route[] = [
  {
    path: 'login',
    component: LogInComponent,
    canActivate: [OnlyNotLoggedUsersGuard]
  },
  {
    path: 'logout',
    component: LogOutComponent,
    canActivate: [OnlyLoggedUsersGuard]
  },
  {
    path: 'asistentes',
    canLoad: [OnlyAsistentesGuard],
    canActivateChild: [OnlyAsistentesGuard],
    loadChildren: () => import('./asistentes/asistentes.module').then(m => m.AsistentesModule)
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LogOutComponent,
    LogInComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(routes),
        FontAwesomeModule,
      NgbModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

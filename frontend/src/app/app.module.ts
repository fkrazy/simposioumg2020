import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Route, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { SplitButtonModule, MessagesModule, MessageService, CarouselModule as CarouselPrimeNg } from 'primeng';

import { AppComponent } from './app.component';
import { LogOutComponent } from './log-out/log-out.component';
import { LogInComponent } from './log-in/log-in.component';
import { OnlyNotLoggedUsersGuard } from './auth/only-not-logged-users.guard';
import { OnlyLoggedUsersGuard } from './auth/only-logged-users.guard';
import { OnlyAsistentesGuard } from './auth/only-asistentes.guard';
import { OnlyAdminGuard } from './auth/only-admin.guard';
import { InicioComponent } from './inicio/inicio.component';
import { ConferenciasComponent } from './conferencias/conferencias.component';
import { RegistroComponent } from './registro/registro.component';
import { TokenInterceptor } from './token-interceptor';
import { AuthService } from './auth/auth.service';

const routes: Route[] = [
  {
    path: '',
    component: InicioComponent
  },
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
    path: 'registro',
    canActivate: [OnlyNotLoggedUsersGuard],
    component: RegistroComponent
  },
  {
    path: 'asistentes',
    canLoad: [OnlyAsistentesGuard],
    canActivateChild: [OnlyAsistentesGuard],
    loadChildren: () => import('./asistentes/asistentes.module').then(m => m.AsistentesModule)
  },
  {
    path: 'admin',
    canLoad: [OnlyAdminGuard],
    canActivateChild: [OnlyAdminGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LogOutComponent,
    LogInComponent,
    InicioComponent,
    ConferenciasComponent,
    RegistroComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(routes),
        FontAwesomeModule,
        NgbModule,
        CarouselModule.forRoot(),
        BrowserAnimationsModule,
        ToastrModule.forRoot(),

        SplitButtonModule,
        MessagesModule,
        CarouselPrimeNg,
    ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    MessageService,
    AuthService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

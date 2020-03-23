import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { faUserCheck } from '@fortawesome/free-solid-svg-icons';

import { Message } from 'primeng';

import { environment } from '../../environments/environment';
import { ICarrera } from '../models/ICarrera';
import { CarreraService } from '../services/carrera.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  providers: []
})
export class RegistroComponent implements OnInit {

  faUserCheck = faUserCheck;

  public msgs: Message[] = [];

  public carreras: ICarrera[] = [];

  public registrando = false;

  public formRegistro = new FormGroup({
    nombres: new FormControl('',[
      Validators.required
    ]),
    apellidos: new FormControl('',[
      Validators.required
    ]),
    correo: new FormControl('',[
      Validators.required,
      Validators.email
    ]),
    telefono: new FormControl('',[
      Validators.required,
      Validators.pattern(`^[0-9]{8,8}$`)
    ]),
    password: new FormControl('',[
      Validators.required
    ]),
    password_conf: new FormControl('',[
      Validators.required
    ]),
    es_estudiante: new FormControl('false', [
      Validators.required
    ]),
  });

  public formEstudiante = new FormGroup({
    carnet: new FormControl('',[
      Validators.required,
      Validators.pattern('^\\d{4}-\\d{2}-\\d{1,8}$')
    ]),
    semestre: new FormControl('',[
      Validators.required,
      Validators.pattern(`^[0-9]+$`)
    ]),
    codigo_carrera: new FormControl('', [
      Validators.required,
      Validators.pattern(`^[0-9]+$`)
    ])
  });

  constructor(
    private carreraService: CarreraService,
    private http: HttpClient,
    private router: Router,
  ) { }

  ngOnInit() {
    this.carreraService.getAll()
      .subscribe((res: ICarrera[]) => {
        this.carreras = res;
      });
  }

  public onRegistrar(): void {
    this.msgs = [];
    this.registrando = true;
    const {password: password, password_conf: password_conf} = this.formRegistro.value;
    if (password !== password_conf) {
      this.notificarError('Las contraseñas no coinciden');
      this.registrando = false;
      return;
    }

    const datosRegistro = Object.assign({}, this.formRegistro.value);
    datosRegistro.es_estudiante = datosRegistro.es_estudiante == 'true';
    if (datosRegistro.es_estudiante) {
      datosRegistro.carnet = this.formEstudiante.value.carnet;
      datosRegistro.semestre = this.formEstudiante.value.semestre * 1;
      datosRegistro.codigo_carrera = this.formEstudiante.value.codigo_carrera * 1;
    }

    this.http.post<null>(`${environment.apiUrl}/api/registro/`, datosRegistro)
      .subscribe((res) => {
        this.router.navigateByUrl('/login');
        this.registrando = false;
      }, error => {
        console.error(error);

        if (error.error.detail) {
          this.notificarError(error.error.detail);
        }
        this.registrando = false;
      });

  }

  private notificarError(msg): void {
    this.msgs = [];
    this.msgs.push({severity: 'error', summary: undefined, detail: msg});
  }

}

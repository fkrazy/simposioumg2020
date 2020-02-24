import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICarrera } from '../models/ICarrera';
import { CarreraService } from '../services/carrera.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  public carreras: ICarrera[] = [];

  public registrando = false;
  public errorRegistro: string = null;

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
    private carreraService: CarreraService
  ) { }

  ngOnInit() {
    this.carreraService.getAll()
      .subscribe((res: ICarrera[]) => {
        this.carreras = res;
      });
  }

  public onRegistrar(): void {
    this.registrando = true;
    this.errorRegistro = null;
    const {password: password, password_conf: password_conf} = this.formRegistro.value;
    if (password !== password_conf) {
      this.errorRegistro = 'Las contraseñas no coinciden';
      this.registrando = false;
      return;
    }

    this.registrando = false;

  }

}

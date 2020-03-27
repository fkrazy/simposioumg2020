import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteEstudiantesComponent } from './reporte-estudiantes.component';

describe('ReporteEstudiantesComponent', () => {
  let component: ReporteEstudiantesComponent;
  let fixture: ComponentFixture<ReporteEstudiantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteEstudiantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteEstudiantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

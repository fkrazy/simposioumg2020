import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteAsistenciasComponent } from './reporte-asistencias.component';

describe('ReporteAsistenciasComponent', () => {
  let component: ReporteAsistenciasComponent;
  let fixture: ComponentFixture<ReporteAsistenciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteAsistenciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteAsistenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

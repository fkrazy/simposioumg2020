import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportePagosComponent } from './reporte-pagos.component';

describe('ReportePagosComponent', () => {
  let component: ReportePagosComponent;
  let fixture: ComponentFixture<ReportePagosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportePagosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportePagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

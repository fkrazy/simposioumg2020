import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidacionesPagosComponent } from './validaciones-pagos.component';

describe('ValidacionesPagosComponent', () => {
  let component: ValidacionesPagosComponent;
  let fixture: ComponentFixture<ValidacionesPagosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidacionesPagosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidacionesPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoDetailComponent } from './pago-detail.component';

describe('PagoDetailComponent', () => {
  let component: PagoDetailComponent;
  let fixture: ComponentFixture<PagoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

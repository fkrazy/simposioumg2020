import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReembolsosPagosComponent } from './reembolsos-pagos.component';

describe('ReembolsosPagosComponent', () => {
  let component: ReembolsosPagosComponent;
  let fixture: ComponentFixture<ReembolsosPagosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReembolsosPagosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReembolsosPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

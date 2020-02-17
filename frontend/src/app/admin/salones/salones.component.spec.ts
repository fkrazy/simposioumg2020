import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonesComponent } from './salones.component';

describe('SalonesComponent', () => {
  let component: SalonesComponent;
  let fixture: ComponentFixture<SalonesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalonesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

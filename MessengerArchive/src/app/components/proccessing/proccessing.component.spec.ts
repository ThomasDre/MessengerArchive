import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProccessingComponent } from './proccessing.component';

describe('ProccessingComponent', () => {
  let component: ProccessingComponent;
  let fixture: ComponentFixture<ProccessingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProccessingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProccessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

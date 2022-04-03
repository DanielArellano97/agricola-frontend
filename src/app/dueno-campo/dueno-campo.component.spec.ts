import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuenoCampoComponent } from './dueno-campo.component';

describe('DuenoCampoComponent', () => {
  let component: DuenoCampoComponent;
  let fixture: ComponentFixture<DuenoCampoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DuenoCampoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DuenoCampoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

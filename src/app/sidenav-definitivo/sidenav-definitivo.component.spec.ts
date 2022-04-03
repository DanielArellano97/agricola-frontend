import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavDefinitivoComponent } from './sidenav-definitivo.component';

describe('SidenavDefinitivoComponent', () => {
  let component: SidenavDefinitivoComponent;
  let fixture: ComponentFixture<SidenavDefinitivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidenavDefinitivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavDefinitivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

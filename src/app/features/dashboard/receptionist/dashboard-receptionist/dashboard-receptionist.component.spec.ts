import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardReceptionistComponent } from './dashboard-receptionist.component';

describe('DashboardReceptionistComponent', () => {
  let component: DashboardReceptionistComponent;
  let fixture: ComponentFixture<DashboardReceptionistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardReceptionistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardReceptionistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

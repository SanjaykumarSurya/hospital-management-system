import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionistAppointmentFormComponent } from './receptionist-appointment-form.component';

describe('ReceptionistAppointmentFormComponent', () => {
  let component: ReceptionistAppointmentFormComponent;
  let fixture: ComponentFixture<ReceptionistAppointmentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceptionistAppointmentFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceptionistAppointmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

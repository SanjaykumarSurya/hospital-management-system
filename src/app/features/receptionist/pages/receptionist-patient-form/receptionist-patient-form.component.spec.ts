import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionistPatientFormComponent } from './receptionist-patient-form.component';

describe('ReceptionistPatientFormComponent', () => {
  let component: ReceptionistPatientFormComponent;
  let fixture: ComponentFixture<ReceptionistPatientFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceptionistPatientFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceptionistPatientFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

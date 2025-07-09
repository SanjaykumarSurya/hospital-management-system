import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionistPatientListComponent } from './receptionist-patient-list.component';

describe('ReceptionistPatientListComponent', () => {
  let component: ReceptionistPatientListComponent;
  let fixture: ComponentFixture<ReceptionistPatientListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceptionistPatientListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceptionistPatientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

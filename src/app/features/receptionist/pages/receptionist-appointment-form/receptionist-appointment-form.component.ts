import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-receptionist-appointment-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './receptionist-appointment-form.component.html',
  styleUrls: ['./receptionist-appointment-form.component.scss']
})
export class ReceptionistAppointmentFormComponent {
  appointmentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.appointmentForm = this.fb.group({
      patientId: ['', Validators.required],
      doctorId: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.appointmentForm.valid) {
      console.log('Appointment Booked:', this.appointmentForm.value);
      // Call appointment booking API here
    }
  }
}

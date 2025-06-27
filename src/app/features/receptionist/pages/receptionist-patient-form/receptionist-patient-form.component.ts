import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-receptionist-patient-form',
  templateUrl: './receptionist-patient-form.component.html',
  styleUrls: ['./receptionist-patient-form.component.scss']
})
export class ReceptionistPatientFormComponent {
  patientForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.patientForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.patientForm.valid) {
      console.log('Patient Registered:', this.patientForm.value);
      // Call patient registration API here
    }
  }
}

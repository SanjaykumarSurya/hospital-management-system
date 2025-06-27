import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from '../../appointment.service';
import { DoctorService } from '../../../doctors/doctor.service';
import { PatientService } from '../../../patients/patient.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './appointment-form.component.html',
})
export class AppointmentFormComponent implements OnInit {
  form!: FormGroup;

  isEdit = false;
  id = '';
  doctors: any[] = [];
  patients: any[] = [];

  constructor(
    private fb: FormBuilder,
    private service: AppointmentService,
    private doctorService: DoctorService,
    private patientService: PatientService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      patientId: ['', Validators.required],
      doctorId: ['', Validators.required],
      date: ['', Validators.required],
      reason: ['', Validators.required],
    });

    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.isEdit = true;
      this.service.getById(this.id).subscribe((res) => {
        this.form.patchValue({
          patientId: res.patientId ?? '',
          doctorId: res.doctorId ?? '',
          date: res.date ?? '',
          reason: res.reason ?? '',
        });
      });
    }

    this.doctorService.getAll().subscribe((res) => (this.doctors = res));
    this.patientService.getAll().subscribe((res) => (this.patients = res));
  }

  submit() {
    if (this.form.invalid) return;

    const data = this.form.value;

    const req = this.isEdit
      ? this.service.update(this.id, data)
      : this.service.create(data);

    req.subscribe(() => {
      const role = localStorage.getItem('role');
      const path = role === 'reception' ? 'reception' : 'admin';
      this.router.navigate([`/dashboard/${path}/appointments`]);
    });
  }
}

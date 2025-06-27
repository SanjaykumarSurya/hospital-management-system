import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DoctorService } from '../../doctor.service';
import { Doctor } from '../../../../shared/models/doctor.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './doctor-form.component.html',
})
export class DoctorFormComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;
  doctorId = '';

  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      specialization: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      availabledays: ['', Validators.required],
      timeslot: ['', Validators.required],
    });

    this.doctorId = this.route.snapshot.params['id'];

    if (this.doctorId) {
      this.isEdit = true;

      this.doctorService.getById(this.doctorId).subscribe({
        next: (data) => {
          console.log('Loaded doctor:', data);
        this.form.patchValue({
          doctorId: data._id ?? '',
          name: data.name ?? '',
          specialization: data.specialization ?? '',
          phone: data.phone ?? '',
          email: data.email ?? '',
          availabledays: data.availabledays ?? '',
          timeslot: data.timeslot ?? '',
        });
      }});
    }
  }

   onSubmit(): void {
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  const payload: Doctor = this.form.value;

  const request$ = this.isEdit
    ? this.doctorService.update(this.doctorId, payload)
    : this.doctorService.create(payload);

  request$.subscribe({
  next: () => {
    alert(`Doctor ${this.isEdit ? 'updated' : 'created'} successfully`);

    const role = localStorage.getItem('role');
    const path = role === 'reception' ? 'reception' : 'admin';

    this.router.navigate([`/dashboard/${path}/doctors`]);
  },
  error: (err) => {
    console.error('Error while saving the doctor:', err);
    alert('Error while saving the doctor. Please try again.');
  }
});
}
};


/** import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { DoctorService } from '../../doctor.service';
import { Doctor } from '../../../../shared/models/doctor.model';
import { CommonModule } from '@angular/common';
import { MatFormField, MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'app-doctor-form',
  imports: [ReactiveFormsModule, CommonModule, FormsModule, MatFormField, MatLabel, RouterOutlet],
  templateUrl: './doctor-form.component.html'
})
export class DoctorFormComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;
  doctorId!: string;

  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      specialization: ['', Validators.required],
      phone: ['', Validators.required],
      availabledays: ['', Validators.required],
      timeslot: ['', Validators.required],
    });

    this.doctorId = this.route.snapshot.paramMap.get('id')!;
    if (this.doctorId) {
      this.isEdit = true;
      this.doctorService.getById(this.doctorId).subscribe({
        next: (doctor) => this.form.patchValue(doctor),
        error: () => alert('Doctor not found')
      });
    }
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: Doctor = this.form.value;

    const request$ = this.isEdit
      ? this.doctorService.update(this.doctorId, payload)
      : this.doctorService.create(payload);

    request$.subscribe({
      next: () => {
        alert(`Doctor ${this.isEdit ? 'updated' : 'created'} successfully`);
        this.router.navigate(['/dashboard/admin/doctors']);
      },
      error: () => alert('Error while saving the doctor')
    });
  }
} **/
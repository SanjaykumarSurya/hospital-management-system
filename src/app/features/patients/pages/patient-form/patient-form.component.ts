import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PatientService } from '../../patient.service';
import { Patient } from '../../../../shared/models/patient.model';
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
    RouterModule
  ],
  templateUrl: './patient-form.component.html',
})
export class PatientFormComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;
  patientId = '';

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      contact: ['', Validators.required],
      address: ['', Validators.required],
      medicalHistory: ['', Validators.required]
    });

    this.patientId = this.route.snapshot.params['id'];

    if (this.patientId) {
      this.isEdit = true;

      this.patientService.getById(this.patientId).subscribe({
        next: (data) => {
          console.log('Loaded Patient', data);
          this.form.patchValue({
        patientId: data._id ?? '',
        name: data.name ?? '',
        age: data.age ?? '',
        gender: data.gender ?? '',
        contact: data.contact ?? '',
        address: data.address ?? '',
        medicalHistory: data.medicalHistory ?? ''

        });
      }});
    }
    
  }

  onSubmit():void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: Patient = this.form.value;

    const request$ = this.isEdit
      ? this.patientService.update(this.patientId, payload)
      : this.patientService.create(payload);
      console.log(this.patientId)

  request$.subscribe({
  next: () => {
    alert(`Patient ${this.isEdit ? 'updated' : 'created'} successfully`);

    const role = localStorage.getItem('role');
    const path = role === 'reception' ? 'reception' : 'admin';
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate([`/dashboard/${path}/patients`]);
  }),
  Error; (err: any) => {
    console.error('Error saving patient:', err);
    alert('Error while saving the patient. Please try again.');
  }
},
  });
}}

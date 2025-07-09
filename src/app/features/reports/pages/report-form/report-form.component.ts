import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ReportService } from '../../report.service';
import { PatientService } from '../../../patients/patient.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { DoctorService } from '../../../doctors/doctor.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    RouterOutlet,
    RouterModule
  ],
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.scss']
})
export class ReportFormComponent implements OnInit {
  form!: FormGroup; 
  file: File | null = null;
  patients: any[] = [];
  doctors: any[] = [];

  constructor(
    private fb: FormBuilder,
    private service: ReportService,
    private patientService: PatientService,
    private doctorService: DoctorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      patientId: ['', Validators.required],
      doctorName: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
    });
     
    this.loadDoctors();
    this.loadPatients();

    // this.patientService.getAll().subscribe({
    //   next:(res: any) => {
    //   console.log('Patients:', res);
    //   this.patients = res.patients || res;
    // }});
    // this.doctorService.getAll().subscribe({
    //   next:(res: any) => {
    //   console.log('Doctors:', res);
    //   this.doctors = res;
    // }});
  }
    loadDoctors(): void {
    this.doctorService.getAll().subscribe({
      next: (res: any) => {
        this.doctors = res.doctors || res;
      },
      error: (err) => {
        console.error('Failed to load doctors:', err);
      }
    });
  }

  loadPatients(): void {
    this.patientService.getAll().subscribe({
      next: (res: any) => {
        this.patients = res.Patients || res;
      },
      error: (err) => {
        console.error('Failed to load patients:', err);
      }
    });
  }

  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  submit(): void {
  if (this.form.invalid || !this.file) {
    this.form.markAllAsTouched();
    if (!this.file) alert('Please select a file.');
    return;
  }

  const formData = new FormData();
  formData.append('patientId', this.form.value.patientId!);
  formData.append('doctorName', this.form.value.doctorName!);
  formData.append('description', this.form.value.description!);
  formData.append('date', this.form.value.date!);
  formData.append('file', this.file);

  this.service.upload(formData).subscribe({
    next: () => {
      alert('Report uploaded successfully.');

      const role = localStorage.getItem('role');
      const path = role === 'reception' ? 'reception' : 'admin';

      // Refresh the route properly
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([`/dashboard/${path}/reports`]);
      }),
    

    Error; (err: any) => {
      console.error('Error uploading report:', err);
      alert('An error occurred while uploading the report. Please try again.');
    }
  },
  });
}}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ReportService } from '../../report.service';
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
  templateUrl: './report-form.component.html',
})
export class ReportFormComponent implements OnInit {
  form!: FormGroup; 
  file: File | null = null;
  patients: any[] = [];

  constructor(
    private fb: FormBuilder,
    private service: ReportService,
    private patientService: PatientService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      patientId: ['', Validators.required],
      description: ['', Validators.required],
      prescription: ['', Validators.required],
    });

    this.patientService.getAll().subscribe((res) => (this.patients = res));
  }

  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  submit() {
    if (!this.form.valid || !this.file) return;

    const formData = new FormData();
    formData.append('patientId', this.form.value.patientId!);
    formData.append('description', this.form.value.description!);
    formData.append('prescription', this.form.value.prescription!);
    formData.append('file', this.file);

    this.service.upload(formData).subscribe(() => {
      this.router.navigate(['/dashboard/admin/reports']);
    });
  }
}

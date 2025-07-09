import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { PatientService } from '../../../patients/patient.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterOutlet, RouterModule, MatFormFieldModule, MatInputModule, MatSelectModule,
    MatButtonModule, MatOption],
  selector: 'app-receptionist-patient-form',
  templateUrl: './receptionist-patient-form.component.html',
  styleUrls: ['./receptionist-patient-form.component.scss']
})
export class ReceptionistPatientFormComponent implements OnInit{
  form!: FormGroup;
   patientId: string | null = null;
  isEdit = false;

  constructor(private fb: FormBuilder, private service: PatientService, private router: Router,  private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      contact: ['', Validators.required],
      address: ['', Validators.required],
      medicalHistory: ['', Validators.required]
    });

    this.patientId = this.route.snapshot.paramMap.get('id');
    this.isEdit = !!this.patientId;

    if (this.isEdit) {
      this.service.getById(this.patientId!).subscribe({
        next: (res: any) => this.form.patchValue(res),
        error: () => alert('Failed to load patient data')
      });
    }
  }
  

  onSubmit() {
     if (this.form.invalid) return;

    const request$ = this.isEdit
      ? this.service.update(this.patientId!, this.form.value)
      : this.service.create(this.form.value);

    request$.subscribe(() => {
      alert(this.isEdit ? 'Patient Updated!' : 'Patient Registered!');
      this.router.navigate(['/dashboard/reception/patients/list']);
    });
  }
}

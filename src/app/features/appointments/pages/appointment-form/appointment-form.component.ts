// appointment-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AppointmentService } from '../../appointment.service';
import { DoctorService } from '../../../doctors/doctor.service';
import { PatientService } from '../../../patients/patient.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Appointment } from '../../../../shared/models/appointment.model';

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
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss']
})
export class AppointmentFormComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;
  appointmentId = '';
  doctors: any[] = [];
  patients: any[] = [];
  statuses: string[] = ['Booked', 'Completed', 'Cancelled'];

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
      status: ['', Validators.required],
      notes: ['', Validators.required]
    });

    this.loadDoctors();
    this.loadPatients();

    this.appointmentId = this.route.snapshot.params['id'];

    if (this.appointmentId) {
      this.isEdit = true;
      this.service.getById(this.appointmentId).subscribe({
        next: (res) => {
          this.form.patchValue({
            appointmentId: res._id ?? '',
            patientId: res.patientId || '',
            doctorId: res.doctorId || '',
            date: res.date ? res.date.split('T')[0] : '',
            status: res.status ?? '',
            notes: res.notes ?? ''
          });
        },
        // error: (err) => {
        //   console.error('Failed to fetch appointment:', err);
        // }
      });
    }
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

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: Appointment = this.form.value;
    const request$ = this.isEdit
      ? this.service.update(this.appointmentId, payload)
      : this.service.create(payload);
      console.log(this.appointmentId)
    request$.subscribe({
      next: () => {
        alert(`Appointment ${this.isEdit ? 'updated' : 'booked'} successfully`);
        const role = localStorage.getItem('role');
        const path = role === 'reception' ? 'reception' : 'admin';

        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([`/dashboard/${path}/appointments`]);
        }),
      
      Error; (err: any) => {
        console.error('Error saving appointment:', err);
        alert('An error occurred while saving the appointment. Please try again.');
      }
    },
  });
  }}


import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { AppointmentService } from '../../../appointments/appointment.service';
import { PatientService } from '../../../patients/patient.service';
import { DoctorService } from '../../../doctors/doctor.service';

@Component({
  selector: 'app-receptionist-appointment-form',
  imports: [ReactiveFormsModule, CommonModule,  MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    RouterModule,
  RouterOutlet],
  templateUrl: './receptionist-appointment-form.component.html',
  styleUrls: ['./receptionist-appointment-form.component.scss']
})
export class ReceptionistAppointmentFormComponent implements OnInit{
  form!: FormGroup;
  isEdit = false;
  appointmentId = '';
  patients: any[] = [];
  doctors: any[] = [];
  statuses: string[] = ['Booked', 'Completed', 'Cancelled'];

  constructor(private fb: FormBuilder,  private service: AppointmentService,
    private patientService: PatientService,
    private doctorService: DoctorService,
    private route: ActivatedRoute,
    private router: Router) {}

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

  onSubmit() {
    if (this.form.invalid) return;

    const request$ = this.isEdit
      ? this.service.update(this.appointmentId!, this.form.value)
      : this.service.create(this.form.value);

    request$.subscribe(() => {
      alert(this.isEdit ? 'Appointment Updated!' : 'Appointment Booked!');
      this.router.navigate(['/dashboard/reception/appointments/list']);
    });
  }
}

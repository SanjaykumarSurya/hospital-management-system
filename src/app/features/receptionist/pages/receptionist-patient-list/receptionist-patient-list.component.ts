import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { NavigationEnd, Router, RouterLink, RouterModule } from '@angular/router';
import { Patient } from '../../../../shared/models/patient.model';
import { PatientService } from '../../../patients/patient.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-receptionist-patient-list',
  imports: [CommonModule,
    MatTableModule,
    MatButtonModule,
    RouterLink,
    RouterModule,
    MatFormFieldModule,
    MatInputModule],
  templateUrl: './receptionist-patient-list.component.html',
  styleUrl: './receptionist-patient-list.component.scss'
})
export class ReceptionistPatientListComponent implements OnInit {
  Patients: Patient[] = [];
  displayedColumns: string[] = ['no', 'name', 'age', 'gender', 'contact', 'address', 'medicalHistory', 'actions'];

  constructor(private patientService: PatientService, private router: Router) {}

  ngOnInit(): void {
  this.router.events
    .pipe(filter((event: any) => event instanceof NavigationEnd))
    .subscribe(() => this.fetchPatients());

  this.fetchPatients();
}

  fetchPatients(): void {
    this.patientService.getAll().subscribe({
      next: (response: any) => {
        console.log('Fetched response:', response);
        // response must be in the form: { Patients: [...], totalCount: number }
        // this.Patients = Array.isArray(response.Patients) ? response.Patients : [];
        this.Patients = response.Patients || [];
      },
      error: (err) => {
        console.error('Failed to load patients:', err);
        alert('Error loading patient list. Please check the server.');
      }
    });
  }

  deletePatient(id: string): void {
    if (confirm('Are you sure you want to delete this patient?')) {
      this.patientService.delete(id).subscribe({
        next: () => {
          alert('Patient deleted successfully');
          this.fetchPatients(); // reload list after delete
        },
        error: (err) => {
          console.error('Failed to delete patient:', err);
          alert('Error deleting patient.');
        }
      });
    }
  }
}


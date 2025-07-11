import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientService } from '../../patient.service';
import { NavigationEnd, Router, RouterLink, RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Patient } from '../../../../shared/models/patient.model';
import { filter } from 'rxjs';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-patient-list',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    RouterLink,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    FormsModule
  ],
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss'],
  //  encapsulation: ViewEncapsulation.None,
})
export class PatientListComponent implements OnInit {
  Patients: Patient[] = [];
  displayedColumns: string[] = ['no','name', 'age', 'gender', 'contact', 'address', 'medicalHistory', 'actions'];

  page = 0;
  limit = 5;
  totalCount = 0;
  service: any;
  items: any;

  constructor(private patientService: PatientService, private router: Router) {}

  ngOnInit(): void {
  this.router.events
    .pipe(filter((event: any) => event instanceof NavigationEnd))
    .subscribe(() => this.fetchPatients());

  this.fetchPatients();
}

  fetchPatients() {
    this.patientService.getAll({ skip: this.page * this.limit, limit: this.limit }).subscribe({
      next: (response: any) => {
        console.log('Fetched response:', response);
        // response must be in the form: { Patients: [...], totalCount: number }
        // this.Patients = Array.isArray(response.Patients) ? response.Patients : [];
        this.Patients = response.Patients || [];
        this.totalCount = response.totalCount;
      },
      error: (err) => {
        console.error('Failed to load patients:', err);
        alert('Error loading patient list. Please check the server.');
      }
    });
  }

  onPageChange(event: PageEvent) {
  this.page = event.pageIndex ;
  this.limit = event.pageSize;
  this.fetchPatients(); // call your API
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

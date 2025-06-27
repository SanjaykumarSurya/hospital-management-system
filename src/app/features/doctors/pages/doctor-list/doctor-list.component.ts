import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorService } from '../../doctor.service';
import { Doctor } from '../../../../shared/models/doctor.model';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-doctor-list',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './doctor-list.component.html'
})
export class DoctorListComponent implements OnInit {
  doctors: Doctor[] = [];
  filteredDoctors: Doctor[] = [];
  filter: string = '';
  displayedColumns: string[] = ['name', 'specialization', 'phone', 'email', 'availabledays', 'timeslot', 'actions'];

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.fetchDoctors();
  }

  fetchDoctors() {
    this.doctorService.getAll().subscribe({
      next: (response: any) => {
        this.doctors = response.doctors ?? response; // for both wrapped and raw API response
        this.filteredDoctors = [...this.doctors];
      },
      error: (err) => {
        console.error('Failed to load doctors:', err);
      }
    });
  }

  applyFilter() {
    const search = this.filter.toLowerCase();
    this.filteredDoctors = this.doctors.filter(d =>
      d.specialization.toLowerCase().includes(search)
    );
  }

  deleteDoctor(id: string) {
    if (!confirm('Are you sure you want to delete this doctor?')) return;

    this.doctorService.delete(id).subscribe({
      next: () => {
        this.doctors = this.doctors.filter(d => d._id !== id);
        this.applyFilter();
        alert('Doctor deleted successfully');
      },
      error: (err) => {
        console.error('Failed to delete doctor:', err);
        alert('Error deleting doctor.');
      }
    });
  }
}

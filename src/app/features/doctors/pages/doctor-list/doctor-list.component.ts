import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorService } from '../../doctor.service';
import { Doctor } from '../../../../shared/models/doctor.model';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterLink, RouterModule } from '@angular/router';
import { filter } from 'rxjs';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

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
    RouterLink,
    MatPaginatorModule
    
  ],
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class DoctorListComponent implements OnInit {
  doctors: Doctor[] = [];
  filteredDoctors: Doctor[] = [];
  filter: string = '';
  displayedColumns: string[] = ['no','name', 'specialization', 'phone', 'email', 'availabledays', 'timeslot', 'actions'];

  page = 0;
  limit = 5;
  totalCount = 0;
  service: any;
  items: any;

  


  constructor(private doctorService: DoctorService, private router: Router) {}

  ngOnInit(): void {
    this.router.events
    .pipe(filter((event: any) => event instanceof NavigationEnd))
    .subscribe(() => this.fetchDoctors());
    this.fetchDoctors();
  }

  fetchDoctors() {
    this.doctorService.getAll({ skip: this.page * this.limit, limit: this.limit }).subscribe({
      next: (response: any) => {
        console.log('Fetched response:', response);
        this.doctors = response.doctors;
        this.totalCount = response.totalCount;; // for both wrapped and raw API response
        this.filteredDoctors = [...this.doctors];
        // this.doctors = response.doctors || [];
      },
      error: (err) => {
        console.error('Failed to load doctors:', err);
        alert('Error loading doctor list. Please check the server.');
      }
    });
  }

  onPageChange(event: PageEvent) {
  this.page = event.pageIndex ;
  this.limit = event.pageSize;
  this.fetchDoctors(); // call your API
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

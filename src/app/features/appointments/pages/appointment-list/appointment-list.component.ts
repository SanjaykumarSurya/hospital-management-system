import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../appointment.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { NavigationEnd, Router, RouterLink, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Appointment } from '../../../../shared/models/appointment.model';
import { filter } from 'rxjs';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    RouterLink,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './appointment-list.component.html',
  styleUrls:['./appointment-list.component.scss']
})
export class AppointmentListComponent implements OnInit {
  appointments: Appointment[] = [];
  displayedColumns: string[] = ['no', 'doctorName', 'patientName', 'date', 'status', 'notes', 'actions'];

  constructor(private service: AppointmentService, private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe(() => this.fetchAppointments());

    this.fetchAppointments();
  }

  fetchAppointments(): void {
    this.service.getAll().subscribe({
      next: (res: any) => {
        console.log('Fetched appointments:', res);
        this.appointments = Array.isArray(res.getAppointment) ? res.getAppointment : [];
      },
      error: (err) => {
        console.error('Failed to load appointments:', err);
        alert('Error loading Appointment list. Please check the server.');
        this.appointments = []; // prevent crash
      },
    });
  }

  deleteAppointment(id: string): void {
    if (confirm('Are you sure you want to delete this appointment?')) {
      this.service.delete(id).subscribe({
        next: () => {
          alert('Appointment deleted successfully');
          this.fetchAppointments();
        },
        error: (err) => {
          console.error('Failed to delete appointment:', err);
          alert('Error deleting appointment.');
        },
      });
    }
  }
}

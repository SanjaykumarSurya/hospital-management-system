import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../appointment.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, RouterLink],
  templateUrl: './appointment-list.component.html',
})
export class AppointmentListComponent implements OnInit {
  appointments = [];
  displayedColumns = ['date', 'doctor', 'patient', 'reason', 'actions'];

  constructor(private service: AppointmentService, private router: Router) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.service.getAll().subscribe((res: any) => {
      this.appointments = res;
    });
  }

  delete(id: string) {
    if (confirm('Cancel this appointment?')) {
      this.service.delete(id).subscribe(() => this.load());
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../report.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Report } from '../../../../shared/models/report.model';

@Component({
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, RouterLink],
  templateUrl: './report-list.component.html',
})
export class ReportListComponent implements OnInit {
  reports: Report[] = []; 
  displayedColumns = ['date', 'description', 'file', 'actions'];

  constructor(private service: ReportService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.service.getAll().subscribe((res: Report[]) => {
      this.reports = res;
    });
  }

  download(fileUrl: string) {
    window.open(fileUrl, '_blank');
  }

  delete(id: string) {
    if (confirm('Delete this report?')) {
      this.service.delete(id).subscribe(() => this.load());
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../report.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { NavigationEnd, Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { Report } from '../../../../shared/models/report.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { filter } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: [ './report-list.component.scss'],
  imports: [CommonModule, MatTableModule, MatButtonModule, RouterLink, RouterOutlet, RouterModule, MatFormFieldModule, MatInputModule]
})
export class ReportListComponent implements OnInit {
  reports: Report[] = [];
  displayedColumns: string[] = ['no', 'date', 'patientName', 'doctorName','description', 'file', 'actions'];
  ReportService: any;

  constructor(private service: ReportService, private router: Router) {}

  ngOnInit(): void {
   this.router.events
    .pipe(filter((event: any) => event instanceof NavigationEnd))
    .subscribe(() => this.load())
    this.load();
  }

  load(): void {
    this.service.getAll().subscribe({
     next: (response: any) => {
        console.log('Fetched response:', response);
       
        this.reports = response.reports?.[0]?.data ?? [];
      },
      error: (err: any) => {
        console.error('Failed to load report:', err);
        alert('Error loading report list. Please check the server.');
      }
    });
  }

  // download(fileUrl: string) {
  //   const fullUrl = `http://localhost:3000/${fileUrl.replace(/\\/g, '/')}`; 
  //   window.open(fullUrl, '_blank');
  // }
  download(fileUrl: string) {
      const filename = fileUrl.split('\\').pop();
      const url = `http://localhost:3000/api/download/${filename}`;
      
      const a = document.createElement('a');
      a.href = url;
      a.setAttribute('download', filename!);
      a.click();
  }

  view(fileUrl: string) {
  const url = `http://localhost:3000/${fileUrl.replace('\\', '/')}`;
  window.open(url, '_blank');
}

  delete(id: string) {
    if (confirm('Delete this report?')) {
      this.service.delete(id).subscribe(() => this.load());
    }
  }
}

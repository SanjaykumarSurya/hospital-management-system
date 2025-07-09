import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-receptionist',
  imports:[ RouterLink, RouterOutlet, RouterModule],
  templateUrl: './dashboard-receptionist.component.html',
  styleUrls: ['./dashboard-receptionist.component.scss']
})
export class DashboardReceptionistComponent {}

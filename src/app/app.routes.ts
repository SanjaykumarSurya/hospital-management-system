import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/pages/login/login.component';
import { AuthGuard } from './core/auth/auth.guard';
import { Role } from './core/enums/role.enum';

// Admin Dashboard (Standalone Component)
import { DashboardAdminComponent } from './features/dashboard/admin/dashboard-admin/dashboard-admin.component';

// Receptionist Dashboard
import { DashboardReceptionistComponent } from './features/dashboard/receptionist/dashboard-receptionist/dashboard-receptionist.component';

// Admin Pages
import { DoctorListComponent } from './features/doctors/pages/doctor-list/doctor-list.component';
import { DoctorFormComponent } from './features/doctors/pages/doctor-form/doctor-form.component';
import { PatientListComponent } from './features/patients/pages/patient-list/patient-list.component';
import { PatientFormComponent } from './features/patients/pages/patient-form/patient-form.component';
import { AppointmentListComponent } from './features/appointments/pages/appointment-list/appointment-list.component';
import { AppointmentFormComponent } from './features/appointments/pages/appointment-form/appointment-form.component';
import { ReportListComponent } from './features/reports/pages/report-list/report-list.component';
import { ReportFormComponent } from './features/reports/pages/report-form/report-form.component';

// Receptionist Pages
import { ReceptionistPatientFormComponent } from './features/receptionist/pages/receptionist-patient-form/receptionist-patient-form.component';
import { ReceptionistAppointmentFormComponent } from './features/receptionist/pages/receptionist-appointment-form/receptionist-appointment-form.component';

// Fallback / Shared
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },

  // ✅ Admin Dashboard (with Role Protection)
  {
    path: 'dashboard/admin',
    component: DashboardAdminComponent,
    canActivate: [AuthGuard],
    data: { role: Role.Admin },
    children: [
      { path: '', redirectTo: 'doctors', pathMatch: 'full' },
      { path: 'doctors', component: DoctorListComponent },
      { path: 'doctors/add', component: DoctorFormComponent },
      { path: 'doctors/edit/:id', component: DoctorFormComponent },

      { path: 'patients', component: PatientListComponent },
      { path: 'patients/add', component: PatientFormComponent },
      { path: 'patients/edit/:id', component: PatientFormComponent },

      { path: 'appointments', component: AppointmentListComponent },
      { path: 'appointments/book', component: AppointmentFormComponent },

      { path: 'reports', component: ReportListComponent },
      { path: 'reports/upload', component: ReportFormComponent },
    ],
  },

  // ✅ Receptionist Dashboard (with Role Protection)
  {
    path: 'dashboard/reception',
    component: DashboardReceptionistComponent,
    canActivate: [AuthGuard],
    data: { role: Role.Receptionist },
    children: [
      { path: '', redirectTo: 'patients/register', pathMatch: 'full' },
      { path: 'patients/register', component: ReceptionistPatientFormComponent },
      { path: 'appointments/book', component: ReceptionistAppointmentFormComponent },
    ],
  },

  // ✅ Optional shortcut routes to dashboards
  {
    path: 'admin',
    loadComponent: () =>
      import('./features/dashboard/admin/dashboard-admin/dashboard-admin.component').then(m => m.DashboardAdminComponent),
  },
  {
    path: 'reception',
    loadComponent: () =>
      import('./features/dashboard/receptionist/dashboard-receptionist/dashboard-receptionist.component').then(m => m.DashboardReceptionistComponent),
  },

  // 404 Fallback Route
  {
    path: '**',
    component: NotFoundComponent,
  },
];

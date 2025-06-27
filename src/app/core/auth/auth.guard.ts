// import { inject } from '@angular/core';
// import { CanActivateFn, Router } from '@angular/router';
// import { AuthService } from './auth.service';

// export const AuthGuard: CanActivateFn = () => {
//   const auth = inject(AuthService);
//   const router = inject(Router);

//   if (!auth.isAuthenticated()) {
//     router.navigate(['/login']);
//     return false;
//   }

//   return true;
// };


import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Role } from '../enums/role.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
  const isLoggedIn = this.auth.isAuthenticated();
  const userRole = this.auth.getRole();
  const expectedRole = route.data['role'] as Role;

  if (!isLoggedIn) {
    this.router.navigate(['/login']);
    return false;
  }

  if (expectedRole && userRole !== expectedRole) {
    this.router.navigate(['/login']); // or use a 403 page
    return false;
  }

  return true;
}
}

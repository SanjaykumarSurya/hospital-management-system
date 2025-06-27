import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/auth/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  error = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

 submit() {
  if (this.loginForm.invalid) return;

  const email = this.loginForm.get('email')?.value ?? '';
  const password = this.loginForm.get('password')?.value ?? '';

  this.auth.login(this.loginForm.value).subscribe({
  next: (res: any) => {
    

    this.auth.setToken(res.token);
    const role = this.auth.getRole();

    console.log('Decoded role:', role);
    console.log('Received token:', res.token);
console.log('Decoded role:', this.auth.getRole());

    if (role === 'admin') {
      this.router.navigateByUrl('/dashboard/admin');
    } else if (role === 'receptionist') {
      this.router.navigateByUrl('/dashboard/reception');
    }
  },
  error: () => {
    this.error = 'Invalid email or password';
  }
});
}};

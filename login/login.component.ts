import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private router: Router) {}

  onLogin(): void {
    const users = JSON.parse(localStorage.getItem('registrationData') || '[]');

    const matchedUser = users.find(
      (user: any) =>
        user?.credentials?.username === this.username &&
        user?.credentials?.password === this.password
    );

    if (matchedUser) {
      alert('Login Successful!');
      this.router.navigate(['/dashboard']);
    } else {
      alert('Login failed!');
    }
  }
}

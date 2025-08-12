import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Auth } from '../auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
})
export class Login {
  form: FormGroup;
  message: string = '';

  constructor(private fb: FormBuilder, private auth: Auth, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  submit() {
    if (this.form.valid) {
      this.auth.login(this.form.value.email, this.form.value.password).subscribe({
        next: (res) => {
          if (res.access_token) {
            localStorage.setItem('token', res.access_token);
            this.router.navigate(['/']);
          } else {
            this.message = res.message || 'Login falhou!';
          }
        },
        error: (err) => {
          this.message = err.error?.message || 'Erro ao logar!';
        }
      });
    } else {
      this.message = 'Preencha todos os campos!';
    }
  }
}

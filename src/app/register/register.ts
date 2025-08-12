import { ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth } from '../auth';
import { Viacep } from '../viacep';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.html',
})
export class Register {
  form: FormGroup;
  message: string = '';
  
  constructor(private fb: FormBuilder, private auth: Auth, private viacep: Viacep) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', Validators.required],
      senha: ['', Validators.required],
      confirmarSenha: ['', Validators.required],
      cep: ['', Validators.required],
      estado: [''],
      cidade: [''],
      bairro: [''],
      rua: [''],
    });
  }

  buscarCep() {
    const cep = this.form.value.cep;
    if (cep && cep.length >= 8) {
      this.viacep.buscar(cep).subscribe((dados: any) => {
        this.form.patchValue({
          estado: dados.uf,
          cidade: dados.localidade,
          bairro: dados.bairro,
          rua: dados.logradouro,
        });
      });
    }
  }

  submit() {
    if (this.form.valid && this.form.value.senha === this.form.value.confirmarSenha) {
      this.auth.register(this.form.value).subscribe({
        next: (res) => {
          this.message = res.message || 'Registrado com sucesso!';
        },
        error: (err) => {
          this.message = err.error?.message || 'Erro ao registrar!';
        }
      });
    } else {
      this.message = 'Preencha todos os campos corretamente!';
    }
  }
}
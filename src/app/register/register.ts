

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth } from '../auth';
import { Viacep } from '../viacep';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
})
export class Register {
  form: FormGroup;
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
      this.auth.register(this.form.value);
    }
  }
}

import { ReactiveFormsModule } from '@angular/forms';

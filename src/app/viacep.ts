import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})  
export class Viacep {
  constructor(private http: HttpClient) {}

  buscar(cep: string): Observable<any> {
    cep = cep.replace(/\D/g, '');
    return this.http.get(`https://viacep.com.br/ws/${cep}/json/`);
  }
}

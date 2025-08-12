import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  login(email: string, password: string): Observable<boolean> {
    console.log('Login:', email, password);
    return of(true);
  }

  register(data: any): Observable<boolean> {
    console.log('Registro:', data);
    return of(true);
  }
}

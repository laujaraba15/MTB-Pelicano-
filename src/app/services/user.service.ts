import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form';
import { RegisterForm } from '../interfaces/register-form';

const url = environment.back_url;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private router: Router) {}

  signUp(formData: RegisterForm) {
    return this.http.post(`${url}/signup`, formData);
  }

  signIn(formData: LoginForm) {
    return this.http.post(`${url}/signin`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
        localStorage.setItem('role', resp.user.role);
        localStorage.setItem('user', JSON.stringify(resp.user));

        localStorage.setItem('id', resp.user.uid);
      })
    );
  }
  // verificación del token activo
  tokenValidation(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http
      .get(`${url}/checktoken`, {
        headers: {
          tokenx: token,
        },
      })
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
        }),
        //transformar la respuesta a booleando
        map((resp) => true),
        catchError((error) => of(false))
      );
  }

  logout() {
    this.router.navigateByUrl('/signin');
    localStorage.clear();
  }
}

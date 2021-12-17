import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { newPaymentForm } from '../interfaces/new-payments-form';

const url = environment.back_url;
let token: any;
@Injectable({
  providedIn: 'root',
})
export class PaymentsService {
  constructor(private http: HttpClient) {}

  tokenValidation(): Observable<boolean> {
    token = localStorage.getItem('token') || '';

    return this.http
      .get(`${url}/checktoken`, {
        headers: {
          tokenx: token,
        },
      })
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
          token = resp.token;
        }),
        //transformar la respuesta a booleando
        map((resp) => true),
        catchError((error) => of(false))
      );
  }

  get token(): any {
    return localStorage.getItem('token');
  }
  get headers() {
    return {
      headers: {
        tokenx: this.token,
      },
    };
  }

  getPaymentsAdmin() {
    return this.http.get(`${url}/payments`, this.headers);
  }

  getPaymentsUser() {
    const user = JSON.parse(localStorage['user']);
    return this.http.get(`${url}/payments/${user.idNumber}`, this.headers);
  }

  putPayments(formData: newPaymentForm) {
    return this.http
      .post(`${url}/payments`, formData, this.headers)
      .pipe(tap((resp: any) => {}));
  }

  delPayments(pid: string) {
    return this.http.delete(`${url}/payments/${pid}`, this.headers);
  }
}

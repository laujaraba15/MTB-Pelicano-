import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {
  public formSubmitted = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  public loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  fieldValidation(field: string): boolean {
    if (this.loginForm.get(field)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  signIn() {
    this.userService.signIn(this.loginForm.value).subscribe(
      (resp) => {
        Swal.fire({
          icon: 'success',
          title: 'Sesión Iniciada!',
        });
        resp.user.role == 'usuario'
          ? this.router.navigateByUrl('/payments')
          : this.router.navigateByUrl('/adminpage');
      },
      (err) =>
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El credenciales invalidas!',
        })
    );
  }
}

import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  public formSubmitted = false;

  public registerForm = this.fb.group({
    idNumber: ['', [Validators.required]],
    name: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    role: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  formRegister() {
    this.formSubmitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.userService.signUp(this.registerForm.value).subscribe(
      (resp) => {
        Swal.fire({
          icon: 'success',
          title: 'Usuario creado con exito!',
        });
        this.router.navigateByUrl('/signin');
      },
      (err) =>
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El usuario ya existe!',
        })
    );
  }

  fieldValidation(field: string): boolean {
    if (this.registerForm.get(field)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }
}

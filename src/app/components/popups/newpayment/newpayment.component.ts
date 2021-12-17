import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PaymentsService } from 'src/app/services/payments.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-newpayment',
  templateUrl: './newpayment.component.html',
  styleUrls: ['./newpayment.component.scss'],
})
export class NewpaymentComponent {
  public formSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentsService,
    private dialog: MatDialog
  ) {}

  public newPaymentForm = this.fb.group({
    paymentType: ['', [Validators.required]],
    date: ['', [Validators.required]],
    description: ['', [Validators.required]],
    idNumber: ['', [Validators.required]],
    paidBy: ['', [Validators.required]],
  });

  savePayment() {
    try {
      this.paymentService
        .putPayments(this.newPaymentForm.value)
        .subscribe((resp) => {});
      Swal.fire({
        title: 'Pago Guardado',
      });
    } catch (error) {
      Swal.fire({
        title: 'Error de guardado',
        text: 'Campos invalidos',
      });
    }
  }

  closeModal() {
    this.dialog.closeAll();
  }

  fieldValidation(field: string): boolean {
    if (this.newPaymentForm.get(field)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }
}

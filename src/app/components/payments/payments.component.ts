import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Payment } from 'src/app/models/payment.model';
import { PaymentsService } from 'src/app/services/payments.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { NewpaymentComponent } from '../popups/newpayment/newpayment.component';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
})
export class PaymentsComponent implements OnInit {
  public paymentsDB: Payment[] = [];
  constructor(
    private userService: UserService,
    private router: Router,
    private paymentService: PaymentsService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const role = localStorage.getItem('role');
    role == 'administrador'
      ? this.router.navigateByUrl('/adminpage')
      : this.router.navigateByUrl('/payments');

    this.paymentService.getPaymentsUser().subscribe((resp: any) => {
      this.paymentsDB = resp.paymentsDB;
    });
  }

  openModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    this.dialog.open(NewpaymentComponent, dialogConfig);
  }

  logout() {
    Swal.fire({
      title: 'Deseas cerrar sesión?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, cerrar',
    }).then((result) => {
      if (result.value) {
        this.userService.logout();
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentsService } from 'src/app/services/payments.service';
import { UserService } from 'src/app/services/user.service';
import { Payment } from '../../models/payment.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NewpaymentComponent } from '../popups/newpayment/newpayment.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.scss'],
})
export class AdminpageComponent implements OnInit {
  public paymentsDB: Payment[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private paymentService: PaymentsService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const role = localStorage.getItem('role');
    role == 'usuario'
      ? this.router.navigateByUrl('/payments')
      : this.router.navigateByUrl('/adminpage');
    this.getAllPayments();
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

  openModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    this.dialog.open(NewpaymentComponent, dialogConfig);
  }

  getAllPayments() {
    this.paymentService.getPaymentsAdmin().subscribe((resp: any) => {
      this.paymentsDB = resp.paymentsDB;
    });
  }

  delPayments(pid: string) {
    Swal.fire({
      title: 'Deseas borrar el pago?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, Borrar',
    }).then((result) => {
      if (result.value) {
        this.paymentService.delPayments(pid).subscribe((resp) => {
          this.getAllPayments();
          Swal.fire('Pago Borrado', 'Exitosamente!');
        });
      }
    });
  }
}

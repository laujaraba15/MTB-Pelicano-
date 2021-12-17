import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { NoPageFoundComponent } from './components/no-page-found/no-page-found.component';
import { AdminpageComponent } from './components/adminpage/adminpage.component';
import { GuardsGuard } from './guards.guard';
const routes: Routes = [
  {
    path: 'payments',
    component: PaymentsComponent,
    canActivate: [GuardsGuard],
  },
  {
    path: 'adminpage',
    component: AdminpageComponent,
    canActivate: [GuardsGuard],
  },

  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },

  { path: '**', component: NoPageFoundComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

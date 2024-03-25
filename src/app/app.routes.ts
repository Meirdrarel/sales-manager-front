import { Routes } from '@angular/router';
import { LoginComponent } from "./_pages/login/login.component";
import { BasePageComponent } from "./_pages/base-page/base-page.component";
import { authGuard, loggedGuard } from "./auth/auth.guard";
import { ClientsPageComponent } from "./clients/client-page/clients-page.component";
import { OrdersPageComponent } from "./orders/orders-page/orders-page.component";
import { InvoicesPageComponent } from "./invoices/invoices-page/invoices-page.component";

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [loggedGuard]
  },
  {
    path: 'app',
    component: BasePageComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'clients',
        component: ClientsPageComponent
      },
      {
        path: 'orders',
        component: OrdersPageComponent
      },
      {
        path: 'invoices',
        component: InvoicesPageComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];

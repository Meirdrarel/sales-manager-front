import { Routes } from '@angular/router';
import { LoginComponent } from "./_pages/login/login.component";
import { BasePageComponent } from "./_pages/base-page/base-page.component";
import { authGuard, loggedGuard } from "./auth/auth.guard";

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [loggedGuard]
  },
  {
    path: 'app',
    component: BasePageComponent,
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];

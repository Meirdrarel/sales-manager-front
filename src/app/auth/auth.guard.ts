import { AuthService } from "./auth.service";
import { inject } from "@angular/core";
import { Router } from "@angular/router";

export const authGuard = () => {
  const authServices = inject(AuthService);
  const router = inject(Router);

  if (authServices.isLogged()) {
    return true;
  }

  return router.parseUrl('/login');
}

export const loggedGuard = () => {
  const authServices = inject(AuthService);
  const router = inject(Router);

  if (!authServices.isLogged()) {
    return true;
  }

  return router.parseUrl('/app');
}

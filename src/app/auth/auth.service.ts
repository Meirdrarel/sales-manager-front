import { Injectable } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { LocalStorageService } from "../services/local-storage.service";
import { ApiEndpointService } from "../network/endpoints/api-endpoint.service";
import { map, switchMap, tap } from "rxjs";
import { Router } from "@angular/router";

export const refreshTokenKey = 'refresh_token';

@Injectable({
  providedIn: 'root',
  deps: [HttpClientModule]
})
export class AuthService {

  protected accessToken: string = '';

  constructor(protected localStorage: LocalStorageService,
              protected apiEndpoint: ApiEndpointService,
              protected router:Router
  ) {
  }

  getAccessToken() {
    return this.accessToken;
  }

  signUp(email: string, password: string) {
    return this.apiEndpoint.signup({
      email: email,
      password: password
    })
  }

  login(email: string, password: string) {
    return this.apiEndpoint.login({
      email: email,
      password: password
    }).pipe(
      tap((response) => {
        this.accessToken = response.access_token;
        this.localStorage.setItem(refreshTokenKey, response.refresh_token)
      })
    );
  }

  logout() {
    this.apiEndpoint.logout(this.accessToken).subscribe(() => {
      this.accessToken = '';
      this.localStorage.removeItem(refreshTokenKey);
      this.router.navigate(['/login'], {}).catch((error) => console.error(error));
    });
  }

  isLogged() {
    return this.accessToken !== '' || !!this.localStorage.getItem(refreshTokenKey);
  }

  refreshToken() {
    const refreshToken = this.localStorage.getItem(refreshTokenKey)
    if (refreshToken) return this.apiEndpoint.refreshToken(refreshToken)
      .pipe(map((response) => {
        this.accessToken = response.access_token;
        this.localStorage.setItem(refreshTokenKey, response.refresh_token);
        return this.accessToken;
      }));
    else throw Error('No refresh token found');
  }

}

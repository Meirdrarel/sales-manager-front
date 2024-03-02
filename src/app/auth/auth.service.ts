import { Injectable } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { LocalStorageService } from "../services/local-storage.service";
import { ApiEndpointService } from "../network/endpoints/api-endpoint.service";
import { map, tap } from "rxjs";

export const refreshTokenKey = 'refresh_token';

@Injectable({
  providedIn: 'root',
  deps: [HttpClientModule]
})
export class AuthService {

  protected accessToken: string = '';

  constructor(protected localStorage: LocalStorageService,
              protected apiEndpoint: ApiEndpointService) {
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
        this.localStorage.setData(refreshTokenKey, response.refresh_token)
      })
    );
  }

  logout() {
    return this.apiEndpoint.logout(this.accessToken);
  }

  isLogged() {
    return this.accessToken !== '' || !this.localStorage.getData(refreshTokenKey);
  }

  refreshToken() {
    const refreshToken = this.localStorage.getData(refreshTokenKey)
    if (refreshToken) return this.apiEndpoint.refreshToken(refreshToken)
      .pipe(map((response) => {
        this.accessToken = response.access_token;
        this.localStorage.setData(refreshTokenKey, response.refresh_token);
        return this.accessToken;
      }));
    else throw Error('No refresh token found');
  }

}
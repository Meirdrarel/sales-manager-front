import { Injectable } from "@angular/core";
import { LoginPayload, LoginResponse, SignUpPayload } from "../interfaces/api-interfaces";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { RefreshTokenResponse } from "../../auth/interfaces";

@Injectable({
  providedIn: 'root'
})
export class ApiEndpointService {

  constructor(protected httpClient: HttpClient) {
  }

  getEndpoint() {
    return 'http://localhost:3000';
  }

  signup(payload: SignUpPayload) {
    const url = this.getEndpoint() + '/auth/login';
    const headers = {
      'Content-Type': 'application/json'
    };
    return this.httpClient.post(url, payload, {headers: headers})
  }

  login(payload: LoginPayload) {
    const url = this.getEndpoint() + '/auth/login';
    const headers = {
      'Content-Type': 'application/json'
    };
    return this.httpClient.post<LoginResponse>(url, payload, {headers: headers});
  }

  logout(accessToken: string) {
    const url = this.getEndpoint() + '/auth/logout';
    return this.httpClient.post(url, null, {headers: {'Authorization': `Bearer ${ accessToken }`}});
  }

  refreshToken(refreshToken: string): Observable<RefreshTokenResponse> {
    const url = this.getEndpoint() + '/auth/refresh';
    return this.httpClient.post<RefreshTokenResponse>(url, null, {
      headers: {
        'Authorization': `Bearer ${ refreshToken }`
      }
    })
  }

  get(endpoint: string, params: Record<string, string> = {}) {
    const url = this.getEndpoint() + endpoint;
    return this.httpClient.get(url, {params: params});
  }

  post(endpoint: string, payload: any) {
    const url = this.getEndpoint() + endpoint;
    return this.httpClient.post(url, payload);
  }
}

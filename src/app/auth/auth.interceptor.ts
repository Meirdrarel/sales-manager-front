import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpStatusCode
} from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Injectable, Provider } from "@angular/core";
import { ApiEndpointService } from "../network/endpoints/api-endpoint.service";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(protected apiEndpoint: ApiEndpointService, protected authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isGraphqlEndpoint = req.url === `${ this.apiEndpoint.getEndpoint() }/graphql`;

    if (!isGraphqlEndpoint) {
      return next.handle(req);
    }

    const accessToken = this.authService.getAccessToken();
    if (accessToken) {
      return this.handleRequestWithToken(req, next, accessToken);
    } else {
      return this.refreshTokenAndHandle(req, next);
    }
  }

  private handleRequestWithToken(req: HttpRequest<any>, next: HttpHandler, token: string): Observable<HttpEvent<any>> {
    const authReq = this.setAuthHeader(req, token);

    return next.handle(authReq).pipe(
      map(response => this.checkForGraphqlErrors(response)),
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Unauthorized) {
          return this.refreshTokenAndHandle(req, next);
        }
        return throwError(() => error);
      })
    );
  }

  private refreshTokenAndHandle(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.authService.refreshToken()).pipe(
      switchMap(accessToken => this.handleRequestWithToken(req, next, accessToken))
    );
  }

  private setAuthHeader(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({
      setHeaders: {Authorization: `Bearer ${ token }`}
    });
  }

  private checkForGraphqlErrors(response: HttpEvent<any>): HttpEvent<any> {
    if (response instanceof HttpResponse && response.body.errors) {
      const unauthorizedError = response.body.errors.find((error: any) => error.message === 'Unauthorized');
      if (unauthorizedError) {
        throw new HttpErrorResponse({status: HttpStatusCode.Unauthorized});
      }
    }
    return response;
  }
}


export const AuthInterceptorProvider: Provider =
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true};


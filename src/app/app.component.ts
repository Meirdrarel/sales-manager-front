import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from "./auth/auth.service";
import { MatButtonModule } from "@angular/material/button";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ApiEndpointService } from "./network/endpoints/api-endpoint.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'sales-manager-front';


  loginForm = this.formBuilder.group({
    email: ['email@test.com', [Validators.email, Validators.required]],
    password: ['toto123!', Validators.required]
  });

  constructor(
    protected authService: AuthService,
    protected formBuilder: FormBuilder,
    protected apiEndpoint: ApiEndpointService
  ) {
  }

  public login() {
    const {email, password} = this.loginForm.value;
    this.authService.login(email!, password!).subscribe((resp) => console.log(resp));
  }

  public refresh() {
    this.authService.refreshToken().subscribe((resp) => console.log(resp));
  }

  testApi() {
    this.apiEndpoint.testGraphQl().subscribe((resp) => console.log(resp));
  }
}

import { Component } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from "../../auth/auth.service";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: 'login.component.html',
  styleUrl: 'login.component.scss'
})
export class LoginComponent {

  loginForm = this.formBuilder.group({
    email: ['email@test.com', [Validators.email, Validators.required]],
    password: ['toto123!', Validators.required]
  });

  constructor(
    protected authService: AuthService,
    protected formBuilder: FormBuilder,
    protected router: Router
  ) {
  }

  public login() {
    const {email, password} = this.loginForm.value;
    this.authService.login(email!, password!).subscribe((resp) =>
      this.router.navigate(['app'])
    );
  }
}

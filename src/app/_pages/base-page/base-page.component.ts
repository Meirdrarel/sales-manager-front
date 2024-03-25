import { Component, ViewEncapsulation } from "@angular/core";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatButton } from "@angular/material/button";
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { MatList, MatListItem, MatNavList } from "@angular/material/list";
import { AsyncPipe, NgClass } from "@angular/common";
import { MatToolbar } from "@angular/material/toolbar";
import { MatMenu, MatMenuItem, MatMenuTrigger } from "@angular/material/menu";
import { AuthService } from "../../auth/auth.service";

@Component({
  selector: 'app-base-page',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatButton,
    RouterOutlet,
    MatList,
    MatListItem,
    MatNavList,
    RouterLink,
    RouterLinkActive,
    AsyncPipe,
    NgClass,
    MatToolbar,
    MatMenu,
    MatMenuTrigger,
    MatMenuItem
  ],
  templateUrl: 'base-page.component.html',
  styleUrl: 'base-page.component.scss',
  encapsulation: ViewEncapsulation.Emulated
})
export class BasePageComponent {

  constructor(protected router: Router, protected authService: AuthService) {
  }

  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }

  logout() {
    return this.authService.logout()
  }
}

import { Component, ViewEncapsulation } from "@angular/core";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatButton } from "@angular/material/button";
import { RouterOutlet } from "@angular/router";
import { MatList, MatListItem } from "@angular/material/list";

@Component({
  selector: 'app-base-page',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatButton,
    RouterOutlet,
    MatList,
    MatListItem
  ],
  templateUrl: 'base-page.component.html',
  styleUrl: 'base-page.component.scss',
  encapsulation: ViewEncapsulation.ShadowDom
})
export class BasePageComponent {
  constructor() {
  }
}

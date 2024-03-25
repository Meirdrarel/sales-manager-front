import { Component, ViewEncapsulation } from "@angular/core";
import { ClientListComponent } from "../client-list/client-list.component";

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    ClientListComponent
  ],
  templateUrl: './clients-page.component.html',
  styleUrls: ['./clients-page.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ClientsPageComponent {
  constructor() {
  }
}

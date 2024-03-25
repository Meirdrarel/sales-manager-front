import { Component, ViewEncapsulation } from "@angular/core";

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [],
  templateUrl: 'orders-page.component.html',
  styleUrl: 'orders-page.component.scss',
  encapsulation: ViewEncapsulation.Emulated
})
export class OrdersPageComponent {
  constructor() {
  }
}

import { Component, inject, OnInit } from "@angular/core";
import { ClientStore } from "../store/client.store";
import { JsonPipe } from "@angular/common";

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [
    JsonPipe
  ],
  templateUrl: 'client-list.component.html',
  styleUrl: 'client-list.component.scss'
})
export class ClientListComponent implements OnInit{

  readonly clientStore = inject(ClientStore);

  constructor() {
  }

  ngOnInit() {
    this.clientStore.loadAllClients();
  }
}

import { Component, OnInit } from '@angular/core';
import {WebsocketService} from '../../services/websocket.service';

@Component({
  selector: 'app-dashboard',
  template: `
  Hello ChatApp!
  `
})
export class DashboardComponent implements OnInit {

  input: string;

  constructor(
    private websocketService: WebsocketService,

  ) {
    websocketService.connection();
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.websocketService.setValue(this.input);
  }
}

import {Component, OnInit} from '@angular/core';
import {WebsocketService} from '../../services/websocket.service';
import {MessageDto} from '../../models/message-dto';

@Component({
  selector: 'app-dashboard',
  template: `
    <p-toast></p-toast>
    <h1>Hello ChatApp!</h1>
    <div style="padding: 1em">
      <div class="grid">
        <input [disabled]="websocketService.isConnected()" type="text" pInputText class="m-1" [(ngModel)]="username"/>
        <p-button icon="pi pi-sign-in" class="m-1"
                  [disabled]="websocketService.isConnected() || !this.username"
                  (onClick)="connect()"
        ></p-button>
        <p-button icon="pi pi-sign-out" class="m-1"
                  [disabled]="!websocketService.isConnected()"
                  (onClick)="disconnect()"
        ></p-button>
      </div>
      <div style="padding-top: 1em" *ngIf="websocketService.connected">
        <div class="grid">
          <input type="text" pInputText class="m-1" [(ngModel)]="text"/>
          <p-button icon="pi pi-send" class="m-1"
                    (onClick)="sendMessage()"
          ></p-button>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {

  username: string;
  text: string;
  message: MessageDto;

  constructor(
    public websocketService: WebsocketService,
  ) {
  }

  ngOnInit(): void {
  }

  sendMessage() {
    this.message = {
      name: this.username,
      text: this.text
    };
    this.websocketService.publishMessage(this.message);
  }

  connect() {
    this.websocketService.setUsername(this.username);
    this.websocketService.connection();
  }

  disconnect() {
    this.websocketService.disconnect();
  }

}

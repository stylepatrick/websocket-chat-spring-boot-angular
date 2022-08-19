import {Component, OnInit} from '@angular/core';
import {WebsocketService} from '../../services/websocket.service';
import {MessageDto} from '../../models/message-dto';
import * as Stomp from 'stompjs';
import SockJS from 'sockjs-client/dist/sockjs';

@Component({
  selector: 'app-dashboard',
  template: `
    <p-toast></p-toast>
    <h1>Hello ChatApp!</h1>
    <div style="padding: 1em">
      <div class="grid">
        <span class="p-float-label">
            <input type="text" id="username" pInputText [(ngModel)]="username"/>
            <label for="username">Username</label>
        </span>
        <p-button icon="pi pi-sign-in" class="m-1"
                  [disabled]="connected || !this.username"
                  (onClick)="connect()"
        ></p-button>
        <p-button icon="pi pi-sign-out" class="m-1"
                  [disabled]="!connected"
                  (onClick)="disconnect()"
        ></p-button>
      </div>
      <div style="padding-top: 1em" *ngIf="connected">
        <div class="grid">
          <span class="p-float-label">
            <input type="text" id="text" pInputText [(ngModel)]="text"/>
            <label for="text">Text</label>
        </span>
          <p-button icon="pi pi-send" class="m-1"
                    [disabled]="!text"
                    (onClick)="sendMessage()"
          ></p-button>
        </div>
      </div>
    </div>

    <div class="grid">
      <div class="col">
        <table class="table table-striped">
          <thead>
          <tr>
            <th><h3>Sent:</h3></th>
          </tr>
          </thead>
          <tbody *ngFor="let message of sent">
          <tr>
            <td>
              <b>
                {{message.time | date: 'dd.MM.yyyy hh:mm:ss'}}
              </b>
              <p>
                {{message.text}}</p>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="col">
        <table class="table table-striped">
          <thead>
          <tr>
            <th><h3>Received:</h3></th>
          </tr>
          </thead>
          <tbody *ngFor="let message of received">
          <tr>
            <td>
              <b>
                {{message.time | date: 'dd.MM.yyyy hh:mm:ss'}}
              </b>
              <p>
                {{message.name}}: {{message.text}}</p>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {

  username: string;
  text: string;

  received: MessageDto[] = [];
  sent: MessageDto[] = [];

  wsClient: any;
  connected: boolean;

  constructor(
    public websocketService: WebsocketService,
  ) {
  }

  ngOnInit(): void {
  }

  connect() {
    const ws = new SockJS(this.websocketService.url);
    this.wsClient = Stomp.over(ws);
    const that = this;
    this.received = [];

    this.wsClient.connect({}, function () {
      console.log('Connected!');
      that.connected = true;
      that.wsClient.subscribe(that.websocketService.topicMessage, (message: { body: any }) => {
        // tslint:disable-next-line:triple-equals
        if (that.username != JSON.parse(message.body).name) {
          that.received.push(JSON.parse(message.body));
        }
      });
    });
  }

  disconnect() {
    if (this.connected) {
      this.connected = false;
      this.sent = [];
      this.received = [];
      this.username = null;
      this.text = null;
      console.log('Disconnected!');
      this.wsClient.disconnect();
    }
  }

  sendMessage() {
    const message: MessageDto = {
      name: this.username,
      text: this.text,
      time: new Date()
    };
    this.sent.push(message);
    this.wsClient.send(this.websocketService.topicChat, {}, JSON.stringify(message));
    this.text = null;
  }

}

import {Component} from '@angular/core';
import {ChatService, Message} from "../../service/chat.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
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
export class AppComponent {

  username: string;
  text: string;
  connected: boolean;

  subscription: Subscription;

  received: Message[] = [];
  sent: Message[] = [];

  constructor(private chatService: ChatService) {
  }

  connect() {
    this.connected = true;
    this.chatService.connect();
    this.subscription = this.chatService.messages.subscribe((msg) => {
      this.received.push(msg);
    });
  }

  disconnect() {
    this.received = [];
    this.sent = [];
    this.text = '';
    this.chatService.disconnect();
    this.subscription.unsubscribe();
    this.connected = false;
  }

  sendMessage() {
    const message: Message = {
      name: this.username,
      text: this.text,
      time: new Date()
    };
    this.sent.push(message);
    this.text = '';
    this.chatService.messages.next(message);
  }
}

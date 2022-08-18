import {Injectable} from '@angular/core';

import * as Stomp from 'stompjs';
import SockJS from 'sockjs-client/dist/sockjs';
import {MessageDto} from '../models/message-dto';
import {MessageService} from 'primeng/api';

@Injectable()
export class WebsocketService {

  url = 'http://localhost:8080/chat';
  client: any;
  value: string;
  connected: boolean;
  username: string;

  constructor(
    private messageService: MessageService
  ) {
  }

  setValue(value: string) {
    this.value = value;
  }

  connection() {
    const ws = new SockJS(this.url);
    this.client = Stomp.over(ws);
    const that = this;

    this.client.connect({}, function () {
      that.connected = true;
      console.log('Connected!');
      that.client.subscribe('/topic/messages', (message: { body: any }) => {
        if (that.username != JSON.parse(message.body).name) {
          that.messageService.add({severity: 'info', summary: 'New message from ' + JSON.parse(message.body).name, detail: JSON.parse(message.body).text});
        }
      });
    });
  }

  disconnect() {
    if (this.connected) {
      this.connected = false;
      console.log('Disconnected!');
      this.client.disconnect();
    }
  }

  isConnected(): boolean {
    return this.connected;
  }

  publishMessage(message: MessageDto) {
    this.client.send('/app/chat', {}, JSON.stringify(message));
  }

  setUsername(username: string) {
    this.username = username;
  }

}

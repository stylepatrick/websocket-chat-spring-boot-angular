import {Injectable} from '@angular/core';
import {MessageService} from 'primeng/api';

import * as Stomp from 'stompjs';
import SockJS from 'sockjs-client/dist/sockjs';

@Injectable()
export class WebsocketService {

  url = 'http://localhost:8080/websocket';
  client: any;
  value: string;

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
      that.client.subscribe('/topic/greeting', (message: { body: any; }) => {
        console.log(message.body.toString());
        console.log(that.value)
        if (that.value == message.body) {
          console.log(123)
          that.messageService.add({severity: 'success', summary: 'ID in use!', detail: message.body});
        }
      });
    });
  }

}

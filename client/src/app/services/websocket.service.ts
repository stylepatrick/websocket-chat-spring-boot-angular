import {Injectable} from '@angular/core';

@Injectable()
export class WebsocketService {

  public readonly url = 'http://localhost:8080/chat';
  public readonly topicMessage = '/topic/messages';
  public readonly topicChat = '/app/chat';

}

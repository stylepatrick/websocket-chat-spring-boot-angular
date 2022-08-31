import {Injectable} from '@angular/core';

@Injectable()
export class WebsocketService {

  public readonly url = 'http://localhost:8080/chat';
  public readonly topicMessage = '/secured/topic/messages';
  public readonly topicChat = '/secured/app/chat';

}

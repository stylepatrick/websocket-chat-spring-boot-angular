import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './component/app.component';
import {ButtonModule} from "primeng/button";
import {WebsocketService} from "../service/websocket.service";
import {ChatService} from "../service/chat.service";
import {ToastModule} from "primeng/toast";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {MessageService} from "primeng/api";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    FormsModule
  ],
  providers: [
    WebsocketService,
    ChatService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

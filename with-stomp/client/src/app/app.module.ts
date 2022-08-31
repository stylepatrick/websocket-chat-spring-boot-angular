import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {AccordionModule} from 'primeng/accordion';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {WebsocketService} from './services/websocket.service';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {FormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccordionModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
  ],
  providers: [
    WebsocketService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

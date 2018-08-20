import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './components/root/app.component';
import { ChatComponent } from './components/chat/chat.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { OverviewComponent } from './components/overview/overview.component';
import { SettingsComponent } from './components/settings/settings.component';
import { HelpComponent } from './components/help/help.component';
import { AboutComponent } from './components/about/about.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { JSONReaderService } from './services/jsonreader.service';
import { ParsePlainChatService } from './services/parse-plain-chat.service';
import { TimeService } from './services/time.service';
import { HttpService } from './services/http.service';
import { ProccessingComponent } from './components/proccessing/proccessing.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    ContactsComponent,
    OverviewComponent,
    SettingsComponent,
    HelpComponent,
    AboutComponent,
    ProccessingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    JSONReaderService,
    ParsePlainChatService,
    TimeService,
    HttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

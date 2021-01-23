import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BanksListComponent } from './banks-list/banks-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BankDetailsComponent } from './bank-details/bank-details.component';
import { LobbyListComponent } from './lobby-list/lobby-list.component';
import { LobbyJoinComponent } from './lobby-join/lobby-join.component';
import { LotteryViewComponent } from './lottery-view/lottery-view.component';
import { LotteryListComponent } from './lottery-list/lottery-list.component';

@NgModule({
  declarations: [AppComponent, BanksListComponent, BankDetailsComponent, LobbyListComponent, LobbyJoinComponent, LotteryViewComponent, LotteryListComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

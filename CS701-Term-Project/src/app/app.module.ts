import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'
import { SharedModule } from './shared/shared.module';

import { TransactionsService } from './services/transactions.service';
import { StatsService } from './services/stats.service';
import { UniquesService } from './services/uniques.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, NgbModule, FormsModule, ReactiveFormsModule, SharedModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, TransactionsService, StatsService, UniquesService],
  bootstrap: [AppComponent],
})
export class AppModule {}

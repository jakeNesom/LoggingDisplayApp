import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';



import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppComponent }  from './app.component';
import { NavComponent }  from './nav.component';
import { SetChart } from "./setChart.component";
import { DisplayComponent } from "./display.component";
import { LoggerService } from "./loggerdata.service";

@NgModule({
  imports:      [ 
    BrowserModule,
    ChartsModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService)
    ],
  declarations: [ 
    AppComponent,
    NavComponent,
    SetChart,
    DisplayComponent
    ],
  providers: [LoggerService],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

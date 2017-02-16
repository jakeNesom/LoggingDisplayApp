import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChartsModule } from 'ng2-charts';


import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppComponent }  from './app.component';
import { NavComponent }  from './nav.component';
import { PieChart } from "./pieChart.component";
import { OptionsComponent } from "./options.component";


@NgModule({
  imports:      [ 
    BrowserModule,
    ChartsModule
    ],
  declarations: [ 
    AppComponent,
    NavComponent,
    PieChart,
    OptionsComponent
    ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

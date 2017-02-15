import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChartsModule } from 'ng2-charts';


import { AppComponent }  from './app.component';
import { NavComponent }  from './nav.component';
import { PieChart } from "./pieChart.component";


@NgModule({
  imports:      [ 
    BrowserModule,
    ChartsModule
    ],
  declarations: [ 
    AppComponent,
    NavComponent 
    ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

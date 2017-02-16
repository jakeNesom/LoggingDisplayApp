import { Component } from '@angular/core';
import { LoggerService } from './loggerdata.service';

import { Dataset } from './definitions/dataset';


@Component({
  selector: 'piechart',
  templateUrl: 'app/views/piechart.html'  
  
})

export class PieChart {

  public loggerData:Dataset[] = [];

   // lineChart from example
  public lineChartData:Array<any> = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartType:string = 'line';
  public pieChartType:string = 'pie';
 
  // Pie from example
  public pieChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  public pieChartData:number[] = [300, 500, 100];
  
  
  
  constructor (private loggerService: LoggerService ) {}


  ngOnInit(): void {
    this.loggerService.getLoggerData()
      .then(data => this.loggerData);

      this.setLabels();
  }

  private setLabels():void {
     for(let x = 0; x < this.loggerData.length; x++)
     {
        if (this.pieChartLabels.indexOf(this.loggerData.client) == -1 )
        {
          this.pieChartLabels.push(this.loggerData[x].client);
        }
     }
     
  }
 
 
 // Following functions come with pie chart example 
  public randomizeType():void {
    this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
    this.pieChartType = this.pieChartType === 'doughnut' ? 'pie' : 'doughnut';
  }
 
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
}
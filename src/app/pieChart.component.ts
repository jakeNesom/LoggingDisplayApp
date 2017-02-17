import { Component, OnInit } from '@angular/core';
import { LoggerService } from './loggerdata.service';

import { Dataset } from './definitions/dataset';


@Component({
  selector: 'piechart',
  templateUrl: 'app/views/piechart.html'  
  
})

export class PieChart {

  public dataset:Dataset[] = [];

  public clientTotals:any[] = [];

   // lineChart from example
  public lineChartData:Array<any> = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartType:string = 'line';
  public pieChartType:string = 'pie';
 
  // Pie from example
  public pieChartLabels:string[] = ['Sac County', 'Calaveras Health Clinic', 'Client 3'];
  public pieChartData:number[] = [300, 500, 100];
  
  
  
  constructor (private loggerService: LoggerService ) {}


  ngOnInit(): void {

    this.loggerService.getLoggerData()
      .then(dataset => this.dataset = dataset );
      
    this.loggerService.getLoggerData()
      .then(dataset => this.setLabels(dataset) );

   
  }

  private setLabels(incomingData:any) {
    
    //
    this.setTotals(incomingData);

    let labels:any = [];
     for(let x = 0; x < this.clientTotals.length; x++)
     {
        if (labels.indexOf(this.clientTotals[x]) === -1 )
        {
          labels.push(this.clientTotals[x]);
        }
     }

     this.setNumbersArray();

     return this.pieChartLabels = labels;
     
  }

  // sets total logs received from each client
  private setTotals(incomingData:any) {

      let totals = [];

      for(let x = 0; x < incomingData.length; x++ )
      if(totals.indexOf(incomingData[x].client) === -1)
      {
        totals.push(incomingData[x].client);
        totals[incomingData[x].client] = 1;
      }
      else 
      {
          totals[incomingData[x].client]++;
      }
      
      
      return this.clientTotals = totals;
  }

  private setNumbersArray() 
  {
    let dataArray:any[] = [];

    for( let i = 0; i < this.clientTotals.length; i++ )
    {
      dataArray[this.clientTotals[i]] = this.clientTotals[i];
    }

    return this.pieChartData = dataArray;
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
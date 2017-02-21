import { Component, OnInit } from '@angular/core';
import { LoggerService } from './loggerdata.service';

import { Dataset } from './definitions/dataset';



@Component({
  selector: 'setChart',
  templateUrl: 'app/views/piechart.html'  
  
})

export class SetChart {

  public dataset:Dataset[] = [];
  public clientTotals:any[] = [];

 //Line Chart Datas
 // lineChart
   public lineChartData:Array<any> = [
    {data: [65, 59, 80, 81 ], label: 'Client 1'},
    {data: [28, 48, 40, 20], label: 'Client 2'},
    {data: [18, 48, 77, 9 ], label: 'Client 3'}
   ];

  public lineChartLabels:Array<any> = ['30< min', '25< min', '15< min', '5< min'];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';
  
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

 
  public randomize():void {
    let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }
  
  constructor (private loggerService: LoggerService ) {}


  ngOnInit(): void {

    this.loggerService.getLoggerData()
      .then(dataset => this.dataset = dataset );
      
    this.loggerService.getLoggerData()
      .then(dataset => this.setData(dataset) );

   
  }

  private setData(incomingData:any) {
    
  
    let labels:any = {};
    let clientTotals: any = {};

    //create labels array which fills 'pieChartLables[]'
    // create clientTotals object keys dynamically from current clients
     for(let x = 0; x < incomingData.length; x++)
     {
        if (labels.indexOf(incomingData[x].client) === -1 )
        {
          labels.push(incomingData[x].client);
          clientTotals[labels[x]].total = 0;
        }
     }

     for(let i = 0; i < labels.length; i ++)
     {
       clientTotals[labels[i]];
     }


     //count clientTotals
     for(let i = 0; i < incomingData.length; i++) {
       
       //clientTotals[incomingData[i].client]++;
     }

    //set pieChartData 
   
    for(let i = 0; i < clientTotals.length; i++) {

      //this.pieChartData[i] = clientTotals[i].total;
    }

     //return this.lineChartLabels = labels;
     return this.lineChartLabels;
}
 
 
  // sets total logs received from each client
  private countClients(incomingData:any, labels:any) {

     
  }

  
  
 
 
 // Following functions come with pie chart example 
  public randomizeType():void {
   
    
  }
 
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
}
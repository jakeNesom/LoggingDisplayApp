import { Component, OnInit } from '@angular/core';
import { LoggerService } from './loggerdata.service';

import { Dataset } from './definitions/dataset';



@Component({
  selector: 'setChart',
  templateUrl: 'app/views/setchart.html'  
  
})

export class SetChart {

  //incoming data from loggingService Get request
  public dataset:Dataset[] = [];

  //filled in with example
  public clientTotals:any[] = [ {client: "clientName", total:"total logs"}];



 //Line Chart Data from http://valor-software.com/ng2-charts/ using chart.js and ng-2charts plugins
   public lineChartData:Array<any> = [
    {data: [65, 59, 80, 81 ], label: 'Client 1'},
    {data: [28, 48, 40, 20], label: 'Client 2'},
    {data: [18, 48, 77, 9 ], label: 'Client 3'}
   ];

  //public lineChartLabels:Array<any> = ['30< min', '25< min', '15< min', '5< min'];
  
  public lineChartType:string = 'line';
  public lineChartOptions:any = {
    responsive: true,
    maintainAspectRatio: false
  };
  public lineChartLegend:boolean = true;
  
  


 
  // creating instance of LoggerService
  constructor (private loggerService: LoggerService ) {}


  ngOnInit(): void {

    this.loggerService.getLoggerData()
      .then(dataset => this.dataset = dataset );
      
    this.loggerService.getLoggerData()
      .then(dataset => this.setData(dataset) );

   
  }

  private setData(incomingData:any) {
    
  
    let labels:Array<any> = [];

    interface ClientTotals {
      
        client: string,
        total: number,
        intervalTotal?: {
            "30+": number,
            "15-30": number,
            "5-15": number,
            ">5": number
        }
      
    }
    let clientTotals: ClientTotals[] = [];
    let iter = 0;
    //create labels array which fills 'pieChartLables[]'
    // create clientTotals object keys dynamically from current clients
     for(let x = 0; x < incomingData.length; x++)
     {
        if (labels.indexOf(incomingData[x].client) === -1 )
        {
          labels.push(incomingData[x].client);
          
        }
     }

     for(let i = 0; i < labels.length; i ++)
     {
       clientTotals[i].client = labels[i];
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
     return this.lineChartData;
}
 
 
  // sets total logs received from each client
  private countClients(incomingData:any, labels:any) {

     
  }

  
  
 
 
 // Following functions come with pie chart example 

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
 
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
}
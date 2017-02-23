import { Component, OnInit, PipeTransform, Pipe} from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { LoggerService } from './loggerdata.service';

import { Dataset } from './definitions/dataset';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';


@Component({
  selector: 'setChart',
  templateUrl: 'app/views/setchart.html',  
})

export class SetChart {

  // //public barChartString:any = "<canvas baseChart" +
  //                   "[datasets]='barChartData'" +
  //                   "[labels]='barChartLabels'" +
  //                   "[options]='barChartOptions'" +
  //                   "[legend]='barChartLegend'" +
  //                   "[chartType]='barChartType'" +
  //                   "(chartHover)='barChartHovered($event)'" +
  //                   "(chartClick)='barChartClicked($event)'></canvas>";

  //incoming data from loggingService Get request
  public dataset:Dataset[] = [];

  //public clientTotals:any[] = [];
  public clientTotals:any = {};

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
    maintainAspectRatio: true
  };
  public lineChartLegend:boolean = true;
  
  
  /** Bar Chart Variables  */

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['Clients'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  public barChartData:any[] = [
    {data: ["3"], label:"Client 1"},
    {data: ["2"], label:"Client 2"},
    {data: ["5"], label:"Client 5"},
    {data: ["4"], label:"Client 7"}
    
    ];

 
  
  

  // creating instance of LoggerService
  constructor (private loggerService: LoggerService, private sanitizer: DomSanitizer) {}
 

  ngOnInit(): void {

    this.loggerService.getLoggerData()
      .then(dataset => this.dataset = dataset );

    this.loggerService.getLoggerData()
      .then(dataset => this.setData(dataset) );
  }

  public updateData() {
    this.loggerService.getLoggerData()
      .then(dataset => this.setData(dataset) );

  }

  private setData(incomingData:any):void {
    
  
    let labels:any = [];
  
    //create labels array which fills 'pieChartLables[]'
    // create clientTotals object keys dynamically from current clients
     for(let x = 0; x < incomingData.length; x++)
     {
      
        if (labels.indexOf(incomingData[x].client) === -1 )
        {
          labels.push(incomingData[x].client);
          
        }
      }
     
     
     console.log(this.barChartLabels);
     this.countClients(incomingData, labels);
    // @ViewChild("canvas basechart") 
    // private let _chart;
    // _chart.ngOnChanges()
     //return this.lineChartLabels = labels;
    
}
 
 
  
  private countClients(incomingData:any, labels:any):void {

    for(let i = 0; i < labels.length; i++)
    {
      this.clientTotals[labels[i]] = {};
      this.clientTotals[labels[i]]["total"] = 0;
    }

    // populate client section of clientTotals array & initialize 'total' property value
     

    for(let key in this.clientTotals)
    {
      for(let i = 0; i < incomingData.length; i++ )
      {
        if ( key == incomingData[i].client)
        {
          this.clientTotals[key]["total"]++;
        }
      }
     }
      //  for(let j = 0; j < incomingData.length; j++)
      //  {
      //    if(incomingData[j].client in this.clientTotals && this.clientTotals.hasOwnProperty(incomingData[j]["total"]))
      //    {
      //      this.clientTotals[incomingData[j]]["total"] += 1;
      //    }
      //  }
    

     this.setBarChartData();

     
     
  }

  
  private setBarChartData (): void {
  
    // get clientTotals associative array length
    // copy data to barChartData array
    this.barChartData = [];
    let size = 0;
    for (let key in this.clientTotals)
    {
      
       this.barChartData[size] = {};
       this.barChartData[size]["label"] = key;
       this.barChartData[size]["data"] = [];
       this.barChartData[size]["data"][0] = this.clientTotals[key]["total"];
       size++;
    }  

    this.barChartData = this.barChartData.slice();
    

    
    
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

  // events
  public barChartClicked(e:any):void {
    console.log(e);
  }
 
  public barChartHovered(e:any):void {
    console.log(e);
  }
 
  public barChartRandomize():void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }
}
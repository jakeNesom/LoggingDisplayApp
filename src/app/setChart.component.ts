import { Component, OnInit, PipeTransform, Pipe, Input, OnChanges, SimpleChange,
        Output, EventEmitter, ChangeDetectionStrategy, ElementRef, ViewChild} from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { ApplicationRef } from '@angular/core';

import { LoggerService } from './loggerdata.service';
import { Dataset } from './definitions/dataset';
import { BaseChartDirective, ChartsModule  } from 'ng2-charts';
import { DisplayComponent } from './display.component';

//ng on changes
//http://stackoverflow.com/questions/35823698/how-to-make-ngonchanges-work-in-angular2

@Component({
  selector: 'setChart',
  templateUrl: 'app/views/setchart.html',  
})

export class SetChart {
 
  @ViewChild(BaseChartDirective)
  public chart: BaseChartDirective;

  @Input() currentClientC: string;

  @Input() currentNodeC: string;
 
  @Input() timeFilterC: string;

  ngOnChanges(changes: any []) {
    console.log("onChange fired");
    console.log("changing", changes);

    for (let key in changes)
    {
      if(key == "currentClientC") { this.filters.client = this.currentClientC; }
      if(key == "currentNodeC") { this.filters.node = this.currentNodeC; }
      if(key == "timeFilterC") { this.filters.time = this.timeFilterC; }
    }


    
  }
  //incoming data from loggingService Get request
  public dataset:Dataset[] = [];

  //public clientTotals:any[] = [];
  public clientTotals:any = {};

  public filters:any = {client:"ANY", node:"ANY", time:"ANY"};
  public clientLabels: any = [];
  public nodeLabels: any = []
  
  // variable toggles activelyLook() to stop the repeating get requests
  public activelyLookForData: boolean = true;

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
  public barChartLabels:string[] = ['NodeA', "NodeB", "NodeC"];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  public barChartData:any[] = [
    {data: ["3", "2"], label:"Client A"},
    {data: ["2", "1"], label:"Client B"},
    {data: ["5", "2"], label:"Client C"},
    {data: ["5", "2"], label:"Client D"},
    {data: ["5", "2"], label:"Client E"},
    {data: ["5", "2"], label:"Client F"},
    
    
    ];

 
  
  

  // creating instance of LoggerService
  constructor (private loggerService: LoggerService, private sanitizer: DomSanitizer, private _applicationRef: ApplicationRef) {}
 

  ngOnInit(): void {

    this.loggerService.getLoggerData()
      .then(dataset => this.dataset = dataset );

    this.loggerService.getLoggerData()
      .then( dataset => this.setData(dataset) );
  }

  public lookForNewData() {
    

    while(this.activelyLookForData = true)
    {
        setTimeout(function() { 
          let newData:any;
         
          this.loggerService.getLoggerData()
          .then( (data:any) => newData = data );

          if(newData !== this.dataset) { this.dataset = newData;}
      }, 8000);
    }
    

  }

  private setData(incomingData:any, filter?:any ):void {
     
     this.dataset = incomingData;
     this.dataset = this.dataset.slice();

     this.nodeFilter();
     this.setClientLabels(this.dataset);
     //this.removeExtraLabels();
     this.setNodeLabels(this.dataset);
     this.countAllClientsNodes(this.dataset);
     this.setBarChartData();
     this.updateData();
    
}

private setClientLabels(incomingData:any) {
  let labels:any = [];
    //create labels array which fills 'pieChartLables[]'
     for(let x = 0; x < incomingData.length; x++)
     {
        if (labels.indexOf(incomingData[x].client) === -1 )
        {
          labels.push(incomingData[x].client);
        }
      }

    this.clientLabels = labels;
    
    
}


// right now ng-2 charts only refreshes data when a label from the barChartData[x].label value has changed
// 
private removeExtraLabels()
{
  if (this.barChartData.length > this.clientLabels.length) 
  {
    let extra = this.barChartData.length - this.clientLabels.length;
    let length = this.clientLabels.length;

    this.barChartData.splice(5,1);
    this.barChartData = this.barChartData.slice();
  }

}

private setNodeLabels(incomingData:any) {
  let labels:any = [];
    //create labels array which fills 'pieChartLables[]'
     for(let x = 0; x < incomingData.length; x++)
     {
        if (labels.indexOf(incomingData[x].node) === -1 )
        {
          labels.push(incomingData[x].node);
        }
      }

    this.nodeLabels = labels;
    this.nodeLabels = this.nodeLabels.slice();
}
 
  
  private countAllClientsNodes(incomingData:any, filter?: any):void {
    let clabels:any =  [];
    let nlabels:any = [];
    clabels = this.clientLabels;
    nlabels = this.nodeLabels;

    for(let h = 0; h < clabels.length; h++ )
    {
      this.clientTotals[clabels[h]] = {};
    
      for(let i = 0; i < nlabels.length; i++)
      {
        this.clientTotals[clabels[h]][nlabels[i]] = {};
        this.clientTotals[clabels[h]][nlabels[i]]["total"] = 0;
      }
    }


    // populate client section of clientTotals array & initialize 'total' property value
    
    for(let i = 0; i < this.nodeLabels.length; i++)
    {
      this.barChartLabels[i] = this.nodeLabels[i];
    }


    // for each present Client
    let size = 0;
    for(let client in this.clientTotals)
    {
      
      //cycle through every array property
      for(let i = 0; i < incomingData.length; i++ )
      {
        // if one of the array properties matches this client
        if ( client == incomingData[i].client)
        {
          //cycle through each node for that client
          for(let node in this.clientTotals[client])
          {
            // if if one of the nodes matches the incoming data array nodes
            if( node == incomingData[i].node) 
            {
              // incrememnt the 'total' property of clienttotals.thisclient.thisnode.total
              this.clientTotals[client][node]["total"]++;
            }
          } 
        }
      }
      size++;

     }
   
  }

  
  private setBarChartData (): void {
      // Initialize barChartData object array
      // -- if you don't initialize the array with the number of objects it will contain,
      // the data won't show up correctly
     //this.barChartData = new Array(this.clientLabels.length-1);
      


    



    // get clientTotals associative array length
    // copy data to barChartData array
      
      let size = 0;
      for (let client in this.clientTotals)
      {
        let dataSize = 0;
        this.barChartData[size] = {};
        this.barChartData[size]["label"] = client;
        this.barChartData[size]["data"] = [];
        for( let node in this.clientTotals[client])
        {
          
          this.barChartData[size]["data"][dataSize] = 0;
          this.barChartData[size]["data"][dataSize] = this.clientTotals[client][node]["total"];
          dataSize++;
        }
        
        size++;
      }  
      
      this.barChartData = this.barChartData.slice();
  }
     
  private timeFilter () {

  }
  private nodeFilter () {

    if(this.filters.node != "ALL")
    {

       

    }
  }
 

public updateData () {
  
  this._applicationRef.tick();
  
}
 













 // THE FOLLOWING FUNCTIONS ARE LEFTOVER FROM THE ng2-charts examples I used to create this Component, none are being used

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
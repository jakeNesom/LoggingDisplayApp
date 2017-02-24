import { Component, OnInit, PipeTransform, Pipe, AfterContentInit, DoCheck} from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { LoggerService } from './loggerdata.service';

import { Dataset } from './definitions/dataset';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';


@Component({
  selector: 'displayComponent',
  templateUrl: `app/views/display.html`,
  styleUrls: ['app/css/display.css']
})

export class DisplayComponent  { 

 //incoming data from loggingService Get request

 /*
    dataset looks like this:

    {
      [client: "", timeCat:(1-4 value), time: "", node: ""]
    }
 */
  public dataset:Dataset[] = [];
  public clientTotals:any = {};
  public clientList:string[] = [];

  public currentClient = "ALL";
  public currentNode = "All";
  public timeFilter = "ALL";



  public allData = {
    clientTotals:<any>[{client: "", total: ""}],
    clientList: <any> [],
    currentClient: "ALL",
    nodeList:<any> [],
    currentNode: "ALL",
    timeList: <any> ["ALL", "Last 30", "Last 5"],
    timeFilter: "ALL",

  }

  constructor (private loggerService: LoggerService) {}


   ngOnInit(): void {


    this.loggerService.getLoggerData()
      .then(dataset => this.setData(dataset) );
  }

 
  setData(dataset:any) 
  {
    this.dataset = dataset;
    this.dataset = this.dataset.slice();
    
    this.setClientList();
    this.setNodeList();

  }
    //access a service component to populate client options list

    //watch options menu for changes, execute functions based on which option selected

 
  
  setClientList() 
  {
    
     let items:any = [];
    //create labels array which fills 'pieChartLables[]'
    // create clientTotals object keys dynamically from current clients
     for(let x = 0; x < this.dataset.length; x++)
     {
      
        if (items.indexOf(this.dataset[x].client) === -1 )
        {
          items.push(this.dataset[x].client);
          
        }
      }

      this.allData.clientList = items;
  }
  
  setNodeList() 
  {
    
     let items:any = [];
    //create labels array which fills 'pieChartLables[]'
    // create clientTotals object keys dynamically from current clients
     for(let x = 0; x < this.dataset.length; x++)
     {
      
        if (items.indexOf(this.dataset[x].node) === -1 )
        {
          items.push(this.dataset[x].node);
          
        }
      }

      this.allData.nodeList = items;
  }

  clientChange(value:string)
  {
    this.allData.currentClient = value;

    console.log(this.allData.currentClient);
  }

  nodeChange(value:string)
  {
    this.allData.currentNode = value;
    console.log(this.allData.currentNode);
  }

  timeChange(value:string)
  {
    this.allData.timeFilter = value;
    console.log(this.allData.timeFilter);
  }

 }

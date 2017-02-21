import { Component } from '@angular/core';

@Component({
  selector: 'displayComponent',
  templateUrl: `app/views/display.html`,
  styleUrls: ['app/css/display.css']
})

export class DisplayComponent  { 


  public clientOptions:string [] = ["All", "client 1", "client 2", "client 3", "client 4"];
  public timeframe:string[] = ["All", "Last 30 min", "Last 5 min"];
  public nodes:string[] = ["All", "Node 1", "Node 2", "Node 3", "Node 4"]
    
    //access a service component to populate client options list

    //watch options menu for changes, execute functions based on which option selected

    
}

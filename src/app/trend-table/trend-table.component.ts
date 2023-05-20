import { Component } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-trend-table',
  templateUrl: './trend-table.component.html',
  styleUrls: ['./trend-table.component.css']
})

export class TrendTableComponent {
  constructor(private location: Location){}
  goBack():void{
    this.location.back();
  }
  
}

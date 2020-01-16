import { EventType } from './../../models/eventType';
import { Component, OnInit, Input } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { EventModel } from 'src/app/models/eventModel';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  @Input() event:EventModel;
  @Input() eventType: EventType;
  constructor() { }

  ngOnInit() {
 
  }
  
}

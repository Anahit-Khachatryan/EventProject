import { EventType } from './../../models/eventType';
import { EventService } from './../../services/event.service';
import { Component, OnInit } from '@angular/core';
import { EventModel } from 'src/app/models/eventModel';

@Component({
  selector: 'app-events-grid',
  templateUrl: './events-grid.component.html',
  styleUrls: ['./events-grid.component.css']
})
export class EventsGridComponent implements OnInit {
events:EventModel[];
eventType
  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.eventService.getEvent().subscribe(data =>this.events = data );
    console.log(this.events)

  }
  getType() {
    this.eventService.getEventType().subscribe(type => this.eventType = type);
  }

}

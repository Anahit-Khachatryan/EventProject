import { PagerService } from './../pagination/pager.service';
import { EventModel } from 'src/app/models/eventModel';
import { EventService } from 'src/app/services/event.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-table-event',
  templateUrl: './table-event.component.html',
  styleUrls: ['./table-event.component.css']
})
export class TableEventComponent implements OnInit {
  events: EventModel[];
  eventType;
  selectedEvent: EventModel;
  confirmDelete = false;
  totalItemCount: number;
  allItems;
  eventId: number;

  constructor(private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute,
    private eventsService:EventService) {
    // this.events = this.route.snapshot.data['eventList']
  }

  ngOnInit() {
    this.events = this.route.snapshot.data['eventList'];
    this.getEv();
    this.getType();

  }
  getEv() {
   this.eventService.getEvent().subscribe(event => this.events = event);
  }
  getType() {
    this.eventService.getEventType().subscribe(type => this.eventType = type);
  }

  editEvent(event) {
    this.selectedEvent = event;
    this.router.navigate(['/edit', event.id]);
    console.log(event.id);
    console.log(this.selectedEvent);
  }

  onDelete(event) {
    this.eventId = event.id;
    console.log(this.eventId);
    this.confirmDelete=true
  }
  deleteEvent() {
    const i = this.events.findIndex(u => u.id == this.eventId);
    console.log(i);
    if (i !== -1) {
      this.events.splice(i, 1);
    }
    this.eventService.deleteEvent(this.eventId).subscribe(() => console.log(`Event with id = ${this.eventId} deleted`));
    this.confirmDelete = false;
  }
  
  createEvent() {
    this.router.navigate(['/edit',0])
  }
  closeEvent(){
    this.confirmDelete = false;
  }
  getLimitedPages(page,limit){
    this.eventsService.pagination(1,"10").subscribe(res => {
      console.log(res);
      this.totalItemCount = +res.headers.get('X-Total-Count')
      console.log(this.allItems = res.body);
    });
  }

}

import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { EventModel } from 'src/app/models/eventModel';
import { EventType } from 'src/app/models/eventType';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent implements OnInit {
  @ViewChild('eventForm', { static: true }) public createEventForm: NgForm;
  eventType;
  events: EventModel;
  panelTitle: string;
  deactivated = false;

  constructor(private service: EventService,
    private router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    console.log(this.createEventForm);
    this.getEvType();
    this._route.paramMap.subscribe(parameterMap => {
      const id = +parameterMap.get('id');
      this.getEventId(id);
    });

  }

  getEvType() {
    return this.service.getEventType().subscribe(type => this.eventType = type);

  }

  private getEventId(id: number) {
    if (id === 0) {
      this.events = {
        name: null,
        description: null,
        date: null,
        eventType: null,
      };

      this.panelTitle = 'Create Event';
      this.createEventForm.reset()
    } else {
      this.panelTitle = 'Edit Event';
      this.service.getOneEvent(id).subscribe(
        (event) => this.events = event,
        (err: any) => console.log(err)
      );
    }
  }
  save(): void {
    console.log(this.events);
    this.deactivated = true;

    if (this.events.id == null) {
      this.service.addEvent(this.events).subscribe((data) => {
        console.log(data);
        this.createEventForm.reset();
        this.router.navigate(['events-table']);
      });
    } else {
      this.service.updateEvent(this.events).subscribe((data) => {
        console.log(data);
        this.createEventForm.reset();
        this.router.navigate(['events-table'])
      },
        (error: any) => console.log(error)
      )
    }
  }
}

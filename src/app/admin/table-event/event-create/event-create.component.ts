import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { EventModel } from 'src/app/models/eventModel';


@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent implements OnInit {
  // @ViewChild('eventForm', {static: true}) public createEventForm: NgForm;
  eventTypes;
  event: EventModel;
  panelTitle: string;
  deactivated = false;
  initialForm: EventModel;
  eventForm;

  id: number;
  editMode = false;
  eventName = '';
  eventType: number;
  eventDate: Date | string;
  eventDescription = '';
  eventImage;

  // today = this.datePipe.transform(Date.now(), 'yyyy-MM-ddThh:mm');

  constructor(private service: EventService,
              private router: Router,
              private _route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this._route.params
      .subscribe((params) => {
        this.id = Number(params.id);
        this.editMode = !!params.id;
        this.initForm();
        this.getEvType();
        if (this.editMode) {
          this.getEventId();
        }
      });
  }

  getEvType() {
    this.service.getEventType()
      .subscribe(types => {
        this.eventTypes = types;
        console.log(this.eventTypes, 'types');
      });
  }

  initForm() {
    console.log(this.editMode, 'mode');
    this.eventForm = new FormGroup({
      name: new FormControl({value: this.eventName, disabled: this.editMode}, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(12)
      ]),
      type: new FormControl({value: this.eventType, disabled: this.editMode}, Validators.required),
      date: new FormControl(this.eventDate, Validators.required),
      description: new FormControl(this.eventDescription, [
        Validators.required,
        Validators.minLength(30),
        Validators.maxLength(100)
      ]),
      image: new FormControl(null)
    });
  }

  setFormValues() {
    this.eventName = this.event.name;
    this.eventType = Number(this.event.eventType);
    this.eventDate = this.event.date; // '2019-12-28T12:56' "YYYY-MM-DDThh:mm"
    this.eventDescription = this.event.description;
    this.eventImage = this.event.image;
  }

  private getEventId() {
    this.service.getOneEvent(this.id)
      .subscribe(
        (event) => {
          console.log(this.id);
          this.event = event;
          this.setFormValues();
          this.initForm();
          console.log(this.event, 'bla');
          console.log(this.event.description);
        },
        (err: any) => console.log(err)
      );
  }

  save(): void {
    this.deactivated = true;
    const formData = this.eventForm.value;

    const newEvent: EventModel = {
      date: formData.date,
      description: formData.description,
    };

    if (this.editMode) {
      newEvent.name = this.eventName;
      newEvent.eventType = this.eventType;
      console.log(this.event, 'newEvent');
      this.service.updateEvent(this.id, newEvent)
        .subscribe((data) => {
            console.log(data);
            this.router.navigate(['events-table']);
          },
          (error: any) => console.log(error)
        );
    } else {
      newEvent.name = formData.name;
      newEvent.eventType = Number(formData.type);
      console.log(formData);

      this.service.addEvent(newEvent)
        .subscribe((data) => {
          console.log(data);
          this.router.navigate(['events-table']);
        });
    }
  }
}

import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { EventCreateComponent } from '../admin/table-event/event-create/event-create.component';

@Injectable({
    providedIn: 'root'
  })
export class CreateEventCanDeactivateGuardService implements CanDeactivate<EventCreateComponent>{
    canDeactivate(component: EventCreateComponent): boolean {
        if (component.createEventForm.dirty && component.deactivated == false) {
            return confirm('Are you sure you want to discard your changes?');
        }

        return true;
    }
}



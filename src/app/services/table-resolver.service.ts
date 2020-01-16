import { EventService } from 'src/app/services/event.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { EventModel } from '../models/eventModel';
@Injectable({
  providedIn: 'root'
})
export class TableResolverService implements Resolve<EventModel[]> {
  constructor(private eventService: EventService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<EventModel[]> {
    return this.eventService.getEvent();

  }
}
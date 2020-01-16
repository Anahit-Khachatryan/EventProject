import {environment} from '../../environments/environment';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EventModel } from '../models/eventModel';


interface Event {
  name: string;
  description: string;
  date: string;
  eventType: number;
  image: string;
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }
  getEvent(): Observable<EventModel[]> {
    return this.http.get<EventModel[]>(`${environment.apiUrl}/events`,

    ).pipe(catchError(this.handleError));
  }

  getOneEvent(id: number) {
    return this.http.get<Event>(`${environment.apiUrl}/events/${id}`,
    ).pipe(catchError(this.handleError));
  }

  getEventType() {
    return this.http.get<Event>(`${environment.apiUrl}/eventTypes`,
    ).pipe(catchError(this.handleError));
  }

  addEvent(newEvent) {
    console.log(newEvent);
    return this.http.post(`${environment.apiUrl}/events`, newEvent,
    ).pipe(catchError(this.handleError));
  }

  updateEvent(id, newEvent) {
    return this.http.put<void>(`${environment.apiUrl}/events/${id}`, newEvent,
    ).pipe(catchError(this.handleError));
  }

  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/events/${id}`,
    ).pipe(catchError(this.handleError));
  }

  pagination(page, limit) {
    return this.http.get(`${environment.apiUrl}/events`, {
      observe: 'response',
      params: {
        _page: page,
        _limit: limit
      },

    });
  }
  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = '';

    if (errorResponse.error instanceof ErrorEvent) {
      errorMessage = `Client Side Error: ${errorResponse.error.message}`;
    } else {
      errorMessage = `Server Side Error: ${errorResponse.status}, error message is: ${errorResponse.message}`;

    }
    console.error(errorMessage);

    return throwError(errorMessage);
  }
}

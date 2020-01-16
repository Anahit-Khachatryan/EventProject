import { EventComponent } from './event/event.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsGridComponent } from './events-grid/events-grid.component';
import { ItemsWrapperComponent } from './items-wrapper/items-wrapper.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    EventsGridComponent,
    EventComponent,
    ItemsWrapperComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class UserModule { }

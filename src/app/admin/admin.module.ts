import { EventCreateComponent } from './table-event/event-create/event-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteComponent } from './table-event/delete/delete.component';
import { TableEventComponent } from './table-event/table-event.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PaginationComponent } from './pagination/pagination.component';
import { AdminItemsWrapperComponent } from './admin-items-wrapper/admin-items-wrapper.component';
import { SharedModule } from '../shared/shared.module';
​
​
​
@NgModule({
  declarations: [
    TableEventComponent,
    EventCreateComponent,
    DeleteComponent,
    PaginationComponent,
    AdminItemsWrapperComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        SharedModule,
        ReactiveFormsModule
    ]
})
export class AdminModule { }

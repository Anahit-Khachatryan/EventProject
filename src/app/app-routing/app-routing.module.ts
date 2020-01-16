import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { TableResolverService } from '../services/table-resolver.service';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { EventsGridComponent } from '../user/events-grid/events-grid.component';
import { CreateEventCanDeactivateGuardService } from '../services/create-event-can-deactivate.service';
import { EventCreateComponent } from '../admin/table-event/event-create/event-create.component';
import { ItemsWrapperComponent } from '../user/items-wrapper/items-wrapper.component';
import { AdminItemsWrapperComponent } from '../admin/admin-items-wrapper/admin-items-wrapper.component';
import { AuthGuard } from '../guards/auth.guard';
import { UserGuard } from '../guards/user.guard';
import { AdminGuard } from '../guards/admin.guard';
import { AuthLoginGuard } from '../guards/auth-login.guard';

const appRoutes: Routes = [
{path: 'login', component: LoginComponent, canActivate:[AuthLoginGuard]},

{path: 'events', component: ItemsWrapperComponent,canActivate: [UserGuard, AuthGuard],
children: [
  {path: '', component: EventsGridComponent},
]
},

{path: 'events-table', 
component: AdminItemsWrapperComponent,canActivate: [AdminGuard, AuthGuard],
resolve: {eventList:TableResolverService},

// children: [
// //   {path : '', component:TableEventComponent,
// // // resolve: {eventList:TableResolverService},
// //  },
//  {path: 'edit/:id', component: EventCreateComponent,
// canDeactivate:[CreateEventCanDeactivateGuardService]
// },

//  ]
},

// {path: 'events-table', 
// component:TableEventComponent,
// resolve: {eventList:TableResolverService}
// },

// {path: 'edit/:id', 
// component: EventEditComponent},
{path: 'edit/:id', component: EventCreateComponent,canActivate: [AdminGuard],
canDeactivate:[CreateEventCanDeactivateGuardService]
},
// { path: '**', redirectTo: '' },
{path: '', redirectTo:'/login', pathMatch:'full'},
{path: '**', component: PageNotFoundComponent}

]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: false}// ete sa true , lriv browserum tpum e, eventer uni tarber
    ),
    // CommonModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

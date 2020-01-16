import { EventService } from 'src/app/services/event.service';
import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { PagerService } from './pager.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  allItems
  pageCount
  // pager object
  pager: any = {};

  // paged items
  @Output()pagedItems: EventEmitter<number> = new EventEmitter();
totalItems;
  limitedEvents: any;
  totalPageCount: number;
  totalItemCount: number;
  constructor(private eventsService: EventService, private pagerService:PagerService) {
  }

  ngOnInit() {
      this.eventsService.pagination(1,"10").subscribe(res => {
        console.log(res);
        this.totalItemCount = +res.headers.get('X-Total-Count')
        this.eventsService.getEvent().subscribe(data => this.allItems = data);
        console.log(this.allItems = res.body);

        // console.log(`"Total count": ${this.pageCount.length - 1}`)       
           this.setPage(1);
      });
  }

  ngOnChanges(): void {
      // this.dataReady = !!this.eventsTotalCount;
      // this.pageCount = Math.ceil(this.eventsTotalCount / 4);
  }
  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
        return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.totalItemCount, page);

    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
}


}

import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Output() deleteClose = new EventEmitter<void>();
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
   
  }

  onDeleteClose() {
    this.deleteClose.emit();
    console.log('delete')
  }
  onClose() {
    this.close.emit()
  }


}

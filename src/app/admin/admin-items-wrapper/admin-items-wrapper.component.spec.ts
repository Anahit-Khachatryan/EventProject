import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminItemsWrapperComponent } from './admin-items-wrapper.component';

describe('AdminItemsWrapperComponent', () => {
  let component: AdminItemsWrapperComponent;
  let fixture: ComponentFixture<AdminItemsWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminItemsWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminItemsWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

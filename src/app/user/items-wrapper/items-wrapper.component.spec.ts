import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsWrapperComponent } from './items-wrapper.component';

describe('ItemsWrapperComponent', () => {
  let component: ItemsWrapperComponent;
  let fixture: ComponentFixture<ItemsWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

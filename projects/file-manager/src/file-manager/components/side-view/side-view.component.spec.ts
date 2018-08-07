import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideViewComponent } from './side-view.component';

describe('SideViewComponent', () => {
  let component: SideViewComponent;
  let fixture: ComponentFixture<SideViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

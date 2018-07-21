import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTreeComponent } from './custom-tree.component';

describe('CustomTreeComponent', () => {
  let component: CustomTreeComponent;
  let fixture: ComponentFixture<CustomTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

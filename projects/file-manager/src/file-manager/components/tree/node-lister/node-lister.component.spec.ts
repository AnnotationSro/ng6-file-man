import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeListerComponent } from './node-lister.component';

describe('NodeListerComponent', () => {
  let component: NodeListerComponent;
  let fixture: ComponentFixture<NodeListerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodeListerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeListerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

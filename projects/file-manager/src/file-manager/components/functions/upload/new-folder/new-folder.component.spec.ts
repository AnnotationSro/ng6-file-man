import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NewFolderComponent } from './new-folder.component';

describe('NewFolderComponent', () => {
  let component: NewFolderComponent;
  let fixture: ComponentFixture<NewFolderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NewFolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

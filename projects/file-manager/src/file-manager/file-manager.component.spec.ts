import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FileManagerComponent } from './file-manager.component';

describe('FileManagerComponent', () => {
  let component: FileManagerComponent;
  let fixture: ComponentFixture<FileManagerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FileManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

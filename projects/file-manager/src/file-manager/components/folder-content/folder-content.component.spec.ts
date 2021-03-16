import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FolderContentComponent } from './folder-content.component';

describe('FileViewerComponent', () => {
  let component: FolderContentComponent;
  let fixture: ComponentFixture<FolderContentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FolderContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FolderContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderContentComponent } from './folder-content.component';

describe('FileViewerComponent', () => {
  let component: FolderContentComponent;
  let fixture: ComponentFixture<FolderContentComponent>;

  beforeEach(async(() => {
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

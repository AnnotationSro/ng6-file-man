import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileViewerComponent } from './file-viewer.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    FileViewerComponent
  ],
  declarations: [FileViewerComponent]
})
export class FileViewerModule { }

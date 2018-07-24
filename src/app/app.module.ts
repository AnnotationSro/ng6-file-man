import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {TreeModule} from './tree/tree.module';
import {FileViewerModule} from './file-viewer/file-viewer.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    TreeModule,
    FileViewerModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

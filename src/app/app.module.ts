import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FileManagerModule} from './file-manager/file-manager.module';
import {SideViewModule} from './side-view/side-view.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FileManagerModule,
    SideViewModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

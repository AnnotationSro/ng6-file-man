import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FileManagerModule} from '../../projects/file-manager/src/public_api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FileManagerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

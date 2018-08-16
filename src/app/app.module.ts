import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
// import {FileManagerModule} from 'ng6-file-man';
import {FileManagerModule} from '../../projects/file-manager/src/public_api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FileManagerModule/*.forRoot(),*/
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

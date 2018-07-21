import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CustomTreeComponent } from './custom-tree/custom-tree.component';
import {TreeModule} from './tree/tree.module';

@NgModule({
  declarations: [
    AppComponent,
    CustomTreeComponent
  ],
  imports: [
    TreeModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

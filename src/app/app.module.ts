import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NodeComponent } from './tree/node/node.component';
import { TreeComponent } from './tree/tree.component';
import { CustomTreeComponent } from './custom-tree/custom-tree.component';

@NgModule({
  declarations: [
    AppComponent,
    NodeComponent,
    TreeComponent,
    CustomTreeComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

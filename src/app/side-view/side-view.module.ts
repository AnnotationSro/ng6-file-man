import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SideViewComponent} from './side-view.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SideViewComponent
  ],
  exports: [
    SideViewComponent
  ]
})
export class SideViewModule {
}

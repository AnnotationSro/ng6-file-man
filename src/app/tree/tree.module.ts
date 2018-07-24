import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {HttpClientModule} from '@angular/common/http';

import {simpleReducer} from './simple.reducer';
import {NodeComponent} from './node/node.component';
import {TreeComponent} from './tree.component';
import {NodeListerComponent} from './node-lister/node-lister.component';
import {MapToIterablePipe} from './map-to-iterable.pipe';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forRoot({path: simpleReducer})
  ],
  declarations: [
    NodeComponent,
    TreeComponent,
    NodeListerComponent,
    MapToIterablePipe
  ],
  exports: [
    TreeComponent
  ]
})
export class TreeModule {
}

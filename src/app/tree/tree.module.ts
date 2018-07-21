import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';

import {simpleReducer} from './simple.reducer';
import {CustomTreeComponent} from '../custom-tree/custom-tree.component';
import {NodeComponent} from './node/node.component';
import {TreeComponent} from './tree.component';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot({message: simpleReducer})
  ],
  declarations: [
    NodeComponent,
    TreeComponent
  ],
  exports: [
    TreeComponent
  ]
})
export class TreeModule {
}

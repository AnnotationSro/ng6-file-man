import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FileManagerComponent} from './file-manager.component';
import {SideViewComponent} from './components/side-view/side-view.component';
import {FileViewerComponent} from './components/file-viewer/file-viewer.component';
import {TreeComponent} from './components/tree/tree.component';
import {NodeListerComponent} from './components/tree/node-lister/node-lister.component';
import {NodeComponent} from './components/tree/node/node.component';
import {MapToIterablePipe} from './pipes/map-to-iterable.pipe';
import {HttpClientModule} from '@angular/common/http';
import {simpleReducer} from './reducers/simple.reducer';
import {StoreModule} from '@ngrx/store';

@NgModule({
  imports: [
    HttpClientModule,
    StoreModule.forRoot({path: simpleReducer}),
    CommonModule
  ],
  declarations: [
    FileManagerComponent,
    SideViewComponent,
    FileViewerComponent,
    NodeComponent,
    TreeComponent,
    NodeListerComponent,
    MapToIterablePipe
  ],
  exports: [
    FileManagerComponent
  ]
})
export class FileManagerModule {
}

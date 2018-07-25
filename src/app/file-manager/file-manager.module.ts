import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FileManagerComponent} from './file-manager.component';
import {SideViewComponent} from './components/side-view/side-view.component';
import {FolderContentComponent} from './components/folder-content/folder-content.component';
import {TreeComponent} from './components/tree/tree.component';
import {NodeListerComponent} from './components/tree/node-lister/node-lister.component';
import {NodeComponent} from './components/node/node.component';
import {MapToIterablePipe} from './pipes/map-to-iterable.pipe';
import {HttpClientModule} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {reducers} from './reducers/reducer.factory';

@NgModule({
  imports: [
    HttpClientModule,
    StoreModule.forRoot(reducers),
    CommonModule
  ],
  declarations: [
    FileManagerComponent,
    SideViewComponent,
    FolderContentComponent,
    NodeComponent,
    TreeComponent,
    NodeListerComponent,
    MapToIterablePipe,
    NavBarComponent
  ],
  exports: [
    FileManagerComponent
  ]
})
export class FileManagerModule {
}

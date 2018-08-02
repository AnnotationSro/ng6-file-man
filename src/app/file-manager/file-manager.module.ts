import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FileManagerComponent} from './file-manager.component';
import {FolderContentComponent} from './components/folder-content/folder-content.component';
import {TreeComponent} from './components/tree/tree.component';
import {NodeListerComponent} from './components/tree/node-lister/node-lister.component';
import {NodeComponent} from './components/node/node.component';
import {MapToIterablePipe} from './pipes/map-to-iterable.pipe';
import {HttpClientModule} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {reducers} from './reducers/reducer.factory';
import {LoadingOverlayComponent} from './components/loading-overlay/loading-overlay.component';
import {FileDropModule} from 'ngx-file-drop';
import {FileSizePipe} from './pipes/file-size.pipe';
import {UploadComponent} from './components/upload/upload.component';
import {NewFolderComponent} from './components/upload/new-folder/new-folder.component';
import { SideViewComponent } from './components/side-view/side-view.component';
import { NavigationComponent } from './components/navigation/navigation.component';

@NgModule({
  imports: [
    HttpClientModule,
    StoreModule.forRoot(reducers),
    CommonModule,
    FileDropModule
  ],
  declarations: [
    FileManagerComponent,
    FolderContentComponent,
    NodeComponent,
    TreeComponent,
    NodeListerComponent,
    MapToIterablePipe,
    NavBarComponent,
    LoadingOverlayComponent,
    FileSizePipe,
    UploadComponent,
    NewFolderComponent,
    SideViewComponent,
    NavigationComponent,
  ],
  exports: [
    FileManagerComponent,
    LoadingOverlayComponent,
    SideViewComponent
  ]
})
export class FileManagerModule {
}

import {Component} from '@angular/core';
// import {TreeModel, NodeInterface, ConfigInterface} from 'ng6-file-man';
import {TreeModel, NodeInterface, ConfigInterface} from '../../projects/file-manager/src/public_api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  tree: TreeModel;
  node: NodeInterface;
  appLanguage = 'sk';

  constructor() {
    const treeConfig: ConfigInterface = {
      baseURL: 'http://localhost:8080/',
      api: {
        listFile: 'api/file/list',
        uploadFile: 'api/file/upload',
        downloadFile: 'api/file/download',
        deleteFile: 'api/file/remove',
        createFolder: 'api/file/directory',
        renameFile: 'api/file/rename',
        searchFiles: 'api/file/search'
      },
      options: {
        allowFolderDownload: false,
        showFilesInsideTree: false
      }
    };

    this.tree = new TreeModel(treeConfig);
    this.node = this.tree.nodes;
  }

  // noinspection JSUnusedLocalSymbols
  itemClicked(event: any) {
    // console.log(event);
  }
}

import {Component} from '@angular/core';
// import {TreeModel, NodeInterface, ConfigInterface} from 'ng6-file-man';
import {ConfigInterface, NodeInterface, TreeModel} from '../../projects/file-manager/src/public_api';
import {DownloadModeEnum} from '../../projects/file-manager/src/file-manager/enums/download-mode.enum';

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
        listFile: 'api/list',
        uploadFile: 'api/upload',
        downloadFile: 'api/download',
        deleteFile: 'api/remove',
        createFolder: 'api/directory',
        renameFile: 'api/rename',
        searchFiles: 'api/search'
      },
      options: {
        allowFolderDownload: DownloadModeEnum.DOWNLOAD_DISABLED,
        showFilesInsideTree: false
      }
    };

    this.tree = new TreeModel(treeConfig);
    this.node = this.tree.nodes;
  }

  // noinspection JSUnusedLocalSymbols
  itemSelected(event: any) {
    console.log(event);
  }
}

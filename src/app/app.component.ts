import {Component} from '@angular/core';
import {TreeModel} from './file-manager/models/tree.model';
import {ConfigInterface} from './file-manager/interfaces/config.interface';
import {NodeInterface} from './file-manager/interfaces/node.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  tree: TreeModel;
  node: NodeInterface;

  constructor() {
    const treeConfig: ConfigInterface = {
      offlineMode: false, // todo implement
      baseURL: 'http://localhost:8080/',
      startingFolder: '', // todo implement
      showFilesInsideTree: false,
      upload: {
        containsFileTable: false,
        containsFileCount: true
      },
      api: {
        listFile: 'api/file/list',
        uploadFile: 'api/file/upload',
        downloadFile: 'api/file/download'
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

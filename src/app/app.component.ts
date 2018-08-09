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

  constructor() {
    const treeConfig: ConfigInterface = {
      offlineMode: false, // todo implement
      baseURL: 'http://localhost:8080/',
      startingFolder: '', // todo implement
      showFilesInsideTree: false, //todo vymaz alebo oprav lebo sa stane ze bude dva krat to iste id
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
  // noinspection JSMethodCanBeStatic
  itemClicked(event: any) {
    switch (event.type) {
      case 'download' :
        return this.download(event.node);
      default:
        console.log(event);
    }
  }

  download(node: NodeInterface) {
    window.open(this.tree.config.baseURL + this.tree.config.api.downloadFile + '?id=' + node.id, '_blank');
  }
}

import {Component, ViewEncapsulation} from '@angular/core';
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
      baseURL: 'http://localhost:3000/',
      startingFolder: 'root', // todo implement
      showFilesInsideTree: false,
      upload: {
        containsFileTable: false,
        containsFileCount: true
      }
    };

    this.tree = new TreeModel(treeConfig);
    this.node = this.tree.nodes;
  }

  private hidden = true;

  sideShowHide(event: any) {
    if (!event.node.isFolder) {
      if (this.node === null) {
        this.node = event.node;
      } else if (this.node !== event.node) {
        this.node = event.node;
        return;
      }

      this.hidden = !this.hidden;

      if (this.hidden) {
        document.getElementById('file-manager').classList.remove('selected');
      } else {
        document.getElementById('file-manager').setAttribute('class', 'selected');
      }
    }
  }
}

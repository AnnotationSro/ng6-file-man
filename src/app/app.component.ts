import {Component, ViewEncapsulation} from '@angular/core';
import {TreeModel} from './file-manager/models/tree.model';
import {ConfigInterface} from './file-manager/interfaces/config.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  tree: TreeModel;

  constructor() {
    const treeConfig: ConfigInterface = {
      offlineMode: false, // todo implement
      baseURL: 'http://localhost:3000/',
      startingFolder: 'root', // todo implement
      showFilesInsideTree: false
    };

    this.tree = new TreeModel(treeConfig);
  }

  private hidden = true;

  sideShowHide(event: any) {
    if (!event.node.isFolder) {
      this.hidden = !this.hidden;
      if (this.hidden) {
        document.getElementById('file-manager').classList.remove('selected');
      } else {
        document.getElementById('file-manager').setAttribute('class', 'selected');
      }
    }
  }
}

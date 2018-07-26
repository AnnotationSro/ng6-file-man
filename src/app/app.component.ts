import {Component} from '@angular/core';
import {TreeModel} from './file-manager/models/tree.model';
import {ConfigInterface} from './file-manager/interfaces/config.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
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
}

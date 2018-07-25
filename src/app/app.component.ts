import {Component} from '@angular/core';
import {MTree} from './file-manager/models/m-tree';
import {IConfig} from './file-manager/interfaces/i-config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tree: MTree;

  constructor() {
    const treeConfig: IConfig = {
      isCache: true, // todo implement
      baseURL: 'http://localhost:3000/',
      startingFolder: 'root', // todo implement
      showFilesInsideTree: false // todo implement
    };

    this.tree = new MTree(treeConfig);
  }
}

import {Component} from '@angular/core';
import {MTree} from './tree/models/m-tree';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tree: MTree;

  constructor() {
    this.tree = new MTree('', 'treeId');
  }

  onItemClicked(event: any): void {
    console.log('[app component] onItemClicked', event);
  }
}

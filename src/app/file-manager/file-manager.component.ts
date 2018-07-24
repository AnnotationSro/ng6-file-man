import {Component, OnInit} from '@angular/core';
import {MTree} from './models/m-tree';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})
export class FileManagerComponent implements OnInit {
  tree: MTree;

  constructor() {
    this.tree = new MTree('', 'treeId');
  }

  ngOnInit() {

  }

  onItemClicked(event: any): void {
    console.log('[app component] onItemClicked', event);
  }
}

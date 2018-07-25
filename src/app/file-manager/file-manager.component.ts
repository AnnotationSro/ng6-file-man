import {Component, OnInit} from '@angular/core';
import {MTree} from './models/m-tree';
import {IState} from './interfaces/i-state';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})
export class FileManagerComponent implements OnInit {
  tree: MTree;

  constructor(
    private store: Store<IState>
  ) {
    this.tree = new MTree('', 'treeId');
  }

  ngOnInit() {
    this.store.dispatch({type: 'SET_PATH', payload: 'root'});
  }

  onItemClicked(event: any): void {
    // console.log('[fm component] onItemClicked', event);
  }
}

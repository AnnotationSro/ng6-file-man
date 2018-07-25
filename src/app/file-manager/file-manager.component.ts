import {Component, OnInit} from '@angular/core';
import {MTree} from './models/m-tree';
import {Store} from '@ngrx/store';
import * as ACTIONS from './reducers/actions.action';
import {AppStore} from './reducers/reducer.factory';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})
export class FileManagerComponent implements OnInit {
  tree: MTree;
  loading: boolean;

  constructor(
    private store: Store<AppStore>
  ) {
    this.tree = new MTree('', 'treeId');
  }

  ngOnInit() {
    this.store.dispatch({type: ACTIONS.SET_PATH, payload: 'root'});
    this.store.select(state => state.fileManagerState.isLoading).subscribe((data: boolean) => {
      this.loading = data;
    });
  }

  onItemClicked(event: any): void {
    // console.log('[fm component] onItemClicked', event);
  }
}

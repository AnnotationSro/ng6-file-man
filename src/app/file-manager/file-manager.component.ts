import {Component, ContentChild, Input, OnInit, TemplateRef} from '@angular/core';
import {TreeModel} from './models/tree.model';
import {Store} from '@ngrx/store';
import * as ACTIONS from './reducers/actions.action';
import {AppStore} from './reducers/reducer.factory';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})
export class FileManagerComponent implements OnInit {
  @ContentChild(TemplateRef) templateRef: TemplateRef<any>;

  @Input() tree: TreeModel;
  loading: boolean;

  constructor(
    private store: Store<AppStore>
  ) {
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

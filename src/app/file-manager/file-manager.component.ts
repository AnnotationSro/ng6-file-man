import {Component, ContentChild, Input, OnInit, TemplateRef} from '@angular/core';
import {TreeModel} from './models/tree.model';
import {Store} from '@ngrx/store';
import * as ACTIONS from './reducers/actions.action';
import {AppStore} from './reducers/reducer.factory';
import {NodeService} from './services/node.service';
import {SET_LOADING_STATE} from './reducers/actions.action';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.scss']
})
export class FileManagerComponent implements OnInit {
  @Input() iconTemplate: TemplateRef<any>;
  @Input() modalTemplate: TemplateRef<any>;
  @Input() folderContentTemplate: TemplateRef<any>;
  @Input() folderContentBackTemplate: TemplateRef<any>;
  @Input() folderContentNewTemplate: TemplateRef<any>;
  @Input() loadingOverlayTemplate: TemplateRef<any>;

  @Input() tree: TreeModel;
  loading: boolean;

  constructor(
    private store: Store<AppStore>,
    private nodeService: NodeService
  ) {
  }

  ngOnInit() {
    this.nodeService.tree = this.tree;
    this.nodeService.startManagerAt(this.tree.currentPath);
    this.store.select(state => state.fileManagerState.isLoading).subscribe((data: boolean) => {
      this.loading = data;
    });
  }

  onItemClicked(event: any): void {
    // console.log('[fm component] onItemClicked', event);
  }

  backdropClicked() {
    // todo get rid of this ugly workaround
    this.store.dispatch({type: SET_LOADING_STATE, payload: false});
  }
}

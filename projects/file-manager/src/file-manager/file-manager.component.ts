import {Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {TreeModel} from './models/tree.model';
import {Store} from '@ngrx/store';
import {AppStore} from './reducers/reducer.factory';
import {NodeService} from './services/node.service';
import {SET_LOADING_STATE} from './reducers/actions.action';
import {NodeInterface} from './interfaces/node.interface';

@Component({
  selector: 'fm-file-manager',
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
  @Input() isPopup: boolean = false;
  @Output() itemClicked = new EventEmitter();

  node: NodeInterface;
  loading: boolean;
  sideMenuClosed = true;
  fmOpen = false;

  constructor(
    private store: Store<AppStore>,
    private nodeService: NodeService
  ) {
  }

  ngOnInit() {
    this.nodeService.tree = this.tree;
    this.nodeService.startManagerAt(this.tree.currentPath);

    this.store
      .select(state => state.fileManagerState.isLoading)
      .subscribe((data: boolean) => {
      this.loading = data;
    });

    this.store
      .select(state => state.fileManagerState.selectedNode)
      .subscribe((data: NodeInterface) => {
        console.log(data);
      });
  }

  onItemClicked(event: any): void {
    if (!event.node.isFolder && (!event.type || event.type === 'close')) {
      this.sideShowHide(event);
    }

    this.itemClicked.emit(event);
    // console.log('[fm component] onItemClicked', event);
  }

  backdropClicked() {
    // todo get rid of this ugly workaround
    // todo fire userCanceledLoading event
    this.store.dispatch({type: SET_LOADING_STATE, payload: false});
  }

  handleSideViewClickEvent(event: any) {
    switch (event.type) {
      case 'close' :
        return this.sideShowHide(event);
      case 'download' :
        return this.onItemClicked(event);
      case 'rename' :
        return this.onItemClicked(event);
    }
  }

  sideShowHide(event: any) {
    if (event.node.isFolder) {
      return;
    }

    if (this.node === null) {
      this.node = event.node;
    } else if (this.node !== event.node) {
      this.node = event.node;
      return;
    }

    this.sideMenuClosed = !this.sideMenuClosed;

    if (this.sideMenuClosed) {
      document.getElementById('side-view').classList.remove('selected');
    } else {
      document.getElementById('side-view').setAttribute('class', 'selected');
    }
  }

  fmShowHide() {
    this.fmOpen = !this.fmOpen;
  }
}

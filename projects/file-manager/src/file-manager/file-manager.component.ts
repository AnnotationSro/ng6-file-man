import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewEncapsulation} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {TreeModel} from './models/tree.model';
import {NodeService} from './services/node.service';
import {NodeInterface} from './interfaces/node.interface';
import {SET_LOADING_STATE} from './reducers/actions.action';
import * as ACTIONS from './reducers/actions.action';
import {AppStore} from './reducers/reducer.factory';
import {NgxSmartModalService} from 'ngx-smart-modal';

@Component({
  selector: 'fm-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FileManagerComponent implements OnInit {
  @Input() iconTemplate: TemplateRef<any>;
  @Input() modalTemplate: TemplateRef<any>;
  @Input() folderContentTemplate: TemplateRef<any>;
  @Input() folderContentBackTemplate: TemplateRef<any>;
  @Input() folderContentNewTemplate: TemplateRef<any>;
  @Input() loadingOverlayTemplate: TemplateRef<any>;
  @Input() sideViewTemplate: TemplateRef<any>;

  @Input() tree: TreeModel;
  @Input() isPopup: boolean = false;
  @Output() itemClicked = new EventEmitter();

  selectedNode: NodeInterface;
  sideMenuClosed = true;

  fmOpen = false;
  loading: boolean;
  newDialog = false;

  constructor(
    private store: Store<AppStore>,
    private nodeService: NodeService,
    public ngxSmartModalService: NgxSmartModalService
  ) {
  }

  ngOnInit() {
    this.nodeService.tree = this.tree;
    this.nodeService.startManagerAt(this.tree.currentPath);

    this.store
      .pipe(select(state => state.fileManagerState.isLoading))
      .subscribe((data: boolean) => {
        this.loading = data;
      });

    this.store
      .pipe(select(state => state.fileManagerState.selectedNode))
      .subscribe((node: NodeInterface) => {
        if (!node) {
          return;
        }

        // fixed highlighting error when closing node but not changing path
        if ((node.isExpanded && node.pathToNode !== this.nodeService.currentPath) && !node.stayOpen) {
          return;
        }

        this.handleFileManagerClickEvent({type: 'select', node: node});
      });
  }

  onItemClicked(event: any): void {
    this.itemClicked.emit(event);
  }

  handleFileManagerClickEvent(event: any) {
    switch (event.type) {
      case 'closeSideView' :
        return this.nodeClickHandler(event.node, true);
      case 'select' :
        this.onItemClicked(event);
        this.highlightSelected(event.node);
        return this.nodeClickHandler(event.node);
      case 'download' :
        return this.onItemClicked(event);
      case 'rename' :
        return this.ngxSmartModalService.getModal('renameModal').open();
      case 'renameSend' :
        this.ngxSmartModalService.getModal('renameModal').close();
        return this.onItemClicked({
          type: event.type,
          node: this.selectedNode,
          newName: event.value
        });
      case 'removeAsk':
        return this.ngxSmartModalService.getModal('confirmDeleteModal').open();
      case 'remove':
        this.ngxSmartModalService.getModal('confirmDeleteModal').close();

        this.onItemClicked({
          type: event.type,
          node: this.selectedNode
        });

        document.getElementById('side-view').classList.remove('selected');
        return this.selectedNode = null;
      case 'createFolder' :
        return this.onItemClicked({
          type: event.type,
          currentParent: this.nodeService.findParent(this.nodeService.currentPath).id,
          newDirName: event.payload
        });
    }
  }

  nodeClickHandler(node: NodeInterface, closing?: boolean) {
    if (node.name === 'root') {
      return;
    }

    if (closing) {
      const parentNode = this.nodeService.findParent(this.nodeService.currentPath);
      this.store.dispatch({type: ACTIONS.SET_SELECTED_NODE, payload: parentNode});
      this.sideMenuClosed = true;
    }
    else {
      // todo fix this (kvoli tomu ze sa klika na ten isty node tak store ho ignoruje)
      if (this.selectedNode === node && this.sideMenuClosed)
        this.sideMenuClosed = false;
      else if (this.selectedNode === node && !this.sideMenuClosed)
        this.sideMenuClosed = true;
      else if (this.selectedNode !== node && this.sideMenuClosed)
        this.sideMenuClosed = false;
      else if (this.selectedNode !== node && !this.sideMenuClosed)
        this.sideMenuClosed = false;
    }

    this.selectedNode = node;

    if (this.sideMenuClosed) {
      document.getElementById('side-view').classList.remove('selected');
    } else {
      document.getElementById('side-view').classList.add('selected');
    }
  }

  // todo stay DRY!
  highlightSelected(node: NodeInterface) {
    let pathToNode = node.pathToNode;

    if (pathToNode.length === 0) {
      pathToNode = 'root';
    }

    const treeElement = this.getElementById(pathToNode, 'tree_');
    const fcElement = this.getElementById(pathToNode, 'fc_');
    if (!treeElement && !fcElement) {
      console.warn('[File Manager] failed to find requested node for path:', pathToNode);
      return;
    }

    this.removeClass('highlighted');
    this.removeClass('light');

    if (fcElement)
      this.highilghtChildElement(fcElement);
    if (treeElement)
      this.highilghtChildElement(treeElement, true);

    // parent node highlight
    let pathToParent = node.pathToParent;
    if (pathToParent === null || node.pathToNode === this.nodeService.currentPath) {
      return;
    }

    if (pathToParent.length === 0) {
      pathToParent = 'root';
    }

    const parentElement = this.getElementById(pathToParent, 'tree_');
    if (!parentElement) {
      console.warn('[File Manager] failed to find requested parent node for path:', pathToParent);
      return;
    }

    this.highilghtChildElement(parentElement);
  }

  private highilghtChildElement(el: HTMLElement, light: boolean = false) {
    el.children[0] // appnode div wrapper
      .children[0] // ng template first item
      .classList.add('highlighted');

    if (light)
      el.children[0]
        .children[0]
        .classList.add('light');
  }

  private getElementById(id: string, prefix: string = ''): HTMLElement {
    const fullId = prefix + id;
    return document.getElementById(fullId);
  }

  private removeClass(className: string) {
    Array.from(document.getElementsByClassName(className))
      .map((el: HTMLElement) => el.classList.remove(className));
  }

  fmShowHide() {
    this.fmOpen = !this.fmOpen;
  }

  backdropClicked() {
    // todo get rid of this ugly workaround
    // todo fire userCanceledLoading event
    this.store.dispatch({type: SET_LOADING_STATE, payload: false});
  }

  handleUploadDialog(event: any) {
    this.newDialog = event;
  }
}

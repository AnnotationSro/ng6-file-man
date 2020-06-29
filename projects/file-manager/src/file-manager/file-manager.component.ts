import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewEncapsulation} from '@angular/core';
import {TreeModel} from './models/tree.model';
import {NodeService} from './services/node.service';
import {NodeInterface} from './interfaces/node.interface';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {NodeClickedService} from './services/node-clicked.service';
import {TranslateService} from '@ngx-translate/core';
import {FileManagerStoreService, SET_LOADING_STATE, SET_SELECTED_NODE} from './services/file-manager-store.service';

@Component({
  selector: 'fm-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FileManagerComponent implements OnInit {
  @Input() iconTemplate: TemplateRef<any>;
  @Input() folderContentTemplate: TemplateRef<any>;
  @Input() folderContentBackTemplate: TemplateRef<any>;
  @Input() folderContentNewTemplate: TemplateRef<any>;
  @Input() loadingOverlayTemplate: TemplateRef<any>;
  @Input() sideViewTemplate: TemplateRef<any>;

  @Input() tree: TreeModel;
  @Input() isPopup: boolean = false;
  @Input() openFilemanagerButtonLabelKey = 'filemanager.open_file_manager';
  @Output() itemClicked = new EventEmitter();
  @Output() itemSelected = new EventEmitter();


  openFilemanagerButtonLabel: string;
  private _language: string = 'en';
  @Input() set language(value: string) {
    this._language = value;
    this.translate.use(this.language);
  }

  get language(): string {
    return this._language;
  }

  selectedNode: NodeInterface;
  sideMenuClosed = true;

  fmOpen = false;
  loading: boolean;
  newDialog = false;

  constructor(
    private store: FileManagerStoreService,
    private nodeService: NodeService,
    private nodeClickedService: NodeClickedService,
    public ngxSmartModalService: NgxSmartModalService,
    public translate: TranslateService
  ) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit() {
    this.nodeService.tree = this.tree;
    this.nodeClickedService.tree = this.tree;

    this.nodeService.startManagerAt(this.tree.currentPath);
    // this.nodeService.getNodes(this.tree.currentPath).then(() => {
    //   this.store.dispatch({type: SET_SELECTED_NODE, payload: });
    // });

    this.translate.get(this.openFilemanagerButtonLabelKey).subscribe((translation) => {
      this.openFilemanagerButtonLabel = translation;
    });

    this.store
      .getState(state => state.fileManagerState.isLoading)
      .subscribe((isLoading: boolean) => {
        this.loading = isLoading;
      });

    this.store
      .getState(state => state.fileManagerState.selectedNode)
      .subscribe((selectedNode: NodeInterface) => {
        if (!selectedNode) {
          return;
        }

        // fixed highlighting error when closing node but not changing path
        if ((selectedNode.isExpanded && selectedNode.pathToNode !== this.nodeService.currentPath) && !selectedNode.stayOpen) {
          return;
        }

        this.handleFileManagerClickEvent({type: 'select', node: selectedNode});
      });
  }

  onItemClicked(event: any): void {
    this.itemClicked.emit(event);
  }

  searchClicked(data: any) {
    // console.log(data);

    const node = this.nodeService.findNodeById(data.id);
    this.ngxSmartModalService.getModal('searchModal').close();
    this.store.dispatch({type: SET_SELECTED_NODE, payload: node});
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
        this.nodeClickedService.startDownload(event.node);
        return this.onItemClicked(event);

      case 'renameConfirm' :
        return this.ngxSmartModalService.getModal('renameModal').open();
      case 'rename' :
        this.ngxSmartModalService.getModal('renameModal').close();

        this.nodeClickedService.rename(this.selectedNode.id, event.value);
        return this.onItemClicked({
          type: event.type,
          node: this.selectedNode,
          newName: event.value
        });

      case 'removeAsk':
        return this.ngxSmartModalService.getModal('confirmDeleteModal').open();
      case 'remove':
        this.ngxSmartModalService.getModal('confirmDeleteModal').close();

        this.nodeClickedService.initDelete(this.selectedNode);
        return this.onItemClicked({
          type: event.type,
          node: this.selectedNode
        });

      case 'createFolder' :
        const parentId = this.nodeService.findNodeByPath(this.nodeService.currentPath).id;

        this.nodeClickedService.createFolder(parentId, event.payload);
        return this.onItemClicked({
          type: event.type,
          parentId: parentId,
          newDirName: event.payload
        });
    }
  }

  nodeClickHandler(node: NodeInterface, closing?: boolean) {
    if (node.name === 'root') {
      return;
    }

    if (closing) {
      const parentNode = this.nodeService.findNodeByPath(this.nodeService.currentPath);
      this.store.dispatch({type: SET_SELECTED_NODE, payload: parentNode});
      this.sideMenuClosed = true;
    } else {
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

    // todo investigate this workaround - warning: [File Manager] failed to find requested node for path: [path]
    if (!document.getElementById('side-view')) {
      return;
    }

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

    if (fcElement) {
      this.highilghtChildElement(fcElement);
    }
    if (treeElement) {
      this.highilghtChildElement(treeElement, true);
    }

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

    if (light) {
      el.children[0]
        .children[0]
        .classList.add('light');
    }
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

  confirmSelection() {
    this.fmOpen = false;
    this.itemSelected.emit(this.selectedNode);
  }

  cancelSelection() {
    this.fmOpen = false;
  }
}

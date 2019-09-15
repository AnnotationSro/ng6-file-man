import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, OnDestroy} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {TreeModel} from '../../models/tree.model';
import {NodeService} from '../../services/node.service';
import {NodeInterface} from '../../interfaces/node.interface';
import {AppStore} from '../../reducers/reducer.factory';
import { Subscription } from 'rxjs';
import { fileManagerSelectedPath } from '../../reducers/stateReducer';
import { FileManagerState } from '../../interfaces/state.interface';

@Component({
  selector: 'app-folder-content',
  templateUrl: './folder-content.component.html',
  styleUrls: ['./folder-content.component.scss']
})
export class FolderContentComponent implements OnInit, OnDestroy {
  @Input() folderContentTemplate: TemplateRef<any>;
  @Input() folderContentBackTemplate: TemplateRef<any>;
  @Input() folderContentNewTemplate: TemplateRef<any>;

  @Input() treeModel: TreeModel;

  @Output() openUploadDialog = new EventEmitter();

  nodes: NodeInterface;
  obj = Object;
  pathSub: Subscription;

  constructor(
    private nodeService: NodeService,
    private store: Store<AppStore>
  ) {
  }

  ngOnInit() {
   this.pathSub = this.store
      .pipe(select(fileManagerSelectedPath))
      .subscribe(path => {
        this.nodes = this.nodeService.findNodeByPath(path);
      });
  }

  newClickedAction() {
    this.openUploadDialog.emit(true);
  }

  ngOnDestroy() {
    this.pathSub.unsubscribe();
  }
}

import {Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {Store} from '@ngrx/store';
import {TreeModel} from '../../models/tree.model';
import {NodeService} from '../../services/node.service';
import {NodeInterface} from '../../interfaces/node.interface';
import {AppStore} from '../../reducers/reducer.factory';
import {FileSystemDirectoryEntry, FileSystemFileEntry, UploadEvent, UploadFile} from 'ngx-file-drop';

@Component({
  selector: 'app-folder-content',
  templateUrl: './folder-content.component.html',
  styleUrls: ['./folder-content.component.scss']
})
export class FolderContentComponent implements OnInit {
  @Input() folderContentTemplate: TemplateRef<any>;
  @Input() folderContentBackTemplate: TemplateRef<any>;
  @Input() folderContentNewTemplate: TemplateRef<any>;

  @Input() treeModel: TreeModel;
  @Output() treeNodeClickedEvent = new EventEmitter();

  newDialog = false;
  nodes: NodeInterface;

  obj = Object;

  constructor(
    private nodeService: NodeService,
    private store: Store<AppStore>
  ) {
  }

  ngOnInit() {
    this.store.select(state => state.fileManagerState.path).subscribe((path: string) => {
      this.nodes = this.nodeService.findParent(path);
    });
  }

  nodeClickedEvent(originalEvent: any) {
    this.treeNodeClickedEvent.emit(originalEvent);
  }

  newClickedAction() {
    this.newDialog = !this.newDialog;
  }
}

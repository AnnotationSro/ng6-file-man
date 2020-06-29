import {Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {NodeService} from '../../services/node.service';
import {NodeInterface} from '../../interfaces/node.interface';
import {FileManagerStoreService} from '../../services/file-manager-store.service';

@Component({
  selector: 'app-folder-content',
  templateUrl: './folder-content.component.html',
  styleUrls: ['./folder-content.component.scss']
})
export class FolderContentComponent implements OnInit {
  @Input() folderContentTemplate: TemplateRef<any>;
  @Input() folderContentBackTemplate: TemplateRef<any>;
  @Input() folderContentNewTemplate: TemplateRef<any>;

  @Output() openUploadDialog = new EventEmitter();

  nodes: NodeInterface;
  obj = Object;

  constructor(
    private nodeService: NodeService,
    private store: FileManagerStoreService
  ) {
  }

  ngOnInit() {
    this.nodes = this.nodeService.tree.nodes;

    this.store
      .getState(state => state.fileManagerState.path)
      .subscribe((path: string) => {
        this.nodes = this.nodeService.findNodeByPath(path);
      });
  }

  newClickedAction() {
    this.openUploadDialog.emit(true);
  }
}

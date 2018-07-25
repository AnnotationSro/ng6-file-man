import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Store} from '@ngrx/store';
import {TreeModel} from '../../models/tree.model';
import {NodeService} from '../../services/node.service';
import {NodeInterface} from '../../interfaces/node.interface';
import {AppStore} from '../../reducers/reducer.factory';

@Component({
  selector: 'app-file-viewer',
  templateUrl: './folder-content.component.html',
  styleUrls: ['./folder-content.component.css']
})
export class FolderContentComponent implements OnInit {
  @Input() treeModel: TreeModel;
  @Input() loading: boolean;
  @Output() treeNodeClickedEvent = new EventEmitter();

  obj = Object;
  nodes: NodeInterface;

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
}

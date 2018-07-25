import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Store} from '@ngrx/store';
import {IState} from '../../interfaces/i-state';
import {MTree} from '../../models/m-tree';
import {NodeService} from '../tree/services/node.service';
import {INode} from '../../interfaces/i-node';

@Component({
  selector: 'app-file-viewer',
  templateUrl: './folder-content.component.html',
  styleUrls: ['./folder-content.component.css']
})
export class FolderContentComponent implements OnInit {
  @Input() treeModel: MTree;
  @Output() treeNodeClickedEvent = new EventEmitter();

  obj = Object;
  nodes: INode;

  constructor(
    private nodeService: NodeService,
    private store: Store<IState>
  ) {
  }

  ngOnInit() {
    this.store.select('path').subscribe((path: string) => {
      const requestPath = path.split('/').join('_');
      this.nodeService.getNodes(requestPath);
      this.nodes = this.nodeService.findMyDaddy(path);
    });
  }

  nodeClickedEvent(originalEvent: any) {
    this.treeNodeClickedEvent.emit(originalEvent);
  }
}

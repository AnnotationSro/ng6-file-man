import {Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {INode} from '../../interfaces/i-node';
import {MTree} from '../../models/m-tree';
import {NodeService} from '../../services/node.service';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {IState} from '../../interfaces/i-state';
import {AppStore} from '../../reducers/reducer.factory';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {
  @ContentChild(TemplateRef) templateRef: TemplateRef<any>;

  @Input() treeModel: MTree;
  @Input() loading: boolean;
  @Output() treeNodeClickedEvent = new EventEmitter();

  nodes: INode;
  currentTreeLevel = 'root';

  constructor(
    private nodeService: NodeService,
    private store: Store<AppStore>
  ) {
  }

  ngOnInit() {
    this.nodeService.tree = this.treeModel;
    this.nodes = this.treeModel.nodes;

    this.store.select(state => state.fileManagerState.path).subscribe((path: string) => {
      const requestPath = path.split('/').join('_');

      // todo implement cache = kuk ci uz taketo nieco existuje, ak nie getNodes, inak nist nerobim
      this.nodeService.getNodes(requestPath);

      this.currentTreeLevel = this.treeModel.currentPath;

      return this.treeModel.currentPath = path;
    });
  }

  nodeClickedEvent(originalEvent: any) {
    this.treeNodeClickedEvent.emit(originalEvent);
  }
}

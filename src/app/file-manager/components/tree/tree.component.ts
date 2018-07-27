import {Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {NodeInterface} from '../../interfaces/node.interface';
import {TreeModel} from '../../models/tree.model';
import {NodeService} from '../../services/node.service';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {StateInterface} from '../../interfaces/state.interface';
import {AppStore} from '../../reducers/reducer.factory';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit {
  @ContentChild(TemplateRef) templateRef: TemplateRef<any>;

  @Input() treeModel: TreeModel;
  @Output() treeNodeClickedEvent = new EventEmitter();

  nodes: NodeInterface;
  currentTreeLevel = 'root';

  constructor(
    private nodeService: NodeService,
    private store: Store<AppStore>
  ) {
  }

  ngOnInit() {
    this.nodes = this.treeModel.nodes;

    this.store.select(state => state.fileManagerState.path).subscribe((path: string) => {
      const requestPath = path.split('/').join('_');

      this.nodeService.getNodes(requestPath);

      this.currentTreeLevel = this.treeModel.currentPath;

      return this.treeModel.currentPath = path;
    });
  }

  nodeClickedEvent(originalEvent: any) {
    this.treeNodeClickedEvent.emit(originalEvent);
  }
}

import {Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {NodeInterface} from '../../interfaces/node.interface';
import {TreeModel} from '../../models/tree.model';
import {NodeService} from '../../services/node.service';
import {select, Store} from '@ngrx/store';
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
  currentTreeLevel = '';

  constructor(
    private nodeService: NodeService,
    private store: Store<AppStore>
  ) {
  }

  ngOnInit() {
    this.nodes = this.treeModel.nodes;
    
    this.store
      .pipe(select(state => state.fileManagerState.path))
      .subscribe((path: string) => {
        this.nodeService.getNodes(path);

        this.currentTreeLevel = this.treeModel.currentPath;

        return this.treeModel.currentPath = path;
      });
  }

  nodeClickedEvent(originalEvent: any) {
    this.treeNodeClickedEvent.emit(originalEvent);
  }
}

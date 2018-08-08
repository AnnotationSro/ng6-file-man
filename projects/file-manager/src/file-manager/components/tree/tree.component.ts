import {AfterViewInit, Component, ContentChild, Input, OnInit, TemplateRef} from '@angular/core';
import {NodeInterface} from '../../interfaces/node.interface';
import {TreeModel} from '../../models/tree.model';
import {NodeService} from '../../services/node.service';
import {select, Store} from '@ngrx/store';
import {AppStore} from '../../reducers/reducer.factory';
import * as ACTIONS from '../../reducers/actions.action';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements AfterViewInit, OnInit {
  @ContentChild(TemplateRef) templateRef: TemplateRef<any>;

  @Input() treeModel: TreeModel;

  nodes: NodeInterface;
  currentTreeLevel = '';

  constructor(
    private nodeService: NodeService,
    private store: Store<AppStore>
  ) {
  }

  ngOnInit() {
    this.nodes = this.treeModel.nodes;

    //todo tento store select tu neparti Kajo
    this.store
      .pipe(select(state => state.fileManagerState.path))
      .subscribe((path: string) => {
        this.nodeService.getNodes(path);

        this.currentTreeLevel = this.treeModel.currentPath;

        return this.treeModel.currentPath = path;
      });
  }

  ngAfterViewInit() {
    this.store
      .pipe(select(state => state.fileManagerState.path))
      .subscribe((path: string) => {
        const nodes = this.nodeService.findParent(path);
        this.store.dispatch({type: ACTIONS.SET_SELECTED_NODE, payload: nodes});
      });
  }
}

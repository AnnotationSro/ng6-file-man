import {AfterViewInit, Component, ContentChild, Input, OnInit, TemplateRef} from '@angular/core';
import {NodeInterface} from '../../interfaces/node.interface';
import {TreeModel} from '../../models/tree.model';
import {NodeService} from '../../services/node.service';
import {first} from 'rxjs/operators';
import {FileManagerStoreService, SET_SELECTED_NODE} from '../../services/file-manager-store.service';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements AfterViewInit, OnInit {
  @ContentChild(TemplateRef, {static: false}) templateRef: TemplateRef<any>;

  @Input() treeModel: TreeModel;

  nodes: NodeInterface;
  currentTreeLevel = '';

  constructor(
    private nodeService: NodeService,
    private store: FileManagerStoreService
  ) {
  }

  ngOnInit() {
    this.nodes = this.treeModel.nodes;

    //todo move this store to proper place
    this.store
      .getState(state => state.fileManagerState.path)
      .subscribe((path: string) => {
        this.nodeService.getNodes(path);

        this.currentTreeLevel = this.treeModel.currentPath;

        return this.treeModel.currentPath = path;
      });
  }

  ngAfterViewInit() {
    this.store
      .getState(state => state.fileManagerState.path)
      .pipe(first())
      .subscribe((path: string) => {
        const nodes = this.nodeService.findNodeByPath(path);
        this.store.dispatch({type: SET_SELECTED_NODE, payload: nodes});
      });
  }
}

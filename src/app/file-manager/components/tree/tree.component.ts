import {Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {INode} from '../../interfaces/i-node';
import {MTree} from '../../models/m-tree';
import {NodeService} from './services/node.service';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {IState} from '../../interfaces/i-state';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {
  @ContentChild(TemplateRef) templateRef: TemplateRef<any>;

  @Input() treeModel: MTree;
  @Output() treeNodeClickedEvent = new EventEmitter();

  nodes: INode;
  path$: Observable<string>;
  currentTreeLevel = 'root';

  constructor(
    private nodeService: NodeService,
    private store: Store<IState>
  ) {
    this.path$ = this.store.select('path');
  }

  ngOnInit() {
    this.nodeService.tree = this.treeModel;
    this.nodes = this.treeModel.nodes;

    this.store.select('path').subscribe((path: string) => {
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

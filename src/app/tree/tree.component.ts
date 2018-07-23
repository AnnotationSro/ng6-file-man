import {Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {INode} from './interfaces/i-node';
import {MTree} from './models/m-tree';
import {NodeService} from './services/node.service';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {IState} from './interfaces/i-state';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {
  @ContentChild(TemplateRef) templateRef: TemplateRef<any>;

  @Input() treeModel: MTree;
  @Output() treeNodeClickedEvent = new EventEmitter();

  message$: Observable<string>;

  currentTreeLevel = '';
  nodes: INode[];

  constructor(
    private nodeService: NodeService,
    private store: Store<IState>
  ) {
    this.message$ = this.store.select('message');
  }

  ngOnInit() {
    this.nodeService.getNodes()
      .subscribe(nodes => {
        this.treeModel.nodes = nodes;
        return this.nodes = nodes;
      });

    this.currentTreeLevel = this.treeModel.currentPath;

    this.nodeService.tree = this.treeModel;

    this.store.select('message').subscribe(path => this.treeModel.currentPath = path);
  }

  nodeClickedEvent(originalEvent: any) {
    this.treeNodeClickedEvent.emit(originalEvent);
  }
}

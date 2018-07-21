import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {INode} from '../interfaces/i-node';
import {MTree} from '../models/m-tree';
import {NodeService} from '../services/node.service';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {
  @Input() treeModel: MTree;
  @Output() treeNodeClickedEvent = new EventEmitter();
  currentTreeLevel = '';
  nodes: INode[];

  constructor(
    private nodeService: NodeService
  ) {
  }

  ngOnInit() {
    this.nodeService.getNodes()
      .subscribe(nodes => {
        this.treeModel.nodes = nodes;
        return this.nodes = nodes;
      });

    this.currentTreeLevel = this.treeModel.currentPath;

    this.nodeService.tree = this.treeModel;

    console.log(this);
  }

  onInputChange(event: any): void {
    this.currentTreeLevel = event.target.value || '';
  }

  nodeClickedEvent(originalEvent: any) {
    this.treeNodeClickedEvent.emit(originalEvent);
    this.nodeClickedHandler(originalEvent.node);
  }

  nodeClickedHandler(node: INode): void {
    this.treeModel.currentPath = node.pathToNode;
  }

}

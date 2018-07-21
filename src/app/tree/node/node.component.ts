import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {INode} from '../interfaces/i-node';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent implements OnInit {
  @Input() node: INode;
  @Output() nodeClickedEvent = new EventEmitter();

  outputName: string;
  parents: string[];

  constructor() {
  }

  ngOnInit() {
    console.log(this);
    this.outputName = this.node.name ? this.node.name : this.node.id;
    this.parents = this.node.pathToNode.split('/');
  }

  onClick(event: any) {
    this.nodeClickedEvent.emit({
      event: event,
      node: this.node
    });
  }

}

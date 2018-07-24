import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {INode} from '../../../interfaces/i-node';
import {Store} from '@ngrx/store';
import {IState} from '../../../interfaces/i-state';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent implements OnInit {
  @Input() node: INode;
  @Output() nodeClickedEvent = new EventEmitter();

  outputName: string;

  constructor(
    private store: Store<IState>,
  ) {
  }

  ngOnInit() {
    this.outputName = this.node.name ? this.node.name : this.node.id;
  }

  onClick(event: any) {
    this.nodeClickedEvent.emit({
      event: event,
      node: this.node
    });

    if (this.node.isFolder) {
      if (this.node.stayOpen) {
        return;
      }

      this.node.isExpanded = !this.node.isExpanded;

      if (this.node.isExpanded) {
        this.store.dispatch({type: 'SET_PATH', payload: this.node.pathToNode});
      }

      // todo recursive collapse vsetkych childov
      if (!this.node.isExpanded) {
        document.getElementById(this.node.pathToNode).setAttribute('class', 'hide-children');
        this.store.dispatch({type: 'SET_PATH', payload: this.node.parentId});
      } else {
        document.getElementById(this.node.pathToNode).setAttribute('class', 'show-children');
      }
    }
  }
}

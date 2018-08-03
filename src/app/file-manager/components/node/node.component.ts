import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {NodeInterface} from '../../interfaces/node.interface';
import {Store} from '@ngrx/store';

import * as ACTIONS from '../../reducers/actions.action';
import {AppStore} from '../../reducers/reducer.factory';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss']
})
export class NodeComponent implements OnInit {
  @Input() node: NodeInterface;
  @Output() nodeClickedEvent = new EventEmitter();

  outputName: string;

  constructor(
    private store: Store<AppStore>,
  ) {
  }

  ngOnInit() {
  }

  onClick(event: any) {
    this.nodeClickedEvent.emit({
      event: event,
      node: this.node
    });

    this.store.dispatch({type: ACTIONS.SET_SELECTED_NODE, payload: this.node});

    if (this.node.isFolder) {

      if (this.node.stayOpen) {
        this.store.dispatch({type: ACTIONS.SET_PATH, payload: this.node.pathToNode});
        return;
      }

      this.node.isExpanded = !this.node.isExpanded;

      if (this.node.isExpanded) {
        this.store.dispatch({type: ACTIONS.SET_PATH, payload: this.node.pathToNode});
      }

      // todo recursive collapse vsetkych childov
      if (!this.node.isExpanded) {
        document.getElementById(this.node.pathToNode).setAttribute('class', 'deselected');

        let parentPath = this.node.pathToNode.split('/');
        parentPath = parentPath.slice(0, parentPath.length - 1);

        this.store.dispatch({type: ACTIONS.SET_PATH, payload: parentPath.join('/')});
      } else {
        document.getElementById(this.node.pathToNode).setAttribute('class', 'selected');
      }
    }
  }
}

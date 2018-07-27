import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NodeInterface} from '../../interfaces/node.interface';
import {Store} from '@ngrx/store';
import {StateInterface} from '../../interfaces/state.interface';

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
      this.store.dispatch({type: ACTIONS.SET_SELECTED_NODE, payload: this.node.id});

      this.node.isExpanded = !this.node.isExpanded;

      if (this.node.isExpanded) {
        this.store.dispatch({type: ACTIONS.SET_PATH, payload: this.node.pathToNode});
      }

      // todo recursive collapse vsetkych childov
      if (!this.node.isExpanded) {
        document.getElementById(this.node.pathToNode).setAttribute('class', 'deselected');
        this.store.dispatch({type: ACTIONS.SET_PATH, payload: this.node.parentId});
      } else {
        document.getElementById(this.node.pathToNode).setAttribute('class', 'selected');
      }
    }
  }
}

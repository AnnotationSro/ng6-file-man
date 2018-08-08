import {Component, Input, OnInit} from '@angular/core';
import {NodeInterface} from '../../../interfaces/node.interface';
import {Store} from '@ngrx/store';

import * as ACTIONS from '../../../reducers/actions.action';
import {AppStore} from '../../../reducers/reducer.factory';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss']
})
export class NodeComponent implements OnInit {
  @Input() node: NodeInterface;

  constructor(
    private store: Store<AppStore>,
  ) {
  }

  ngOnInit() {
  }

  onClick() {
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
        document.getElementById(this.node.pathToNode).classList.add('deselected');
        this.store.dispatch({type: ACTIONS.SET_PATH, payload: this.node.pathToParent});
      } else {
        document.getElementById(this.node.pathToNode).classList.remove('deselected');
      }
    }
  }
}

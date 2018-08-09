import {Component, Input, OnInit} from '@angular/core';
import {NodeInterface} from '../../../interfaces/node.interface';
import {Store} from '@ngrx/store';

import * as ACTIONS from '../../../reducers/actions.action';
import {AppStore} from '../../../reducers/reducer.factory';
import {NodeService} from '../../../services/node.service';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss']
})
export class NodeComponent implements OnInit {
  @Input() node: NodeInterface;

  constructor(
    private store: Store<AppStore>,
    private nodeService: NodeService
  ) {
  }

  ngOnInit() {
  }

  onClick() {
    this.store.dispatch({type: ACTIONS.SET_SELECTED_NODE, payload: this.node});

    if (!this.node.isFolder) {
      return;
    }

    if (this.node.stayOpen) {
      if (this.node.name == 'root') {
        this.nodeService.foldAll();
      }

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
      this.nodeService.foldRecursively(this.node);
      this.store.dispatch({type: ACTIONS.SET_PATH, payload: this.node.pathToParent});
    } else {
      document.getElementById(this.node.pathToNode).classList.remove('deselected');
    }

  }
}

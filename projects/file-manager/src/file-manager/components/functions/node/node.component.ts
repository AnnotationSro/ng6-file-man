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
  isSingleClick = true;

  constructor(
    private store: Store<AppStore>,
    private nodeService: NodeService
  ) {
  }

  method1CallForClick(event: MouseEvent) {
    event.preventDefault();

    this.isSingleClick = true;
    setTimeout(() => {
      if (this.isSingleClick) {
        this.showMenu();
      }
    }, 200);
  }

  // todo event.preventDefault for double click
  method2CallForDblClick(event: any) {
    event.preventDefault();

    this.isSingleClick = false;
    this.open();
  }

  ngOnInit() {
  }

  open() {
    if (!this.node.isFolder) {
      console.log('download me');
      return;
    }

    if (this.node.stayOpen) {
      if (this.node.name == 'root') {
        console.log('[Node] I\'m (g)root');
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
      document.getElementById('tree_' + this.node.pathToNode).classList.add('deselected');
      this.nodeService.foldRecursively(this.node);
      this.store.dispatch({type: ACTIONS.SET_PATH, payload: this.node.pathToParent});
    } else {
      document.getElementById('tree_' + this.node.pathToNode).classList.remove('deselected');
    }
  }

  showMenu() {
    this.store.dispatch({type: ACTIONS.SET_SELECTED_NODE, payload: this.node});
  }
}

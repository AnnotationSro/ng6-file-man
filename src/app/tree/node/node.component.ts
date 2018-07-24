import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {INode} from '../interfaces/i-node';
import {Store} from '@ngrx/store';
import {IState} from '../interfaces/i-state';

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
    private store: Store<IState>
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
      // todo state sa nemeni ak niekto otvori zatvori a otvori ten isty folder a teda nepytam update

      if (!this.node.stayOpen) {
        this.node.isExpanded = !this.node.isExpanded;
      }

      if (!this.node.stayOpen && this.node.isExpanded) {
        this.store.dispatch({type: 'SET_PATH', payload: this.node.pathToNode});
      }

      if (!this.node.isExpanded) {
        this.node.children = {};
      }
    }
  }
}

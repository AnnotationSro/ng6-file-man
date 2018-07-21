import {Component, Input, OnInit} from '@angular/core';
import {INode} from '../tree/interfaces/i-node';
import {MTree} from '../tree/models/m-tree';
import {NodeComponent} from '../tree/node/node.component';
import {Store} from '@ngrx/store';
import {IState} from '../tree/interfaces/i-state';

@Component({
  selector: 'app-custom-tree',
  templateUrl: './custom-tree.component.html',
  styleUrls: ['./custom-tree.component.css']
})
export class CustomTreeComponent extends NodeComponent implements OnInit {
  @Input() node: INode;
  @Input() treeModel: MTree;

  constructor(store: Store<IState>) {
    super(store);
  }

  ngOnInit() {
  }

  customOnClick(e: any) {
    this.onClick(e);

    console.log('[custom-tree module] overridden from own node component');
  }
}

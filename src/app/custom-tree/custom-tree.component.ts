import {Component, Input, OnInit} from '@angular/core';
import {INode} from '../tree/interfaces/i-node';
import {MTree} from '../tree/models/m-tree';

@Component({
  selector: 'app-custom-tree',
  templateUrl: './custom-tree.component.html',
  styleUrls: ['./custom-tree.component.css']
})
export class CustomTreeComponent implements OnInit {
  @Input() node: INode;
  @Input() treeModel: MTree;

  constructor() {
  }

  ngOnInit() {
  }

  onClick(e: any) {
    console.log('[custom-tree module] Event from own node component');
  }
}

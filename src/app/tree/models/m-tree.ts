import {INode} from '../interfaces/i-node';
import {NodeService} from '../services/node.service';
import {OnInit} from '@angular/core';

export class MTree {
  private _currentPath: string;
  private _nodes: INode;
  private _treeId: string;
  private _selectedNodeId: string;

  constructor(
    startingPath: string = '',
    treeId: string = ''
  ) {
    this._currentPath = startingPath;
    this._treeId = treeId;

    this.nodes = <INode>{
      id: 'root',
      pathToNode: 'root',
      isFolder: true,
      name: 'root',
      children: {}
    };
  }

  get currentPath(): string {
    return this._currentPath;
  }

  set currentPath(value: string) {
    this._currentPath = value;
  }

  get nodes(): INode {
    return this._nodes;
  }

  set nodes(value: INode) {
    this._nodes = value;
  }

  get selectedNodeId(): string {
    return this._selectedNodeId;
  }

  set selectedNodeId(value: string) {
    this._selectedNodeId = value;
  }
}

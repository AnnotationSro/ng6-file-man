import {Injectable} from '@angular/core';
import {TREE} from '../../tree.mock';
import {INode} from '../interfaces/i-node';
import {Observable, of} from 'rxjs';
import {MTree} from '../models/m-tree';

@Injectable({
  providedIn: 'root'
})
export class NodeService {
  private _tree: MTree;

  constructor() {
  }

  getNodes(): Observable<INode[]> {
    return of(TREE);
  }

  get tree(): MTree {
    return this._tree;
  }

  set tree(value: MTree) {
    this._tree = value;
  }
}

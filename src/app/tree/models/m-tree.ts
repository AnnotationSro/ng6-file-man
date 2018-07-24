import {INode} from '../interfaces/i-node';

export class MTree {
  private _currentPath: string;
  private _nodes: INode;
  private _treeId: string;
  private _selectedNodeId: string;
  private _isCache: boolean;

  constructor(
    startingPath: string = '',
    treeId: string = '',
    isCache: boolean = false
  ) {
    this._currentPath = startingPath;
    this._treeId = treeId;
    this._isCache = isCache;

    this.nodes = <INode>{
      id: 'root',
      pathToNode: 'root',
      isFolder: true,
      isExpanded: true,
      stayOpen: true,
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

  get isCache(): boolean {
    return this._isCache;
  }

  set isCache(value: boolean) {
    this._isCache = value;
  }
}

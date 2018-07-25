import {INode} from '../interfaces/i-node';
import {IConfig} from '../interfaces/i-config';

export class MTree {
  private _currentPath: string;
  private _nodes: INode;
  private _selectedNodeId: string;
  public config: IConfig;

  constructor(config: IConfig) {
    this._currentPath = config.startingFolder;
    this.config = config;

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
    return this.config.isCache;
  }

  set isCache(value: boolean) {
    this.config.isCache = value;
  }
}

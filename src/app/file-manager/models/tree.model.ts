import {NodeInterface} from '../interfaces/node.interface';
import {ConfigInterface} from '../interfaces/config.interface';

export class TreeModel {
  private _currentPath: string;
  private _nodes: NodeInterface;
  private _selectedNodeId: string;
  public config: ConfigInterface;

  constructor(config: ConfigInterface) {
    this._currentPath = config.startingFolder;
    this.config = config;

    this.nodes = <NodeInterface>{
      id: 0,
      parentId: -1,
      pathToNode: '',
      isFolder: true,
      isExpanded: true,
      stayOpen: true,
      name: '',
      children: {}
    };
  }

  // todo
  public foldNode(node: NodeInterface) {
    if (!node.stayOpen) {
      node.isExpanded = false;
    }
  }

  // todo
  public foldNodeRecursively(node: NodeInterface) {
    this.foldNode(node);

    console.log(node);

    for (const childNode in node.children) {
      if (node.children.hasOwnProperty(childNode)) {
        this.foldNodeRecursively(node.children[childNode]);
      }
    }
  }

  get currentPath(): string {
    return this._currentPath;
  }

  set currentPath(value: string) {
    this._currentPath = value;
  }

  get nodes(): NodeInterface {
    return this._nodes;
  }

  set nodes(value: NodeInterface) {
    this._nodes = value;
  }

  get selectedNodeId(): string {
    return this._selectedNodeId;
  }

  set selectedNodeId(value: string) {
    this._selectedNodeId = value;
  }

  get isCache(): boolean {
    return this.config.offlineMode;
  }

  set isCache(value: boolean) {
    this.config.offlineMode = value;
  }
}

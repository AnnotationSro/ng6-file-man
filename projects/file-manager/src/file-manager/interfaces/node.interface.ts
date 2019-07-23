export interface NodeInterface {
  isRoot: boolean;
  id: number;
  pathToNode: string;
  pathToParent: string;
  isFolder: boolean;
  isExpanded: boolean;
  stayOpen?: boolean;
  name?: string;
  children?: any;
}

export interface NodeInterface {
  id: string;
  parentId: string;
  pathToNode: string;
  isFolder: boolean;
  isExpanded: boolean;
  stayOpen?: boolean;
  name?: string;
  children?: any;
}

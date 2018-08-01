export interface NodeInterface {
  id: number;
  parentId: number;
  pathToNode: string;
  isFolder: boolean;
  isExpanded: boolean;
  stayOpen?: boolean;
  name?: string;
  children?: any;
}

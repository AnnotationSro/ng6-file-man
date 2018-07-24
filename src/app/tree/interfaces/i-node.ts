export interface INode {
  id: string;
  parentId: string;
  pathToNode: string;
  isFolder: boolean;
  name?: string;
  children?: any;
}

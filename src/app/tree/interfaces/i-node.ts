export interface INode {
  id: string;
  parentId: string;
  pathToNode: string;
  name?: string;
  childrenIds?: string[];
}

export interface NodeInterface {
  id: number;
  pathToNode: string;
  isFolder: boolean;
  isExpanded: boolean;
  stayOpen?: boolean;
  name?: string;
  children?: any;
}

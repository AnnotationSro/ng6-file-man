import {INode} from './tree/interfaces/i-node';

export const TREE: INode[] = [
  <INode>{
    name: 'root',
    id: 'root',
    pathToNode: '',
    parentId: 'root',
    isFolder: true,
    childrenIds: ['folder1', 'folder2']
  }, <INode>{
    name: 'folder1',
    id: 'folder1',
    pathToNode: '/folder1',
    parentId: '',
    isFolder: true,
    childrenIds: ['uniqueId4']
  }, <INode>{
    name: 'folder2',
    id: 'folder2',
    pathToNode: '/folder2',
    parentId: '',
    isFolder: true,
    childrenIds: ['uniqueId3']
  }, <INode> {
    name: 'folder3',
    id: 'folder3',
    pathToNode: '/folder2/folder3',
    parentId: 'folder2',
    isFolder: true,
    childrenIds: []
  }, <INode> {
    name: 'file1.bla',
    id: 'file1.bla',
    pathToNode: '/folder1/file1.bla',
    parentId: 'folder1',
    isFolder: false,
    childrenIds: []
  }
];

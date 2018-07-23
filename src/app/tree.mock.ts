import {INode} from './tree/interfaces/i-node';

export const TREE: INode[] = [
  <INode>{
    name: 'root',
    id: 'root',
    pathToNode: '',
    parentId: 'root',
    childrenIds: ['folder1', 'folder2']
  }, <INode>{
    name: 'folder1',
    id: 'folder1',
    pathToNode: '/folder1',
    parentId: '',
    childrenIds: ['uniqueId4']
  }, <INode>{
    name: 'folder2',
    id: 'folder2',
    pathToNode: '/folder2',
    parentId: '',
    childrenIds: ['uniqueId3']
  }, <INode> {
    name: 'folder3',
    id: 'folder3',
    pathToNode: '/folder2/folder3',
    parentId: 'folder2',
    childrenIds: []
  }, <INode> {
    name: 'folder4',
    id: 'folder4',
    pathToNode: '/folder1/folder4',
    parentId: 'folder1',
    childrenIds: []
  }
];

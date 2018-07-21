import {INode} from './tree/interfaces/i-node';

export const TREE: INode[] = [
  <INode>{
    // name: 'folder1',
    id: 'uniqueId1',
    pathToNode: '/folder1',
    parentId: '',
    childrenIds: ['uniqueId4']
  }, <INode>{
    name: 'CUSTOM FOLDER NAME',
    id: 'uniqueId2',
    pathToNode: '/folder2',
    parentId: '',
    childrenIds: ['uniqueId3']
  }, <INode> {
    // name: 'folder3',
    id: 'uniqueId3',
    pathToNode: '/folder2/folder3',
    parentId: 'uniqueId2',
    childrenIds: []
  }, <INode> {
    // name: 'folder3',
    id: 'uniqueId4',
    pathToNode: '/folder1/folder4',
    parentId: 'uniqueId1',
    childrenIds: []
  }
];

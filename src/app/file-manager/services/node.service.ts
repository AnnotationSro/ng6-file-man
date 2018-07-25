import {Injectable} from '@angular/core';
import {INode} from '../interfaces/i-node';
import {Observable} from 'rxjs';
import {MTree} from '../models/m-tree';
import {HttpClient} from '@angular/common/http';
import * as ACTIONS from '../reducers/actions.action';
import {Store} from '@ngrx/store';
import {AppStore} from '../reducers/reducer.factory';

@Injectable({
  providedIn: 'root'
})
export class NodeService {
  private _tree: MTree;
  url: string;

  constructor(private http: HttpClient, private store: Store<AppStore>) {
  }

  getNodes(path: string) {
    this.parseNodes(path).subscribe((data: Array<INode>) => {
      for (let i = 0; i < data.length; i++) {
        this.findParent(data[i].parentId).children[data[i].id] = data[i];
      }
    });
  }

  private parseNodes(path: string): Observable<INode[]> {
    return new Observable(observer => {
      this.getNodesFromServer(path).subscribe((data: Array<any>) => {
        observer.next(data.map(node => {
          const originalPath = path.split('_').join('/');

          const cachedNode = this.findParent(originalPath + '/' + node.id);

          return <INode>{
            id: node.id,
            parentId: originalPath,
            isFolder: node.isDir,
            isExpanded: cachedNode ? cachedNode.isExpanded : false,
            pathToNode: originalPath + '/' + node.id,
            name: node.name || node.id,
            children: cachedNode ? cachedNode.children : {}
          };
        }));
        this.store.dispatch({type: ACTIONS.SET_LOADING_STATE, payload: false});
      });
    });
  }

  private getNodesFromServer(path: string) {
    return this.http.get(this.url + path);
  }

  public findParent(parentId: string): INode {
    const ids = parentId.split('/');
    ids.splice(0, 1);

    return ids.length === 0 ? this.tree.nodes : ids.reduce((value, index) => value['children'][index], this.tree.nodes);
  }

  get tree(): MTree {
    return this._tree;
  }

  set tree(value: MTree) {
    this._tree = value;

    if (!this.url) {
      this.url = this.tree.config.baseURL;
    }
  }
}

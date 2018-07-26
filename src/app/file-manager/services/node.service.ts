import {Injectable} from '@angular/core';
import {NodeInterface} from '../interfaces/node.interface';
import {Observable} from 'rxjs';
import {TreeModel} from '../models/tree.model';
import {HttpClient} from '@angular/common/http';
import * as ACTIONS from '../reducers/actions.action';
import {Store} from '@ngrx/store';
import {AppStore} from '../reducers/reducer.factory';

@Injectable({
  providedIn: 'root'
})
export class NodeService {
  public tree: TreeModel;

  constructor(private http: HttpClient, private store: Store<AppStore>) {
  }

  // todo server mi da aj strukturu rodicov a tu nasadim
  public startManagerAt(path: string) {
    this.store.dispatch({type: ACTIONS.SET_PATH, payload: path});
  }

  getNodes(path: string) {
    this.parseNodes(path).subscribe((data: Array<NodeInterface>) => {
      for (let i = 0; i < data.length; i++) {
        this.findParent(data[i].parentId).children[data[i].id] = data[i];
      }
    });
  }

  private parseNodes(path: string): Observable<NodeInterface[]> {
    return new Observable(observer => {
      this.getNodesFromServer(path).subscribe((data: Array<any>) => {
        observer.next(data.map(node => {
          const originalPath = path.split('_').join('/');

          const cachedNode = this.findParent(originalPath + '/' + node.id);

          return <NodeInterface>{
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
    return this.http.get(this.tree.config.baseURL + path);
  }

  public findParent(parentId: string): NodeInterface {
    const ids = parentId.split('/');
    ids.splice(0, 1);

    return ids.length === 0 ? this.tree.nodes : ids.reduce((value, index) => value['children'][index], this.tree.nodes);
  }
}

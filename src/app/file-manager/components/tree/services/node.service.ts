import {Injectable} from '@angular/core';
import {INode} from '../../../interfaces/i-node';
import {Observable} from 'rxjs';
import {MTree} from '../../../models/m-tree';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NodeService {
  private _tree: MTree;

  // todo configurable
  url = 'http://localhost:3000/';

  constructor(private http: HttpClient) {
  }

  getNodes(path: string) {
    this.parseNodes(path).subscribe((data: Array<INode>) => {
      for (let i = 0; i < data.length; i++) {
        this.findMyDaddy(data[i].parentId).children[data[i].id] = data[i];
      }
    });
  }

  private parseNodes(path: string): Observable<INode[]> {
    return new Observable(observer => {
      this.getNodesFromServer(path).subscribe((data: Array<any>) => observer.next(data.map(node => {
          const originalPath = path.split('_').join('/');
          return <INode>{
            id: node.id,
            parentId: originalPath,
            isFolder: node.isDir,
            isExpanded: false,
            pathToNode: originalPath + '/' + node.id,
            name: node.name || node.id,
            children: {}
          };
        })
      ));
    });
  }

  private getNodesFromServer(path: string) {
    return this.http.get(this.url + path);
  }

  private findMyDaddy(parentId: string): INode {
    const ids = parentId.split('/');
    ids.splice(0, 1);

    return ids.length === 0 ? this.tree.nodes : ids.reduce((value, index) => value['children'][index], this.tree.nodes);
  }

  get tree(): MTree {
    return this._tree;
  }

  set tree(value: MTree) {
    this._tree = value;
  }
}

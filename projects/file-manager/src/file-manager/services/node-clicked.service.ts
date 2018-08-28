import {Injectable} from '@angular/core';
import {NodeInterface} from '../interfaces/node.interface';
import {NodeService} from './node.service';
import {TreeModel} from '../models/tree.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {AppStore} from '../reducers/reducer.factory';
import {Store} from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class NodeClickedService {
  public tree: TreeModel;

  constructor(
    public ngxSmartModalService: NgxSmartModalService,
    private nodeService: NodeService,
    private store: Store<AppStore>,
    private http: HttpClient
  ) {
  }

  public startDownload(node: NodeInterface): void {
    const parameters = this.parseParams({path: node.id});
    this.reachServer('download', this.tree.config.api.downloadFile + parameters);
  }

  public initDelete(node: NodeInterface): void {
    this.sideEffectHelper(
      'Delete',
      {path: node.id},
      'delete',
      this.tree.config.api.deleteFile,
      () => this.successWithModalClose()
    );
  }

  public searchForString(input: string): void {
    this.sideEffectHelper(
      'Search',
      {query: input},
      'get',
      this.tree.config.api.searchFiles,
      (res) => this.searchSuccess(input, res)
    );
  }

  public createFolder(currentParent: number, newDirName: string) {
    this.sideEffectHelper(
      'Create Folder',
      {dirName: newDirName, parentPath: currentParent === 0 ? null : currentParent},
      'post',
      this.tree.config.api.createFolder
    );
  }

  public rename(id: number, newName: string) {
    this.sideEffectHelper(
      'Rename',
      {path: id, newName: newName},
      'post',
      this.tree.config.api.renameFile,
      () => this.successWithModalClose()
    );
  }

  private sideEffectHelper(name: string, parameters: {}, httpMethod: string, apiURL: string,
                           successMethod = (a) => this.actionSuccess(a),
                           failMethod = (a, b) => this.actionFailed(a, b)
  ) {
    const params = this.parseParams(parameters);

    this.ngxSmartModalService.getModal('waitModal').open();

    this.reachServer(httpMethod, apiURL + params)
      .subscribe(
        (a) => successMethod(a),
        (err) => failMethod(name, err)
      );
  }

  private reachServer(method: string, apiUrl: string, data: any = {}): Observable<Object> {
    switch (method.toLowerCase()) {
      case 'get':
        return this.http.get(this.tree.config.baseURL + apiUrl);
      case 'post':
        return this.http.post(this.tree.config.baseURL + apiUrl, data);
      case 'delete':
        return this.http.delete(this.tree.config.baseURL + apiUrl);
      case 'download':
        window.open(this.tree.config.baseURL + apiUrl, '_blank');
        return null;
      default:
        console.warn('[NodeClickedService] Incorrect params for this side-effect');
        return null;
    }
  }

  private parseParams(params: {}): string {
    let query = '?';

    Object.keys(params).filter(item => params[item] !== null).map(key => {
      query += key + '=' + params[key] + '&';
    });

    return query.slice(0, -1);
  }

  private successWithModalClose() {
    this.actionSuccess();
    document.getElementById('side-view').classList.remove('selected');
  }

  private searchSuccess(input: string, data: any) {
    const obj = {
      searchString: input,
      response: data
    };

    this.actionSuccess();

    this.ngxSmartModalService.setModalData(obj, 'searchModal', true);
    this.ngxSmartModalService.getModal('searchModal').open();
  }

  private actionSuccess(response: string = '') {
    document.body.classList.remove('dialog-open');

    this.nodeService.refreshCurrentPath();
    this.ngxSmartModalService.getModal('waitModal').close();
  }

  private actionFailed(name: string, error: any) {
    document.body.classList.remove('dialog-open');

    this.ngxSmartModalService.getModal('waitModal').close();
    this.ngxSmartModalService.getModal('errorModal').open();
    console.warn('[NodeClickedService] Action "' + name + '" failed', error);
  }
}

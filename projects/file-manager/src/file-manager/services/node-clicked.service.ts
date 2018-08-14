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
    const parameters = this.parseParams({id: node.id});
    this.reachServer('download', this.tree.config.api.downloadFile + parameters);
  }

  public initDelete(node: NodeInterface): void {
    const parameters = this.parseParams({id: node.id});

    this.ngxSmartModalService.getModal('waitModal').open();

    this.reachServer('delete', this.tree.config.api.deleteFile + parameters)
      .subscribe(
        () => this.deleteSuccess(),
        (err) => this.deleteFailed(err)
      );
  }

  public createFolder(currentParent: number, newDirName: string) {
    const params = this.parseParams({
      dirName: newDirName,
      parentId: currentParent === 0 ? null : currentParent
    });

    this.ngxSmartModalService.getModal('waitModal').open();

    this.reachServer('post', this.tree.config.api.createFolder + params)
      .subscribe(
        () => this.createFolderSuccess(),
        (err) => this.createFolderFailed(err)
      );
  }

  public rename(id: number, newName: string) {
    const params = this.parseParams({
      newName: newName,
      id: id
    });

    this.ngxSmartModalService.getModal('waitModal').open();

    this.reachServer('post', this.tree.config.api.renameFile + params)
      .subscribe(
        () => this.renameSuccess(),
        (err) => this.renameFailed(err)
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

  private deleteSuccess() {
    this.nodeService.refreshCurrentPath();
    this.ngxSmartModalService.getModal('waitModal').close();
    document.getElementById('side-view').classList.remove('selected');
  }

  private deleteFailed(error: any) {
    this.ngxSmartModalService.getModal('waitModal').close();
    this.ngxSmartModalService.getModal('errorModal').open();
    console.warn('[NodeClickedService] Remove failed', error);
  }

  private createFolderSuccess() {
    this.nodeService.refreshCurrentPath();
    this.ngxSmartModalService.getModal('waitModal').close();
  }

  private createFolderFailed(error: any) {
    this.ngxSmartModalService.getModal('waitModal').close();
    this.ngxSmartModalService.getModal('errorModal').open();
    console.warn('[NodeClickedService] Create folder failed', error);
  }

  private renameSuccess() {
    this.nodeService.refreshCurrentPath();
    this.ngxSmartModalService.getModal('waitModal').close();
  }

  private renameFailed(error: any) {
    this.ngxSmartModalService.getModal('waitModal').close();
    this.ngxSmartModalService.getModal('errorModal').open();
    console.warn('[NodeClickedService] Rename failed', error);
  }
}

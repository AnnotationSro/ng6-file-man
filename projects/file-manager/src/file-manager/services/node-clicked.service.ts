import {Injectable} from '@angular/core';
import {NodeInterface} from '../interfaces/node.interface';
import {NodeService} from './node.service';
import {TreeModel} from '../models/tree.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Observable} from 'rxjs';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {first} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NodeClickedService {
  public tree: TreeModel;

  constructor(
    public ngxSmartModalService: NgxSmartModalService,
    private nodeService: NodeService,
    private http: HttpClient
  ) {
  }

  public startDownload(node: NodeInterface): void {
    const parameters = new HttpParams().append('path', node.id + '');
    this.reachServer('download', this.tree.config.api.downloadFile, parameters);
  }

  public initDelete(node: NodeInterface): void {
    this.sideEffectHelper(
      'Delete',
      new HttpParams().append('path', node.id + ''),
      'delete',
      this.tree.config.api.deleteFile,
      () => this.successWithSideViewClose()
    );
  }

  public searchForString(input: string): void {
    this.sideEffectHelper(
      'Search',
      new HttpParams().append('query', input),
      'get',
      this.tree.config.api.searchFiles,
      (res) => this.searchSuccess(input, res)
    );
  }

  public createFolder(currentParent: number, newDirName: string) {
    this.sideEffectHelper(
      'Create Folder',
      (() => {
        let httpParams = new HttpParams().append('dirName', newDirName);
        if (currentParent !== 0) {
          httpParams = httpParams.append('parentPath', currentParent + '');
        }

        console.log(currentParent, httpParams.get('dirName'), httpParams.get('parentPath'));
        return httpParams;
      })(),
      'post',
      this.tree.config.api.createFolder
    );
  }

  public rename(id: number, newName: string) {
    this.sideEffectHelper(
      'Rename',
      new HttpParams().append('path', id + '').append('newName', newName),
      'post',
      this.tree.config.api.renameFile,
      () => this.successWithSideViewClose()
    );
  }

  private sideEffectHelper(name: string, parameters: HttpParams, httpMethod: string, apiURL: string,
                           successMethod = (a) => this.actionSuccess(a),
                           failMethod = (a, b) => this.actionFailed(a, b)
  ) {
    this.ngxSmartModalService.getModal('waitModal').open();

    this.reachServer(httpMethod, apiURL, parameters)
      .subscribe(
        (a) => successMethod(a),
        (err) => failMethod(name, err)
      );
  }

  private reachServer(method: string, apiUrl: string, parameters: HttpParams, data: any = {}): Observable<Object> {
    switch (method.toLowerCase()) {
      case 'get':
        return this.http.get(this.tree.config.baseURL + apiUrl, {params: parameters});
      case 'post':
        return this.http.post(this.tree.config.baseURL + apiUrl, data, {params: parameters});
      case 'delete':
        return this.http.delete(this.tree.config.baseURL + apiUrl, {params: parameters});
      case 'download':
        window.open(this.tree.config.baseURL + apiUrl + '?path=' + parameters.get('path'), '_blank');
        return null;
      default:
        console.warn('[NodeClickedService] Incorrect params for this side-effect');
        return null;
    }
  }

  private successWithSideViewClose() {
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

    const modal = this.ngxSmartModalService.getModal('waitModal');
    modal.onOpenFinished.pipe(first()).subscribe(() => modal.close());
    modal.close();
  }

  private actionFailed(name: string, error: any) {
    document.body.classList.remove('dialog-open');

    this.ngxSmartModalService.getModal('waitModal').close();
    this.ngxSmartModalService.getModal('errorModal').open();
    console.warn('[NodeClickedService] Action "' + name + '" failed', error);
  }
}

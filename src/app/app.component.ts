import {Component} from '@angular/core';
// import {TreeModel, NodeInterface, ConfigInterface, NodeService} from 'ng6-file-man';
import {TreeModel, NodeInterface, ConfigInterface} from '../../projects/file-manager/src/public_api';
import {HttpClient} from '@angular/common/http';
import {HttpParams} from '../../node_modules/@angular/common/http';
import {NodeService} from '../../projects/file-manager/src/file-manager/services/node.service';
import {ParamsInterface} from './interfaces/params.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  tree: TreeModel;
  node: NodeInterface;

  constructor(private http: HttpClient, private nodeService: NodeService) {
    const treeConfig: ConfigInterface = {
      offlineMode: false, // todo implement
      baseURL: 'http://localhost:8080/',
      startingFolder: '', // todo implement
      upload: {
        containsFileTable: false,
        containsFileCount: true
      },
      api: {
        listFile: 'api/file/list',
        uploadFile: 'api/file/upload',
        downloadFile: 'api/file/download',
        deleteFile: 'api/file/remove'
      },
      options: {
        allowFolderDownload: false,
        showFilesInsideTree: false
      }
    };

    this.tree = new TreeModel(treeConfig);
    this.node = this.tree.nodes;
  }

  // noinspection JSUnusedLocalSymbols
  // noinspection JSMethodCanBeStatic
  itemClicked(event: any) {
    switch (event.type) {
      case 'download' :
        return this.download(event.node);
      case 'remove' :
        return this.remove(event.node);
      case 'createFolder' :
        return this.createFolder(event.currentParent, event.newDirName);
      case 'renameSend' :
        return this.rename(event.node.id, event.newName);
      default:
        console.log(event);
    }
  }

  rename(id: number, newName: string) {
    const params: ParamsInterface[] = [{
      key: 'newName',
      value: newName
    }, {
      key: 'id',
      value: id
    }];

    this.http.post(this.tree.config.baseURL + 'api/file/rename' + this.parseParams(params), {})
      .subscribe(res => {
        console.log(res);
        this.nodeService.refreshCurrentPath();
      });
  }

  download(node: NodeInterface) {
    window.open(this.tree.config.baseURL + this.tree.config.api.downloadFile + '?id=' + node.id, '_blank');
  }

  createFolder(currentParent: number, newDirName: string) {
    const params: ParamsInterface[] = [{
      key: 'dirName',
      value: newDirName
    }, {
      key: 'parentId',
      value: currentParent === 0 ? null : currentParent
    }];

    this.http.post(this.tree.config.baseURL + 'api/file/directory' + this.parseParams(params), {})
      .subscribe(res => {
        console.log(res);
        this.nodeService.refreshCurrentPath();
      });
  }

  private parseParams(params: ParamsInterface[]): string {
    let query = '?';

    console.log(params);

    params = params.filter(i => i.value != null);

    for (let i = 0; i < params.length; i++) {
      query += params[i].key + '=' + params[i].value;
      if (i < params.length - 1) {
        query += '&';
      }
    }

    return query;
  }

  remove(node: NodeInterface) {
    if (!confirm('You are going to delete an item! \nAre you sure?'))
      return;

    this.http.delete(
      this.tree.config.baseURL + this.tree.config.api.deleteFile,
      {params: new HttpParams().set('id', node.id.toString())}
    ).subscribe(res => {
      console.log(res);
      this.nodeService.refreshCurrentPath();
    });
    // window.open(this.tree.config.baseURL + this.tree.config.api.deleteFile + '?id=' + node.id, '_blank');
  }
}

import {Component} from '@angular/core';
// import {TreeModel, NodeInterface, ConfigInterface, NodeService} from 'ng6-file-man';
import {TreeModel, NodeInterface, ConfigInterface} from '../../projects/file-manager/src/public_api';
import {HttpClient,HttpParams} from '@angular/common/http';
import {NodeService} from '../../projects/file-manager/src/file-manager/services/node.service';

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
    const params = {
      newName: newName,
      id: id
    };

    this.http.post(this.tree.config.baseURL + 'api/file/rename' + this.parseParams(params), {})
      .subscribe(() => {
        this.nodeService.refreshCurrentPath();
      }, error => {
        console.warn('Oooops, something went wrong!', error);
      });
  }

  download(node: NodeInterface) {
    window.open(this.tree.config.baseURL + this.tree.config.api.downloadFile + '?id=' + node.id, '_blank');
  }

  createFolder(currentParent: number, newDirName: string) {
    const params = {
      dirName: newDirName,
      parentId: currentParent === 0 ? null : currentParent
    };

    this.http.post(this.tree.config.baseURL + 'api/file/directory' + this.parseParams(params), {})
      .subscribe(() => {
        this.nodeService.refreshCurrentPath();
      }, error => {
        console.warn('Oooops, something went wrong!', error);
      });
  }

  private parseParams(params: {}): string {
    let query = '?';

    Object.keys(params).filter(item => params[item] !== null).map(key => {
      query += key + '=' + params[key] + '&';
    });

    console.log(query.slice(0,-1));

    return query.slice(0,-1);
  }

  remove(node: NodeInterface) {
    this.http.delete(
      this.tree.config.baseURL + this.tree.config.api.deleteFile,
      {params: new HttpParams().set('id', node.id.toString())}
    ).subscribe(() => {
      this.nodeService.refreshCurrentPath();
    }, error => {
      console.warn('Oooops, something went wrong!', error);
    });
  }
}

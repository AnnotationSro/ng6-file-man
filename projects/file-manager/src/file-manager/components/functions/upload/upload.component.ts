import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FineUploader} from 'fine-uploader';
import {NodeService} from '../../../services/node.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss', './fine-uploader/fine-uploader.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UploadComponent implements OnInit, AfterViewInit {
  @Input() openDialog;

  @Output() closeDialog = new EventEmitter();
  @Output() createDir = new EventEmitter();

  uploader: FineUploader;
  newFolder = false;
  counter = 0;

  constructor(private http: HttpClient,
              private nodeService: NodeService) {
  }

  ngAfterViewInit() {
    this.uploader = new FineUploader({
      debug: false,
      autoUpload: false,
      maxConnections: 1, // todo configurable
      element: document.getElementById('fine-uploader'),
      template: document.getElementById('fine-uploader-template'),
      request: {
        endpoint: this.nodeService.tree.config.baseURL + this.nodeService.tree.config.api.uploadFile,
        // forceMultipart: false,
        paramsInBody: false,
        params: {
          parentPath: this.getCurrentPath
        }
      },
      retry: {
        enableAuto: false
      },
      callbacks: {
        onSubmitted: () => this.counter++,
        onCancel: () => {
          this.counter < 0 ? console.warn('wtf?') : this.counter--;
        },
        onAllComplete: (succ: any, fail: any) => {
          if (succ.length > 0) {
            this.counter = 0;
            this.nodeService.refreshCurrentPath();
          }
        }
      }
    })
    ;
  }

  ngOnInit() {
  }

  get getCurrentPath() {
    const parentPath = this.nodeService.findNodeByPath(this.nodeService.currentPath).id;
    return parentPath === 0 ? '' : parentPath;
  }

  uploadFiles() {
    this.uploader.uploadStoredFiles();
  }

  createNewFolder(input?: string) {
    if (!this.newFolder) {
      this.newFolder = true;
    } else {
      this.newFolder = false;
      if (input.length > 0) {
        this.createDir.emit(input);
        this.newClickedAction();
      }
    }
  }

  newClickedAction() {
    this.uploader.cancelAll();
    this.closeDialog.emit();
  }
}

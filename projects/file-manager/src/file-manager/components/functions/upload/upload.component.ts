import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FileSystemDirectoryEntry, FileSystemFileEntry, UploadEvent, UploadFile} from 'ngx-file-drop';
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
  @Input() hasTable: boolean;
  @Input() hasFileCount: boolean;
  @Output() closeDialog = new EventEmitter();

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
      element: document.getElementById('fine-uploader'),
      template: document.getElementById('fine-uploader-template'),
      request: {
        endpoint: 'http://localhost:8080/api/file/upload',
        // forceMultipart: false,
        paramsInBody: false,
        // params: {
        //   id: this.getCurrentPathId
        // }
      },
      retry: {
        enableAuto: false
      },
      callbacks: {
        onSubmitted: () => this.counter++,
        onCancel: () => {
          this.counter < 0 ? console.warn('wtf?') : this.counter--;
        }
      }
    })
    ;
  }

  ngOnInit() {
  }

  get getCurrentPathId() {
    const parentId = this.nodeService.findParent(this.nodeService.currentPath).id;
    return parentId === 0 ? null : parentId;
  }

  // todo
  uploadFiles() {
    this.uploader.uploadStoredFiles();
  }

  // todo
  createNewFolder(input?: string) {
    if (!this.newFolder) {
      this.newFolder = true;
    } else {
      this.newFolder = false;
      if (input.length > 0) {
        console.log('vytvor folder s menom: ', input);
        this.newClickedAction();
      }
    }
  }

  newClickedAction() {
    this.closeDialog.emit();
  }
}

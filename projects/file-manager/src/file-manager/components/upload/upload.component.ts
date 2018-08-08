import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FileSystemDirectoryEntry, FileSystemFileEntry, UploadEvent, UploadFile} from 'ngx-file-drop';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UploadComponent implements OnInit {
  @Input() openDialog;
  @Input() hasTable: boolean;
  @Input() hasFileCount: boolean;
  @Output() closeDialog = new EventEmitter();

  public files: UploadFile[] = [];

  // todo use JS Sets to eliminate duplicates
  public droppedFiles: File[] = [];
  newFolder = false;

  constructor() {
  }

  ngOnInit() {
  }

  public dropped(event: UploadEvent) {
    this.files = event.files;
    for (const droppedFile of event.files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          // todo extend File class to contain relativePath (webkitRelativePath is readonly)
          // @ts-ignore
          file.relativePath = droppedFile.relativePath;
          this.droppedFiles.push(file);
          // console.log(droppedFile.relativePath, file);
          /**
           // You could upload it like this:
           const formData = new FormData()
           formData.append('logo', file, relativePath)

           // Headers
           const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })

           this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
           .subscribe(data => {
            // Sanitized logo returned from backend
          })
           **/

        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
        console.log('vytvor folder s menom: ', fileEntry);
      }
    }
  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }

  // todo
  uploadFiles() {
    console.log('upload this.droppedFiles na server');
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
    this.droppedFiles = [];
  }

  addFile(event) {
    this.droppedFiles.push(event.target.files[0]);
  }
}

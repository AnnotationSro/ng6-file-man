import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-upload-button',
  templateUrl: './upload-button.component.html',
  styleUrls: ['./upload-button.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UploadButtonComponent implements OnInit {
  @ViewChild('uploadFile') uploadFile: ElementRef;
  @Output() selectedFile = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  updateFile(event) {
    this.selectedFile.emit(event);
  }

  triggerFalseClick() {
    const el: HTMLElement = this.uploadFile.nativeElement as HTMLElement;
    el.click();
  }

}

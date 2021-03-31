import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-new-folder',
  templateUrl: './new-folder.component.html',
  styleUrls: ['./new-folder.component.scss']
})
export class NewFolderComponent implements OnInit {
  @ViewChild('uploadFolder') uploadFolder: ElementRef;
  @Output() buttonClicked = new EventEmitter();

  buttonText: string;
  inputValue = '';

  constructor(private translateService: TranslateService) {
    this.buttonText = this.translateService.instant('filemanager.close');
  }

  ngOnInit() {
  }

  onClick() {
    const el: HTMLElement = (this.uploadFolder.nativeElement as HTMLElement);
    // @ts-ignore
    this.buttonClicked.emit(el.value);
  }

  onInputChange(event: any) {
    this.inputValue = event.target.value;
    if (this.inputValue.length > 0) {
      this.buttonText = this.translateService.instant('filemanager.confirm').toString();
    } else {
      this.buttonText = this.translateService.instant('filemanager.close').toString();
    }
  }
}

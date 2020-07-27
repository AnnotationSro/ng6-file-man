import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewEncapsulation} from '@angular/core';
import {NodeInterface} from '../../interfaces/node.interface';
import {DownloadModeEnum} from '../../enums/download-mode.enum';

@Component({
  selector: 'app-side-view',
  templateUrl: './side-view.component.html',
  styleUrls: ['./side-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SideViewComponent implements OnInit {
  @Input() sideViewTemplate: TemplateRef<any>;

  @Input() node: NodeInterface;
  @Input() allowFolderDownload: DownloadModeEnum = DownloadModeEnum.DOWNLOAD_DISABLED;

  @Output() clickEvent = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  onClick(event: any, type: string) {
    this.clickEvent.emit({type: type, event: event, node: this.node});
  }

  isDisabled() {
    if (this.allowFolderDownload === DownloadModeEnum.DOWNLOAD_DISABLED) {
      return true;
    } else if (this.allowFolderDownload === DownloadModeEnum.DOWNLOAD_FILES && this.node.isFolder) {
      return true;
    }

    return false;
  }

}

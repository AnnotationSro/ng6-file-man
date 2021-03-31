import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {timer} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-loading-overlay',
  templateUrl: './loading-overlay.component.html',
  styleUrls: ['./loading-overlay.component.scss']
})
export class LoadingOverlayComponent implements OnInit {
  @Input() loadingOverlayTemplate: TemplateRef<any>;
  timeoutMessage: any;

  constructor(private translateService: TranslateService) {

  }


  // todo unsubscribe from 'list' event - now we are only dismissing this component
  ngOnInit() {
    timer(2000).subscribe(() => {
      this.timeoutMessage = this.translateService.instant('filemanager.loading_troubles');
    });
  }
}

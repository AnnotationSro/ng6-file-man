import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {_} from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import {timer} from 'rxjs';

@Component({
  selector: 'app-loading-overlay',
  templateUrl: './loading-overlay.component.html',
  styleUrls: ['./loading-overlay.component.scss']
})
export class LoadingOverlayComponent implements OnInit {
  @Input() loadingOverlayTemplate: TemplateRef<any>;
  timeoutMessage: any;

  // todo unsubscribe from 'list' event - now we are only dismissing this component
  ngOnInit() {
    timer(2000).subscribe(() => {
      this.timeoutMessage = _('Troubles with loading? Click anywhere to cancel loading');
    });
  }
}

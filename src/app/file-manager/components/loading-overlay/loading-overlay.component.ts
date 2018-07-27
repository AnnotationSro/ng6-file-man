import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {timer} from 'rxjs';

@Component({
  selector: 'app-loading-overlay',
  templateUrl: './loading-overlay.component.html',
  styleUrls: ['./loading-overlay.component.css']
})
export class LoadingOverlayComponent implements OnInit {
  @Input() loadingOverlayTemplate: TemplateRef<any>;
  timeoutMessage: string;

  ngOnInit() {
    timer(2000).subscribe(() => {
      this.timeoutMessage = 'Troubles with loading? Klik sem na zrusenie nacitavania.';
    });
  }
}

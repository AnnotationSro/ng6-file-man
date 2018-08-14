import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NgxSmartModalService} from 'ngx-smart-modal';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavigationComponent implements OnInit {

  constructor(
    private ngxSmartModalService: NgxSmartModalService
  ) {
  }

  ngOnInit() {
  }

  onClick(input: string) {
    const obj: Object = {
      searchString: input
    };

    this.ngxSmartModalService.setModalData(obj, 'searchModal');
    this.ngxSmartModalService.getModal('searchModal').open();
  }
}

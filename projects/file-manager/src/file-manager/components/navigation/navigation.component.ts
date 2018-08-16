import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NodeClickedService} from '../../services/node-clicked.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavigationComponent implements OnInit {

  constructor(
    private nodeClickedService: NodeClickedService
  ) {
  }

  ngOnInit() {
  }

  onClick(input: string) {
    this.nodeClickedService.searchForString(input);
  }
}

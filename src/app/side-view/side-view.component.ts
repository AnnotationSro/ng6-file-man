import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {NodeInterface} from '../file-manager/interfaces/node.interface';

@Component({
  selector: 'app-side-view',
  templateUrl: './side-view.component.html',
  styleUrls: ['./side-view.component.scss']
})
export class SideViewComponent implements OnInit {
  @Input() node: NodeInterface;
  @Input() sideViewTemplate: TemplateRef<any>;

  constructor() {
  }

  ngOnInit() {
  }

}

import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewEncapsulation} from '@angular/core';
import {NodeInterface} from '../../interfaces/node.interface';

@Component({
  selector: 'app-side-view',
  templateUrl: './side-view.component.html',
  styleUrls: ['./side-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SideViewComponent implements OnInit {
  @Input() node: NodeInterface;
  @Input() sideViewTemplate: TemplateRef<any>;
  @Output() clickEvent = new EventEmitter();
  @Input() allowFolderDownload = false;

  constructor() {
  }

  ngOnInit() {
  }

  onClick(event: any, type: string) {
    this.clickEvent.emit({type: type, event: event, node: this.node});
  }

}

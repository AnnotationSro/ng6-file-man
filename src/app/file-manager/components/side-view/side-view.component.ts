import {Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {NodeInterface} from '../../interfaces/node.interface';

@Component({
  selector: 'app-side-view',
  templateUrl: './side-view.component.html',
  styleUrls: ['./side-view.component.scss']
})
export class SideViewComponent implements OnInit {
  @Input() node: NodeInterface;
  @Input() sideViewTemplate: TemplateRef<any>;
  @Output() clickEvent = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  onClick(event: any, type: string) {
    this.clickEvent.emit({type: type, event: event, node: this.node});
  }

}

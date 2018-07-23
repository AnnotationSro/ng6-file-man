import {Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {MTree} from '../models/m-tree';

@Component({
  selector: 'app-custom-node',
  templateUrl: './custom-node.component.html',
  styleUrls: ['./custom-node.component.css']
})
export class CustomNodeComponent implements OnInit {
  @ContentChild(TemplateRef) template: TemplateRef<any>;

  @Input() tree: MTree;
  @Output() clickedEvent = new EventEmitter();
  constructor() {
  }

  ngOnInit() {
    console.log(this);
  }

  nodeClickedEvent(originalEvent: any) {
    this.clickedEvent.emit(originalEvent);
  }

}

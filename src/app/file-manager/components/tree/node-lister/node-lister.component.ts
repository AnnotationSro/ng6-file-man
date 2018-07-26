import {Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {NodeInterface} from '../../../interfaces/node.interface';

@Component({
  selector: 'app-node-lister',
  templateUrl: './node-lister.component.html',
  styleUrls: ['./node-lister.component.css']
})
export class NodeListerComponent implements OnInit {
  @ContentChild(TemplateRef) templateRef: TemplateRef<any>;
  @Input() nodes: NodeInterface;
  @Input() showFiles: boolean;
  @Output() nodeClicked = new EventEmitter();

  obj = Object;

  constructor() {
  }

  ngOnInit() {
    // todo has file check
  }

  nodeClickedEvent(event: any) {
    this.nodeClicked.emit(event);
  }
}

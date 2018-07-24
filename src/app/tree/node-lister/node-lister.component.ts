import {Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';

@Component({
  selector: 'app-node-lister',
  templateUrl: './node-lister.component.html',
  styleUrls: ['./node-lister.component.css']
})
export class NodeListerComponent implements OnInit {
  @ContentChild(TemplateRef) templateRef: TemplateRef<any>;
  @Input() nodes;
  @Output() nodeClicked = new EventEmitter();

  obj = Object;

  constructor() {
  }

  ngOnInit() {
  }

  nodeClickedEvent(event: any) {
    this.nodeClicked.emit(event);
  }
}

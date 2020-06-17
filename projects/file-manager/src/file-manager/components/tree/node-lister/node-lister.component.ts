import {Component, ContentChild, Input, OnInit, TemplateRef} from '@angular/core';
import {NodeInterface} from '../../../interfaces/node.interface';

@Component({
  selector: 'app-node-lister',
  templateUrl: './node-lister.component.html',
  styleUrls: ['./node-lister.component.scss']
})
export class NodeListerComponent implements OnInit {
  @ContentChild(TemplateRef, {static: false}) templateRef: TemplateRef<any>;
  @Input() nodes: NodeInterface;
  @Input() showFiles: boolean;

  obj = Object;

  constructor() {
  }

  ngOnInit() {
  }
}

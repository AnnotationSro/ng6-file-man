import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppStore} from '../../reducers/reducer.factory';
import {SET_LOADING_STATE} from '../../reducers/actions.action';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(private store: Store<AppStore>) {
  }

  ngOnInit() {
  }

  clicked() {
    this.store.dispatch({type: SET_LOADING_STATE, payload: false});
  }
}

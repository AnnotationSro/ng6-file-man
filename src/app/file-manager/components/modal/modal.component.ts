import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppStore} from '../../reducers/reducer.factory';
import {SET_LOADING_STATE} from '../../reducers/actions.action';
import {Observable, timer} from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  problem: string;

  constructor(private store: Store<AppStore>) {
  }

  ngOnInit() {
    timer(2000).subscribe(() => {
      this.problem = 'Troubles with loading? Klik sem na zrusenie nacitavania.';
    });
  }

  clicked() {
    // todo get rid of this ugly workaround
    this.store.dispatch({type: SET_LOADING_STATE, payload: false});
  }
}

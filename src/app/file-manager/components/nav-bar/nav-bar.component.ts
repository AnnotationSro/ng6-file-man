import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {IState} from '../../interfaces/i-state';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  currentPath: string[];

  // path$: Observable<string>;

  constructor(
    private store: Store<IState>
  ) {
    // this.path$ = this.store.select('path')
  }

  ngOnInit() {
    this.store.select('path').subscribe((data: string) => {
      this.currentPath = data.split('/');
    });
  }

  onClick(path: string[], index: number) {
    const newPath = path.slice(0, index + 1).join('/');
    this.store.dispatch({type: 'SET_PATH', payload: newPath});
  }

}

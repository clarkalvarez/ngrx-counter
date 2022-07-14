import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { changeName, customIncrement } from '../state/counter.actions';
import { getName } from '../state/counter.selectors';
import { CounterState } from '../state/counter.state';

@Component({
  selector: 'app-custom-counter-input',
  templateUrl: './custom-counter-input.component.html',
  styleUrls: ['./custom-counter-input.component.scss']
})
export class CustomCounterInputComponent implements OnInit {
  value: number;
  name$: Observable<string>;
  // name: string; if using subscribe without async in html
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.name$ =  this.store.select(getName)
    // this.store.select(getName).subscribe(name => {
    //   this.name = name
    // }) if using subscribe without async in html

  }

  onAdd() {
    this.store.dispatch(customIncrement({count: +this.value}))
  }

  changeName() {
    this.store.dispatch(changeName())

  }

}

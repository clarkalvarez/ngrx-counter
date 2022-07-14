import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { getCounter } from '../state/counter.selectors';
import { CounterState } from '../state/counter.state';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.scss']
})
export class CounterOutputComponent implements OnInit { 
  counter: number
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void { 
    this.store.select(getCounter).subscribe(counter => {
      this.counter = counter
    })
  }

}

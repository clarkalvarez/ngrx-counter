import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from './store/app.state';
import { getErrorMessage, getLoading } from './store/Shared/shared.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'counter';
  showLoading: Observable<boolean>
  showError: Observable<string>

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
      this.showLoading = this.store.select(getLoading)
      this.showError = this.store.select(getErrorMessage)
  }
}

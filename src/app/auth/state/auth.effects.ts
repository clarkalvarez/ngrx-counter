import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, exhaustMap, map, of, Subject } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { AppState } from "src/app/store/app.state";
import { setErrorMessage, setLoadingSpinner } from "src/app/store/Shared/shared.actions";
import { loginStart, loginSuccess } from "./auth.actions";

@Injectable()
export class AuthEffects {
    login$: any
    constructor(private actions$: Actions, private authService: AuthService, private store: Store<AppState>) {
        this.login$ = createEffect(() => {
            return this.actions$.pipe(
            ofType(loginStart),
            exhaustMap((action) => {
                return this.authService.login(action.email, action.password).pipe(
                    map(data => {
                        this.store.dispatch(setLoadingSpinner({status: false}))
                        this.store.dispatch(setErrorMessage({errorMessage: ''}))
                        const user = this.authService.formatUser(data)
                        return loginSuccess({user})
                    }),
                    catchError(err => {
                        this.store.dispatch(setLoadingSpinner({status: false}))
                        const errorMessage = this.authService.getErrorMessage(err.error.error.message)
                        return of(setErrorMessage({ errorMessage }))
                    })
                )
            }))
        }); 
    }
}
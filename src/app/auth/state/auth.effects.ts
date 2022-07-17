import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, exhaustMap, map, mergeMap, of, Subject, tap } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { AppState } from "src/app/store/app.state";
import { setErrorMessage, setLoadingSpinner } from "src/app/store/Shared/shared.actions";
import { autoLogin, loginStart, loginSuccess, signupStart, signupSuccess } from "./auth.actions";

@Injectable()
export class AuthEffects {
    constructor(private actions$: Actions, private authService: AuthService, private store: Store<AppState>, private router: Router) {} 
    login$ = createEffect(() => {
        return this.actions$.pipe(
        ofType(loginStart),
        exhaustMap((action) => {
            return this.authService.login(action.email, action.password).pipe(
                map(data => {
                    this.store.dispatch(setLoadingSpinner({status: false})) 
                    this.store.dispatch(setErrorMessage({errorMessage: ''}))
                    const user = this.authService.formatUser(data)
                    this.authService.setUserInLocalStorage(user)
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

    loginRedirect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(...[loginSuccess, signupSuccess]),
            tap(() => {
                this.store.dispatch(setErrorMessage({errorMessage: ''}))
                this.router.navigate(['/'])
            })
        )
    }, {dispatch:false})

    signup$ = createEffect(() => {
        return this.actions$.pipe(
        ofType(signupStart),
        exhaustMap((action) => {
            return this.authService.signup(action.email, action.password).pipe(
                map(data => {
                    this.store.dispatch(setLoadingSpinner({status: false})) 
                    const user = this.authService.formatUser(data)
                    return signupSuccess({user})
                }),
                catchError(err => {
                    this.store.dispatch(setLoadingSpinner({status: false}))
                    const errorMessage = this.authService.getErrorMessage(err.error.error.message)
                    return of(setErrorMessage({ errorMessage }))
                })
            )
        }))
    }); 

    autoLogin$ = createEffect(() => {
        return this.actions$.pipe(
        ofType(autoLogin),
        map(() => { 
            const user = this.authService.getUserInLocalStorage()
            console.log(user)
        }))
    }, {dispatch: false}); 
}
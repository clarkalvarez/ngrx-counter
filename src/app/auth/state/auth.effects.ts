import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, exhaustMap, map, mergeMap, of, Subject, switchMap, tap } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { AppState } from "src/app/store/app.state";
import { setErrorMessage, setLoadingSpinner } from "src/app/store/Shared/shared.actions";
import { autoLogin, autoLogout, loginStart, loginSuccess, signupStart, signupSuccess } from "./auth.actions";
import { User } from "./model/user.model";

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
                    return loginSuccess({user, redirect: true})
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
            tap((action) => {
                this.store.dispatch(setErrorMessage({errorMessage: ''}))
                if(action.redirect) {
                    this.router.navigate(['/'])
                }
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
                    return signupSuccess({user, redirect: true})
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
            exhaustMap(() => { 
                const user = this.authService.getUserInLocalStorage()
                return of(loginSuccess({ user, redirect: false }))
            }))
    }); 

    autoLogout$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(autoLogout),
            map(() => { 
                this.authService.logout()
                this.router.navigate(['auth'])
            }))
    }, {dispatch: false}); 
}
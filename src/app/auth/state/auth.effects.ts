import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map, Subject } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { loginStart, loginSuccess } from "./auth.actions";

@Injectable()
export class AuthEffects {
    login$: any
    constructor(private actions$: Actions, private authService: AuthService) {
        this.login$ = createEffect(() => {
            return this.actions$.pipe(
            ofType(loginStart),
            exhaustMap((action) => {
                return this.authService.login(action.email, action.password).pipe(
                    map(data => {
                        const user = this.authService.formatUser(data)
                        return loginSuccess({user})
                    })
                )
            }))
        }); 
    }
}
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthResponseData } from "../auth/state/model/authResponseData.model";
import { User } from "../auth/state/model/user.model";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient) { }

    login(email: string, password: string): Observable<AuthResponseData> { 
        return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIREBASE_API_KEY}`, {email, password, returnSecureToken: true})
    }


    signup(email: string, password: string): Observable<AuthResponseData> { 
        return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.FIREBASE_API_KEY}`, {email, password, returnSecureToken: true})
    }

    formatUser(data: AuthResponseData) {
        const expirationDate = new Date(new Date().getTime() + +data.expiresIn * 1000)
        const user = new User(data.email, data.idToken, data.localId, expirationDate)
        return user
    }

    getErrorMessage(message: string) {
        switch(message) {
            case 'EMAIL_NOT_FOUND':
                return 'Email was not found';
            case 'INVALID_PASSWORD':
                return 'Invalid password';
            case 'EMAIL_EXISTS':
                return 'Email already exists';
            default:
                return 'Unknown error occured. Please try again'
        }
    }
} 
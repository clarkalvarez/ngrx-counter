import { Auth } from "./auth.model";

export interface AuthState {
    auth: Auth[]
} 

export const initialState: AuthState = {
    auth: [ 
    ]
}
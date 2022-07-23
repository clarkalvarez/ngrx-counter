import { routerReducer, RouterReducerState } from "@ngrx/router-store";
import { authReducer } from "../auth/state/auth.reducer";
import { AUTH_STATE_NAME } from "../auth/state/auth.selectors";
import { AuthState } from "../auth/state/auth.state";
import { counterReducer } from "../counter/state/counter.reducer";
import { CounterState } from "../counter/state/counter.state";
import { postsReducer } from "../posts/state/posts.reducer";
import { PostsState } from "../posts/state/posts.state";
import { sharedReducer } from "./Shared/shared.reducer";
import { SHARED_STATE_NAME } from "./Shared/shared.selectors";
import { SharedState } from "./Shared/shared.state";

export interface AppState {
    [SHARED_STATE_NAME]: SharedState;
    [AUTH_STATE_NAME]: AuthState;
    router: RouterReducerState
}

export const appReducer = {
    [SHARED_STATE_NAME]: sharedReducer,
    [AUTH_STATE_NAME]: authReducer,
    router: routerReducer
}
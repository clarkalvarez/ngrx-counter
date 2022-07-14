import { counterReducer } from "../counter/state/counter.reducer";
import { CounterState } from "../counter/state/counter.state";
import { postsReducer } from "../posts/state/posts.reducer";
import { PostsState } from "../posts/state/posts.state";
import { sharedReducer } from "./Shared/shared.reducer";
import { SHARED_STATE_NAME } from "./Shared/shared.selectors";
import { SharedState } from "./Shared/shared.state";

export interface AppState {
    [SHARED_STATE_NAME]: SharedState;
}

export const appReducer = {
    [SHARED_STATE_NAME]: sharedReducer,
}
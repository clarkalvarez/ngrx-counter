import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RouterStateUrl } from "src/app/router/custom-serializer";
import { getCurrentRoute } from "src/app/router/router.selector";
import {postsAdapter, PostsState} from './posts.state'

export const POST_STATE_NAME = 'posts';

const getPostsState = createFeatureSelector<PostsState>(POST_STATE_NAME);
export const postsSelector = postsAdapter.getSelectors()

export const getPosts = createSelector(getPostsState, postsSelector.selectAll) 
export const getPostEntities = createSelector(
    getPostsState,
    postsSelector.selectEntities
)
export const getPostById = createSelector(getPostEntities, getCurrentRoute, (posts: any, route: RouterStateUrl) => {
    return posts ? posts[route.params['id']] : null
})  

export const deletePost = createSelector(getPostsState, (state: any, props: any) => {
    return state.posts.find((post: any) => post.id === props.id)
}) 
 
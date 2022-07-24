import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RouterStateUrl } from "src/app/router/custom-serializer";
import { getCurrentRoute } from "src/app/router/router.selector";
import {PostsState} from './posts.state'

export const POST_STATE_NAME = 'posts';

const getPostsState = createFeatureSelector<PostsState>(POST_STATE_NAME);

export const getPosts = createSelector(getPostsState, state => {
    return state.posts
}) 

export const getPostById = createSelector(getPostsState, getCurrentRoute, (state: any, route: RouterStateUrl) => {
    return state.posts ? state.posts.find((post:any) => post.id === route.params['id']) : null
})  

export const deletePost = createSelector(getPostsState, (state: any, props: any) => {
    return state.posts.find((post: any) => post.id === props.id)
}) 
import { Injectable } from "@angular/core";
import { Router, ROUTER_INITIALIZER } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Update } from "@ngrx/entity";
import { RouterNavigatedAction, routerNavigationAction, ROUTER_NAVIGATED, ROUTER_NAVIGATION } from "@ngrx/router-store";
import { Store } from "@ngrx/store";
import { catchError, exhaustMap, filter, map, mergeMap, of, Subject, switchMap, tap } from "rxjs";
import { PostService } from "src/app/services/post.service";
import { AppState } from "src/app/store/app.state";
import { setErrorMessage, setLoadingSpinner } from "src/app/store/Shared/shared.actions";
import { addPost, addPostSuccess, deletePost, deletePostSuccess, loadPosts, loadPostsSuccess, updatePost, updatePostSuccess } from "./posts.actions";
import { Post } from './posts.model';

@Injectable()
export class PostEffects {
    constructor(private actions$: Actions, private postService: PostService, private store: Store<AppState>, private router: Router) {} 

    loadPosts$ = createEffect(
        () => {
        return this.actions$.pipe(
            ofType(loadPosts), 
            mergeMap((action) => {
                return this.postService.getPosts().pipe(
                    map((posts) => {
                        return loadPostsSuccess({posts})
                    })
                );
            })
        )
    })

    addPost$ = createEffect(
        () => {
        return this.actions$.pipe(
            ofType(addPost), 
            mergeMap((action) => {
                return this.postService.addPosts(action.post).pipe(
                    map((data) => {
                        const post = {...action.post, id: data.name}
                        return addPostSuccess({post})
                    })
                );
            })
        )
    })

    updatePost$ = createEffect(
        () => {
        return this.actions$.pipe(
            ofType(updatePost), 
            switchMap((action) => {
                return this.postService.updatePost(action.post).pipe(
                    map((data) => { 
                        const updatedPost: Update<Post> = {
                            id: action.post.id,
                            changes: {
                                ...action.post
                            }
                        }
                        return updatePostSuccess({post: updatedPost})
                    })
                );
            })
        )
    })

    deletePost$ = createEffect(
        () => {
        return this.actions$.pipe(
            ofType(deletePost), 
            switchMap((action) => {
                return this.postService.deletePost(action.id).pipe(
                    map((data) => { 
                        return deletePostSuccess({id: action.id})
                    })
                );
            })
        )
    })

    getSinglePost$ = createEffect(
        () => {
        return this.actions$.pipe(
            ofType(ROUTER_NAVIGATION), 
            map((r: any) => {
                return r.payload.routerState['params']['id']
            }),
            switchMap((id) => { 
                return this.postService.getPostById(id).pipe(
                    map((post) => {
                        const postData = [{ ...post, id}]
                        return loadPostsSuccess({posts: postData})
                    })
                )
            })
        )
    })
}
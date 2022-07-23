import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { autoLogout } from "../auth/state/auth.actions";
import { AuthResponseData } from "../auth/state/model/authResponseData.model";
import { User } from "../auth/state/model/user.model";
import { Post } from "../posts/state/posts.model";
import { AppState } from "../store/app.state";

@Injectable({
    providedIn: 'root'
})
export class PostService {
    constructor(private http: HttpClient, private store: Store<AppState>) { }

    getPosts(): Observable<Post[]> {
        return this.http
        .get<Post[]>(`https://ngrx-application-85782-default-rtdb.asia-southeast1.firebasedatabase.app/ngrxposts.json`)
        .pipe(
            map((data) => {
                const posts: Post[] = [];
                for(let key in data) {
                    posts.push({...data[key], id:key});
                }
                return posts
            })
        )
    }

    addPosts(post: Post): Observable<{name: string}>  {
        return this.http
        .post<{name: string}>(`https://ngrx-application-85782-default-rtdb.asia-southeast1.firebasedatabase.app/ngrxposts.json`, post)
    }

    updatePost(post: Post)  {
        const postData = {[post.id]: {title: post.title, description: post.description}}
        return this.http
        .patch(`https://ngrx-application-85782-default-rtdb.asia-southeast1.firebasedatabase.app/ngrxposts.json`, postData)
    }

    deletePost(id: string) { 
        return this.http
        .delete(`https://ngrx-application-85782-default-rtdb.asia-southeast1.firebasedatabase.app/ngrxposts/${id}.json`)
    }
} 
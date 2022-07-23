import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../store/app.state';
import { deletePost, loadPosts } from '../state/posts.actions';
import { Post } from '../state/posts.model';
import { getPosts } from '../state/posts.selectors';
import { PostsState } from '../state/posts.state';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {
  posts$: Observable<Post[]>
  constructor(private store: Store<PostsState>) { }

  ngOnInit(): void {
    this.posts$ = this.store.select(getPosts);
    this.store.dispatch(loadPosts())
  }

  onDeletePost(id: string) {
    if(confirm("Are you sure you want to delete?")) {
      this.store.dispatch(deletePost({id}))
    }
  }

}

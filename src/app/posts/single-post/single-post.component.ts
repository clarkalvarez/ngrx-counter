import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from '../state/posts.model';
import { getPostById } from '../state/posts.selectors';
import { PostsState } from '../state/posts.state';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {
  post: Observable<Post>
  constructor(private store: Store<PostsState>) { }

  ngOnInit(): void {
    this.post = this.store.select(getPostById)
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { addPost } from '../state/posts.actions';
import { Post } from '../state/posts.model';
import { PostsState } from '../state/posts.state';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  postForm: FormGroup

  constructor(private store: Store<PostsState>) { }

  ngOnInit(): void {
    this.postForm = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(10)]),
    })
  }

  onAddPost() {
    if(!this.postForm.valid) {
      return
    }
    console.log(this.postForm.value)
    const post: Post = {
      title: this.postForm.value.title,
      description: this.postForm.value.description
    }
    this.store.dispatch(addPost({post}))
  }

  showDescriptionErrors() {
    const descriptionForm = this.postForm.get('description')
    if(descriptionForm?.touched && !descriptionForm.valid) {
      if(descriptionForm?.errors?.['required']) {
        return 'Description is required'
      }

      if(descriptionForm?.errors?.['minlength']) {
        return 'Description should be minimum of 10 characters'
      }
    }
    return
  }
}

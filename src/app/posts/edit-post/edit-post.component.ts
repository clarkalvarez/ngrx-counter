import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { updatePost } from '../state/posts.actions';
import { Post } from '../state/posts.model';
import { getPostById } from '../state/posts.selectors';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit, OnDestroy {
  post: Post;
  postForm: FormGroup 
  postSubscription: Subscription

  constructor(private store: Store<AppState>, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id')
      this.postSubscription = this.store.select(getPostById, {id}).subscribe(data => {
        this.post = data
        this.createForm();
      }) 
    })
  }

  ngOnDestroy(): void {
    if(this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
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

  onUpdatePost() {
    if(!this.postForm.valid) {
      return
    } 
    const post: Post = {
      id: this.post.id,
      title: this.postForm.value.title,
      description: this.postForm.value.description
    }
    this.store.dispatch(updatePost({post}));
    this.router.navigate(['posts']);
    
  }

  createForm() {
    this.postForm = new FormGroup({
      title: new FormControl(this.post.title, [Validators.required, Validators.minLength(6)]),
      description: new FormControl(this.post.description, [Validators.required, Validators.minLength(10)]),
    });
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { PostsListComponent } from './posts-list/posts-list.component';
import { AddPostComponent } from './add-post/add-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import {postsReducer} from './state/posts.reducer'
import { StoreModule } from '@ngrx/store';
import { POST_STATE_NAME } from './state/posts.selectors';
import { EffectsModule } from '@ngrx/effects';
import { PostEffects } from './state/posts.effects';


const routes: Routes =[
  {
    path: '',
    component: PostsListComponent,
    children: [
      {path: 'add', component: AddPostComponent},
      {path: 'edit/:id', component: EditPostComponent}
    ]
  }
]

@NgModule({
  declarations: [ 
    PostsListComponent,
    AddPostComponent,
    EditPostComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([PostEffects]),
    StoreModule.forFeature(POST_STATE_NAME,
    postsReducer)
  ]
})
export class PostsModule { }

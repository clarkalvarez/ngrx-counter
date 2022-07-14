import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component'; 
import { StoreModule } from '@ngrx/store';   
import { EffectsModule } from '@ngrx/effects';   
import { HomeComponent } from './home/home.component'; 
import { HeaderComponent } from './shared/components/header/header.component'; 
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment'; 
import {HttpClientModule} from '@angular/common/http'
import { AuthEffects } from './auth/state/auth.effects';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';
import { appReducer } from './store/app.state';

@NgModule({
  declarations: [
    AppComponent, 
    HomeComponent,
    HeaderComponent,
    LoadingSpinnerComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    StoreModule.forRoot(appReducer),
    StoreDevtoolsModule.instrument({ 
      logOnly:environment.production
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

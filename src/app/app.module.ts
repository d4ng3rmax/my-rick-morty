import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchCharacterComponent } from './components/search-character/search-character.component';
import { HomeComponent } from './pages/home/home.component';
import { FavoritesListComponent } from './components/favorites-list/favorites-list.component';
import { HeaderComponent } from './components/header/header.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    AppComponent,
    FavoritesListComponent,
    HeaderComponent,
    HomeComponent,
    SearchCharacterComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    InfiniteScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

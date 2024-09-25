import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SearchCharacterComponent } from './search-character.component';

@NgModule({
  declarations: [SearchCharacterComponent],
  imports: [
    CommonModule,
    FormsModule,
    InfiniteScrollModule
  ],
  exports: [SearchCharacterComponent]
})
export class SearchCharacterModule { }

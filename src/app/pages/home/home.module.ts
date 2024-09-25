import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { SearchCharacterModule } from '../../components/search-character/search-character.module';

const routes: Routes = [
  { path: '', component: HomeComponent }
];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    SearchCharacterModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }

import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  favoritesCount: number = 0;

  constructor(private favoritesService: FavoritesService) { }

  ngOnInit() {
    this.favoritesService.getFavoritesCount().subscribe((count: number) => {
      this.favoritesCount = count;
    });
  }
}

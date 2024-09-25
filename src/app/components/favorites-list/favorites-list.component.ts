import { Component, OnInit } from '@angular/core';
import { Icons } from '@icons/icons';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.scss']
})
export class FavoritesListComponent implements OnInit {
  favorites: any[] = [];
  favoriteIconFilled = Icons.heartSolid;

  constructor(private favoritesService: FavoritesService) { }

  ngOnInit() {
    this.favoritesService.favorites$.subscribe(favorites => {
      this.favorites = favorites;
    });
  }

  removeFavorite(characterId: number) {
    this.favoritesService.removeFavorite(characterId);
  }
}

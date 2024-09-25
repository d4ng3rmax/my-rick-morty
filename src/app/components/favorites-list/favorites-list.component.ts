import { Component, OnInit } from '@angular/core';
import { Icons } from '@icons/icons'; // Certifique-se de que o caminho está correto
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.scss']
})
export class FavoritesListComponent implements OnInit {
  favorites: any[] = [];
  favoriteIconFilled = Icons.heartSolid; // Adicione o ícone preenchido aqui

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

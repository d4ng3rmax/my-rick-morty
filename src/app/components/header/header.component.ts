import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../../services/favorites.service'; // Ajuste o caminho conforme sua estrutura

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  favoritesCount: number = 0;
  pathIcons: string = 'assets/icons';

  constructor(private favoritesService: FavoritesService) { }

  ngOnInit(): void {
    this.favoritesService.getFavoritesCount().subscribe(count => {
      this.favoritesCount = count;
    });
  }
}

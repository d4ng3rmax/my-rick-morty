import { Component, OnInit } from '@angular/core';
import { RickandmortyService } from '../../services/rickandmorty.service';
import { FavoritesService } from '../../services/favorites.service';
import { Icons } from '@icons/icons';

declare var bootstrap: any;

@Component({
  selector: 'app-search-character',
  templateUrl: './search-character.component.html',
  styleUrls: ['./search-character.component.scss']
})
export class SearchCharacterComponent {
  characters: any[] = [];
  currentPage: number = 1;
  isLoading: boolean = false;
  isSearching: boolean = false;
  errorMessage: string = '';
  favorites: any[] = [];
  searchTerm: string = '';
  favoriteIcon = Icons.heartRegular;
  favoriteIconFilled = Icons.heartSolid;

  constructor(
    private rickandmortyService: RickandmortyService,
    private favoritesService: FavoritesService
  ) {
    this.favoritesService.favorites$.subscribe(favorites => {
      this.favorites = favorites;
    });
  }

  ngOnInit() {
    this.loadCharacters();
  }

  addFavorite(character: any) {
    if (this.isFavorited(character)) {
      this.favoritesService.removeFavorite(character.id);
    } else {
      this.favoritesService.addFavorite(character);
    }
  }

  getAllCharacters() {
    this.rickandmortyService.getAllCharacters().subscribe({
      next: (characters) => {
        this.characters = characters;
      },
      error: () => {
        this.characters = [];
        this.errorMessage = 'Erro ao carregar personagens.';
      }
    });
  }

  isFavorited(character: any): boolean {
    return this.favorites.some(fav => fav.id === character.id);
  }

  loadCharacters() {
    this.isLoading = true;
    this.rickandmortyService.getCharactersByPage(this.currentPage).subscribe({
      next: (newCharacters: any[]) => {
        this.characters = [...this.characters, ...newCharacters];
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Erro ao carregar personagens.';
        this.isLoading = false;
      }
    });
  }

  onScroll() {
    if (!this.isLoading) {
      this.isLoading = true;
      if (this.isSearching) {
        this.currentPage++;
        this.rickandmortyService.getCharactersByName(this.searchTerm, this.currentPage).subscribe({
          next: (newCharacters) => {
            if (newCharacters.length) {
              this.characters = [...this.characters, ...newCharacters];
            } else {
              this.errorMessage = 'Não existem mais personagens para carregar.';
            }
            this.isLoading = false;
          },
          error: () => {
            console.log('Não existem mais personagens.');
            this.isLoading = false;
          }
        });
      } else {
        this.currentPage++;
        this.loadCharacters();
      }
    }
  }

  onSearch() {
    if (this.searchTerm.trim() === '') {
      const modalElement = document.getElementById('emptySearchModal');
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    } else {
      this.searchCharacters();
    }
  }

  searchCharacters() {
    if (this.searchTerm.trim() !== '') {
      this.currentPage = 1;
      this.characters = [];
      this.isLoading = true;
      this.isSearching = true;

      this.rickandmortyService.getCharactersByName(this.searchTerm, this.currentPage).subscribe({
        next: (characters) => {
          this.characters = characters;
          this.isLoading = false;
          this.errorMessage = characters.length ? '' : 'Nenhum personagem encontrado.';
        },
        error: () => {
          this.characters = [];
          this.errorMessage = 'Personagem não encontrado.';
          this.isLoading = false;
        },
      });
    } else {
      this.isSearching = false;
      this.loadCharacters();
    }
  }
}

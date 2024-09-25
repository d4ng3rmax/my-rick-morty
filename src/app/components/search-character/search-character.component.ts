import { Component, OnInit } from '@angular/core';
import { RickandmortyService } from '../../services/rickandmorty.service';
import { FavoritesService } from '../../services/favorites.service';
import { Icons } from '@icons/icons';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

declare var bootstrap: any;

@Component({
  selector: 'app-search-character',
  templateUrl: './search-character.component.html',
  styleUrls: ['./search-character.component.scss']
})
export class SearchCharacterComponent implements OnInit {
  characters: any[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  isLoading: boolean = false;
  isSearching: boolean = false;
  searchCompleted: boolean = false;
  errorMessage: string = '';
  favorites: any[] = [];
  searchTerm: string = '';
  favoriteIcon = Icons.heartRegular;
  favoriteIconFilled = Icons.heartSolid;
  searchTermChanged: Subject<string> = new Subject<string>();

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

    this.searchTermChanged.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => {
        this.isLoading = true;
        this.currentPage = 1;
        this.searchCompleted = false;
        return this.rickandmortyService.getCharactersByName(term, this.currentPage);
      })
    ).subscribe({
      next: (response) => {
        this.characters = response.results;
        this.totalPages = response.info.pages;
        this.isLoading = false;
        this.errorMessage = this.characters.length ? '' : 'Nenhum personagem encontrado.';
      },
      error: () => {
        this.characters = [];
        this.errorMessage = 'Personagem não encontrado.';
        this.isLoading = false;
      }
    });
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
      next: (response) => {
        this.characters = response.results;
        this.totalPages = response.info.pages;
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
      next: (response) => {
        this.characters = [...this.characters, ...response.results];
        this.totalPages = response.info.pages;
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
      if (this.isSearching) {
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
          this.isLoading = true;

          this.rickandmortyService.getCharactersByName(this.searchTerm, this.currentPage).subscribe({
            next: (response) => {
              if (response.results.length) {
                this.characters = [...this.characters, ...response.results];
              }
              this.isLoading = false;
            },
            error: () => {
              this.errorMessage = 'Erro ao carregar mais personagens da busca.';
              this.isLoading = false;
            }
          });
        } else {
          this.searchCompleted = true;
          this.isLoading = false;
        }
      } else {
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
          this.loadCharacters();
        }
      }
    }
  }

  onSearch() {
    if (this.searchTerm.trim() === '') {
      const modalElement = document.getElementById('emptySearchModal');
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    } else {
      this.searchTermChanged.next(this.searchTerm);
    }
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private favoritesSubject = new BehaviorSubject<any[]>(this.getFavoritesFromLocalStorage());
  favorites$: Observable<any[]> = this.favoritesSubject.asObservable();

  addFavorite(character: any) {
    const currentFavorites = this.favoritesSubject.getValue();
    if (!currentFavorites.some(fav => fav.id === character.id)) {
      const updatedFavorites = [...currentFavorites, character];
      this.favoritesSubject.next(updatedFavorites);
      this.saveFavoritesToLocalStorage(updatedFavorites);
    }
  }

  removeFavorite(characterId: number) {
    const updatedFavorites = this.favoritesSubject
      .getValue()
      .filter(fav => fav.id !== characterId);
    this.favoritesSubject.next(updatedFavorites);
    this.saveFavoritesToLocalStorage(updatedFavorites);
  }

  private getFavoritesFromLocalStorage(): any[] {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
  }

  private saveFavoritesToLocalStorage(favorites: any[]): void {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  getFavoritesCount(): Observable<number> {
    return this.favorites$.pipe(map(favorites => favorites.length));
  }
}

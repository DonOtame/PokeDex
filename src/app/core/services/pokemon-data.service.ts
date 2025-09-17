import { inject, Injectable, signal } from '@angular/core';
import { PokemonData, PokemonFlat, PokemonURLResponse } from '@core/models';
import { PokemonApiService } from './pokemon-api.service';

@Injectable({
  providedIn: 'root',
})
export class PokemonDataService {
  private pokemonApi = inject(PokemonApiService);

  public pokemons = signal<PokemonFlat[]>([]);
  public totalRecords = signal<number>(0);
  private pokemonCache = new Map<string, PokemonURLResponse>();

  async getPokemons(
    limit: number,
    offset: number,
    sortField: keyof PokemonFlat,
    sortOrder: string
  ) {
    const response = await this.pokemonApi.getPokemons(limit, offset);

    const detailedPokemons = await Promise.all(
      response.results.map((p) => this.getPokemonByUrl(p.url))
    );

    let flatPokemons = detailedPokemons.map(this.toFlatPokemon);

    flatPokemons = flatPokemons.sort((a, b) => {
      const dir = sortOrder === 'asc' ? 1 : -1;
      return a[sortField] > b[sortField] ? dir : -dir;
    });

    this.pokemons.set(flatPokemons);
    this.totalRecords.set(response.count);
    return flatPokemons;
  }

  async getPokemonByUrl(url: string) {
    if (this.pokemonCache.has(url)) {
      return this.pokemonCache.get(url)!;
    }

    const details = await this.pokemonApi.getPokemonByUrl(url);
    this.pokemonCache.set(url, details);
    return details;
  }

  private toFlatPokemon(p: PokemonURLResponse): PokemonFlat {
    return {
      id: p.id,
      name: p.name,
      types: p.types.map((t) => t.type.name),
      baseExp: p.base_experience,
      attack: p.stats.find((s) => s.stat.name === 'attack')?.base_stat ?? 0,
      defense: p.stats.find((s) => s.stat.name === 'defense')?.base_stat ?? 0,
      speed: p.stats.find((s) => s.stat.name === 'speed')?.base_stat ?? 0,
      sprite: p.sprites.front_default,
    };
  }
}

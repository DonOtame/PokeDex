import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { PokemonFilters, PokemonFlat } from '@core/models';
import { PokemonDataService } from '@core/services';
import { PokemonFiltersComponent } from '@shared/components/pokemon-filters/pokemon-filters.component';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';

@Component({
  selector: 'pokemon-search-table',
  imports: [PokemonFiltersComponent, TableModule],
  templateUrl: './pokemon-search-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonSearchTableComponent {
  private pokemonData = inject(PokemonDataService);

  pokemons = this.pokemonData.pokemons;
  totalRecords = this.pokemonData.totalRecords;
  rows = 10;

  async loadPokemons(event: TableLazyLoadEvent) {
    const offset = event.first ?? 0;
    const limit = event.rows ?? this.rows;

    const sortField = (event.sortField ?? 'name') as keyof PokemonFlat;
    const sortOrder: 'asc' | 'desc' = event.sortOrder === 1 ? 'asc' : 'desc';

    await this.pokemonData.getPokemons(limit, offset, sortField, sortOrder);
  }

  serchPokemon(filters: PokemonFilters) {}
}

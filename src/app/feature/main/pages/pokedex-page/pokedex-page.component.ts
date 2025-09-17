import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { PokemonFiltersComponent } from '@shared/components/pokemon-filters/pokemon-filters.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { PokemonSearchTableComponent } from '@feature/main/components/pokemon-search-table/pokemon-search-table.component';

@Component({
  selector: 'app-pokedex-page',
  imports: [PokemonFiltersComponent, DialogModule, ButtonModule, PokemonSearchTableComponent],
  templateUrl: './pokedex-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokedexPageComponent {
  display = signal<boolean>(false);

  showTable() {
    this.display.set(true);
  }
}

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Pokemon } from '@core/models';
import { CardModule } from 'primeng/card';
import { PokemonTypesComponent } from '../pokemon types/pokemon types.component';
import { DecimetersToMetersPipe, GenerationPipe } from '@shared/pipes';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'pokemon-card',
  imports: [
    CardModule,
    CommonModule,
    PokemonTypesComponent,
    GenerationPipe,
    TranslateModule,
    DecimetersToMetersPipe,
  ],
  templateUrl: './pokemon-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonCardComponent {
  public pokemon = input<Pokemon>();
}

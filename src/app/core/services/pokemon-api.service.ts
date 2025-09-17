import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { PokemonResponse, PokemonURLResponse } from '@core/models';
import { environment } from '@env/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PokemonApiService extends ApiService {
  private baseUrl = environment.baseUrl;

  public async getPokemons(limit: number, offset: number): Promise<PokemonResponse> {
    return await this.request<PokemonResponse>(
      `${this.baseUrl}/pokemon?limit=${limit}&offset=${offset}`,
      { method: 'GET' }
    );
  }

  public async getPokemonByUrl(url: string): Promise<PokemonURLResponse> {
    return await this.request<PokemonURLResponse>(url, { method: 'GET' });
  }
}

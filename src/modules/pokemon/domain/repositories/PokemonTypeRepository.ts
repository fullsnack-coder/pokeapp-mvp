export interface PokemonTypeRepository {
  getPokemonTypes(): Promise<string[]>;
}

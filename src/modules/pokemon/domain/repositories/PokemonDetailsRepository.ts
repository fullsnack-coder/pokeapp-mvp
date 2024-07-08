import { PokemonDetails } from "../models";

export interface PokemonDetailsRepository {
  getPokemonDetails(name: string): Promise<PokemonDetails>;
}

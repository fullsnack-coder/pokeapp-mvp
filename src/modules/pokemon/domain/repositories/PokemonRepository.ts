import { PokemonDetails } from "../models";
import { Pokemon } from "../models/Pokemon";

export interface PokemonRepository {
  getByName(name: string): Promise<PokemonDetails>;
  getPokemons(page: number, size: number): Promise<Pokemon[]>;
  getByType(type: string, page: number, size: number): Promise<Pokemon[]>;
  getPokemonDetails(name: string): Promise<PokemonDetails>;
}

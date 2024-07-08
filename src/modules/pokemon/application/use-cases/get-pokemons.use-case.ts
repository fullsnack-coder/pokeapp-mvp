import { PokemonRepository } from "../../domain/repositories";

export const GetPokemons = async (pokemonRepository: PokemonRepository) => {
  return {
    run: async (page: number, size: number) => {
      return await pokemonRepository.getPokemons(page, size);
    },
  };
};

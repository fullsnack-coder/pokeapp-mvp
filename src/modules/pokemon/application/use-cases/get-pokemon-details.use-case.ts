import { PokemonDetailsRepository } from "../../domain/repositories";

export const GetPokemonDetails = async (
  pokemonDetailsRepository: PokemonDetailsRepository
) => {
  return {
    run: async (pokemonName: string) => {
      return await pokemonDetailsRepository.getPokemonDetails(pokemonName);
    },
  };
};

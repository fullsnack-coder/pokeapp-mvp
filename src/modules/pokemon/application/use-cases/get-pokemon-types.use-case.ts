import { PokemonTypeRepository } from "../../domain/repositories";

export const GetPokemonTypes = (
  pokemonTypeRepository: PokemonTypeRepository
) => {
  return {
    run: async () => {
      return await pokemonTypeRepository.getPokemonTypes();
    },
  };
};

import { PokemonRepository } from "../domain/repositories";

export const GetPokemonsByType = async (
  pokemonRepository: PokemonRepository
) => {
  return {
    run: async (type: string, page: number, size: number) => {
      return await pokemonRepository.getByType(type, page, size);
    },
  };
};

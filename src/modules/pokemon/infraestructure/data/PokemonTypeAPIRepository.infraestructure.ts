import { PokemonTypeRepository } from "../../domain/repositories";
import PokeAPIService from "../../services/PokeAPIService";

const pokeAPIService = new PokeAPIService();

const createPokemonTypeAPIRepository: () => PokemonTypeRepository = () => {
  return {
    getPokemonTypes: pokeAPIService.getPokemonTypes,
  };
};

export default createPokemonTypeAPIRepository;

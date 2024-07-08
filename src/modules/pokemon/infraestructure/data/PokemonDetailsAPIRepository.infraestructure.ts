import { PokemonDetailsRepository } from "../../domain/repositories";
import PokeAPIService from "../../services/PokeAPIService";

const pokeAPIService = new PokeAPIService();

const createPokemonDetailsAPIRepository: () => PokemonDetailsRepository =
  () => {
    return {
      getPokemonDetails: pokeAPIService.getPokemonDetails,
    };
  };

export default createPokemonDetailsAPIRepository;

import { PokemonRepository } from "../../domain/repositories";
import PokeAPIService from "../../services/PokeAPIService";

const pokeAPIService = new PokeAPIService();

const createPokemonAPIRepository: () => PokemonRepository = () => {
  return {
    getPokemonDetails: pokeAPIService.getPokemonDetails,
    getByName: pokeAPIService.getByName,
    getByType: pokeAPIService.getPokemonByType,
    getPokemons: pokeAPIService.getPokemons,
  };
};

export default createPokemonAPIRepository;

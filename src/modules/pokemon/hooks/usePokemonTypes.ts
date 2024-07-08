import { useQuery } from "react-query";
import createPokemonTypeAPIRepository from "../infraestructure/data/PokemonTypeAPIRepository.infraestructure";

const QUERY_KEY = "pokemon-types";
const pokemonTypeRepository = createPokemonTypeAPIRepository();

const usePokemonTypes = () => {
  const { isLoading: isLoadingTypes, data: pokemonTypes = [] } = useQuery(
    [QUERY_KEY],
    pokemonTypeRepository.getPokemonTypes
  );

  return {
    isLoadingTypes,
    pokemonTypes,
  };
};

usePokemonTypes.QUERY_KEY = QUERY_KEY;

export default usePokemonTypes;

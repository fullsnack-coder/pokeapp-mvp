import PokeAPIService from "@/modules/pokemon/services/PokeAPIService";
import { useQuery } from "react-query";

const QUERY_KEY = "pokemon-types";
const pokeAPIService = new PokeAPIService();

const usePokemonTypes = () => {
  const { isLoading: isLoadingTypes, data: pokemonTypes = [] } = useQuery(
    [QUERY_KEY],
    pokeAPIService.getPokemonTypes
  );

  return {
    isLoadingTypes,
    pokemonTypes,
  };
};

usePokemonTypes.QUERY_KEY = QUERY_KEY;

export default usePokemonTypes;

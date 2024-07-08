import PokeAPIService from "@/modules/pokemon/services/PokeAPIService";
import { useCallback } from "react";
import { useQuery, useQueryClient } from "react-query";

const QUERY_KEY = "pokemon-details";
const pokeAPIService = new PokeAPIService();

const usePokemonDetails = (pokemonName: string) => {
  const queryClient = useQueryClient();

  const {
    isLoading: isLoadingPokemonDetails,
    data: pokemonDetails,
    isError,
  } = useQuery(
    [QUERY_KEY, pokemonName],
    () => pokeAPIService.getByName(pokemonName),
    {
      enabled: !!pokemonName,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 1,
      onError: (error) => {
        console.error("Error on usePokemonDetails", error);
      },
    }
  );

  const clearSearch = useCallback(() => {
    queryClient.invalidateQueries([QUERY_KEY]);
  }, [queryClient]);

  return {
    clearSearch,
    isLoadingPokemonDetails,
    pokemonDetails,
    isError,
  };
};

usePokemonDetails.QUERY_KEY = QUERY_KEY;

export default usePokemonDetails;

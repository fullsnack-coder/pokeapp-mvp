import PokeAPIService from "@/services/PokeAPIService";
import { useInfiniteQuery } from "react-query";

const QUERY_KEY = "pokemons-by-type";

const pokeAPIService = new PokeAPIService();

const usePokemonsByType = (type = "") => {
  const {
    data: pokemonsByType,
    isLoading: isLoadingPokemonsByType,
    fetchNextPage: fetchNextPagePokemonsByType,
    isFetchingNextPage,
  } = useInfiniteQuery(
    [QUERY_KEY, type],
    ({ pageParam = 1 }) => pokeAPIService.getPokemonByType(type, pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        const lastPageLength = lastPage.length;
        if (lastPageLength < 10) return undefined;
        return allPages.length + 1;
      },
      keepPreviousData: true,
      cacheTime: 24 * 60 * 60 * 1000, // 24 hours
      refetchOnMount: false,
      enabled: !!type,
    }
  );

  const flattedPokemons = pokemonsByType?.pages.flatMap((page) => page);

  return {
    pokemonsByType: flattedPokemons || [],
    isLoadingPokemonsByType,
    isFetchingNextPage,
    fetchNextPagePokemonsByType,
  };
};

usePokemonsByType.QUERY_KEY = QUERY_KEY;

export default usePokemonsByType;

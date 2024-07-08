import { useInfiniteQuery } from "react-query";
import createPokemonAPIRepository from "../infraestructure/data/PokemonAPIRepository.infraestructure";
import { DEFAULT_PAGE_SIZE } from "@/modules/shared/constants";

const QUERY_KEY = "pokemons-by-type";

const pokemonRepository = createPokemonAPIRepository();

const usePokemonsByType = (type = "") => {
  const {
    data: pokemonsByType,
    isLoading: isLoadingPokemonsByType,
    fetchNextPage: fetchNextPagePokemonsByType,
    isFetchingNextPage,
  } = useInfiniteQuery(
    [QUERY_KEY, type],
    ({ pageParam = 1 }) =>
      pokemonRepository.getByType(type, pageParam, DEFAULT_PAGE_SIZE),
    {
      getNextPageParam: (lastPage, allPages) => {
        const lastPageLength = lastPage.length;
        if (lastPageLength < 10) return undefined;
        return allPages.length + 1;
      },
      keepPreviousData: true,
      cacheTime: 24 * 60 * 60 * 1000, // 24 hours
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
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

import { DEFAULT_PAGE_SIZE, MAX_PAGINATIONS } from "@/modules/shared/constants";
import { useInfiniteQuery } from "react-query";
import createPokemonAPIRepository from "../infraestructure/data/PokemonAPIRepository.infraestructure";

const QUERY_KEY = "pokemons";

const pokemonRepository = createPokemonAPIRepository();

type UsePokemonsFilters = {
  typeId?: number;
  typeName?: string;
};

const usePokemons = ({ typeId, typeName }: UsePokemonsFilters) => {
  const {
    isLoading,
    data: pokemons,
    isFetchingNextPage,
    fetchNextPage,
    isFetching,
    hasNextPage,
  } = useInfiniteQuery(
    [QUERY_KEY, typeId || "", typeName || ""],
    ({ pageParam }) => {
      if (!!typeName)
        return pokemonRepository.getByType(
          typeName,
          pageParam,
          DEFAULT_PAGE_SIZE
        );

      return pokemonRepository.getPokemons(pageParam, DEFAULT_PAGE_SIZE);
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        const lastPageLength = lastPage.length;
        if (allPages.length === MAX_PAGINATIONS) return undefined;
        if (lastPageLength < DEFAULT_PAGE_SIZE) return undefined;
        return allPages.length + 1;
      },
      keepPreviousData: true,
      cacheTime: 24 * 60 * 60 * 1000, // 24 hours
      refetchOnMount: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );

  const flattedPokemons = pokemons?.pages?.flatMap((page) => page) || [];

  return {
    pokemons: flattedPokemons,
    isLoadingPokemons: isLoading || (isFetching && !isFetchingNextPage),
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  };
};

usePokemons.QUERY_KEY = QUERY_KEY;

export default usePokemons;

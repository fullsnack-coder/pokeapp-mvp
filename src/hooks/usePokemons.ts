import PokeAPIService from "@/services/PokeAPIService"
import { useInfiniteQuery } from "react-query"

const QUERY_KEY = "pokemons"

const pokeAPIService = new PokeAPIService()

type UsePokemonsFilters = {
  typeId?: number
  typeName?: string
}

const usePokemons = ({ typeId, typeName }: UsePokemonsFilters) => {
  const {
    data: pokemons,
    isLoading: isLoadingPokemons,
    fetchNextPage,
  } = useInfiniteQuery(
    [QUERY_KEY, typeId || "", typeName || ""],
    ({ pageParam }) => {
      if (!!typeName) return pokeAPIService.getPokemonByType(typeName)
      return pokeAPIService.getPokemons(pageParam, 10)
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        const lastPokemon = lastPage[lastPage.length - 1]
        const lastPokemonIndex = allPages
          .flatMap((page) => page)
          .findIndex((pokemon) => pokemon.name === lastPokemon.name)
        return lastPokemonIndex === -1 ? undefined : lastPokemonIndex + 1
      },
      keepPreviousData: true,
    }
  )

  return {
    pokemons,
    isLoadingPokemons,
    fetchNextPage,
  }
}

usePokemons.QUERY_KEY = QUERY_KEY

export default usePokemons

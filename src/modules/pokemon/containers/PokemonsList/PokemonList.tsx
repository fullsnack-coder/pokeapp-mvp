import usePokemons from "@/modules/pokemon/hooks/usePokemons";
import InfinitePaginatedList from "@/modules/shared/components/InfinitePaginatedList";
import Link from "next/link";
import PokemonItem from "./PokemonItem";
import { Pokemon } from "../../domain/models";

type Props = {
  pokemonType?: string;
};

const PokemonList: React.FC<Props> = ({ pokemonType }) => {
  const {
    isLoadingPokemons,
    pokemons,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = usePokemons({
    typeName: pokemonType,
  });

  return (
    <div>
      <header className="py-8 md:py-12">
        <h1 className="text-center font-bold px-4  text-2xl underline">
          {pokemonType ? `Pokemons of type ${pokemonType}` : "All Pokemons"}
        </h1>
      </header>
      <InfinitePaginatedList
        hasMore={!!hasNextPage}
        isLoadingContent={isLoadingPokemons}
        isLoadingMore={isFetchingNextPage}
        loadMore={fetchNextPage}
        listProps={{
          emptyState: <div className="text-center">No pokemons to show</div>,
          direction: "row",
          items: pokemons,
          renderItem: (pokemon: Pokemon) => (
            <Link
              key={pokemon.name}
              href={`/pokemons/${pokemon.name}`}
              className="w-[45%] md:w-[33%] lg:w-[24.4%]"
            >
              <PokemonItem pokemonInfo={pokemon} />
            </Link>
          ),
          wrapperProps: {
            style: {
              justifyContent: "center",
              flexWrap: "wrap",
            },
          },
        }}
      />
    </div>
  );
};

export default PokemonList;

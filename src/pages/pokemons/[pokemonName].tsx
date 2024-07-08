import PokemonStatsTable from "@/modules/pokemon/containers/PokemonStatsTable";
import { PokemonDetails } from "@/modules/pokemon/domain/models";
import PokeAPIService from "@/modules/pokemon/services/PokeAPIService";
import { useBackgroundTypeColorContext } from "@/modules/shared/context/background-type-color";
import AppLayout from "@/modules/shared/layouts/AppLayout";
import { GetStaticProps, NextPage } from "next";
import { useEffect, useMemo } from "react";

type Props = {
  pokemon: PokemonDetails;
};

export const getStaticPaths = async () => {
  const pokeAPIService = new PokeAPIService();
  const pokemons = await pokeAPIService.getPokemons();

  return {
    paths: pokemons.map((pokemon) => ({
      params: {
        pokemonName: pokemon.name,
      },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({
  params = {},
}) => {
  try {
    const pokeAPIService = new PokeAPIService();

    if (!params.pokemonName || Array.isArray(params.pokemonName))
      throw new Error("Pokemon not found");

    const details = await pokeAPIService.getPokemonDetails(params.pokemonName);

    return {
      props: {
        pokemon: details,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
};

const PokemonDetailsPage: NextPage<Props> = ({ pokemon }) => {
  const { setTypeColor } = useBackgroundTypeColorContext();

  const firstType = useMemo(() => {
    return pokemon.types[0].name;
  }, [pokemon.types]);

  useEffect(() => {
    setTypeColor(firstType);
  }, [setTypeColor, firstType]);

  return (
    <AppLayout title={`${pokemon.name} | Pokemon App`}>
      <section className="text-center">
        <h1 className="uppercase font-bold text-3xl">{pokemon.name}</h1>
        <picture className="aspect-square w-[120px] md:w-[200px] mx-auto block py-3">
          <img
            className="w-full h-full object-contain"
            src={pokemon.sprites.default.front}
            alt={pokemon.name}
          />
        </picture>
        <main>
          <div className="relative overflow-x-auto max-w-[600px] mx-auto">
            <PokemonStatsTable pokemonInfo={pokemon} />
          </div>
        </main>
      </section>
    </AppLayout>
  );
};

export default PokemonDetailsPage;

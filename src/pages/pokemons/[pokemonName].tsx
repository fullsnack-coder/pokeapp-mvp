import { useBackgroundTypeColorContext } from "@/context/background-type-color";
import AppLayout from "@/layouts/AppLayout";
import PokeAPIService, { PokemonDetails } from "@/services/PokeAPIService";
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
  const moves = pokemon.moves.map((move) => move.name).join(", ");
  const types = pokemon.types.map((type) => type.name).join(", ");

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
            <table className="w-full text-sm text-left text-gray-500 rounded-2xl overflow-hidden">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <td scope="col" className="px-6 py-3">
                    Property Name
                  </td>
                  <td scope="col" className="px-6 py-3">
                    Value
                  </td>
                </tr>
              </thead>
              <tbody>
                {Object.entries(pokemon).map(([key, value]) => {
                  return (
                    <tr key={key} className="bg-white border-b">
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900"
                      >
                        {key}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-900">
                          {key === "sprites" ? (
                            <div className="flex gap-2">
                              <picture>
                                <img
                                  aria-label={pokemon.name}
                                  src={pokemon.sprites.shiny.front}
                                  alt={pokemon.name}
                                />
                              </picture>
                              <picture>
                                <img
                                  aria-label={pokemon.name}
                                  src={pokemon.sprites.artwork}
                                  alt={pokemon.name}
                                  className="w-[100px] h-[100px] object-contain"
                                />
                              </picture>
                            </div>
                          ) : key === "cries" ? (
                            <div className="flex gap-2">
                              <audio controls>
                                <source
                                  src={value as string}
                                  type="audio/ogg"
                                />
                                Your browser does not support the audio element.
                              </audio>
                            </div>
                          ) : key === "moves" ? (
                            moves
                          ) : key === "types" ? (
                            types
                          ) : (
                            (value as string)
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </main>
      </section>
    </AppLayout>
  );
};

export default PokemonDetailsPage;

import { DEFAULT_PAGE_SIZE } from "@/contants";
import { PokemonDetailsResponse } from "@/services/PokeAPIService";
import axios, { AxiosError } from "axios";
import { NextApiHandler } from "next";

type PokemonByTypeResponse = {
  pokemon: Array<{
    pokemon: { name: string; url: string };
  }>;
};

const handler: NextApiHandler = async (req, res) => {
  try {
    const { type, offset = 0, limit = DEFAULT_PAGE_SIZE } = req.query;

    const url = new URL(`https://pokeapi.co/api/v2/type/${type}`);

    if (!!offset) url.searchParams.append("offset", `${offset}`);
    if (!!limit) url.searchParams.append("limit", `${limit}`);
    const { data, status } = await axios.get<PokemonByTypeResponse>(
      url.toString()
    );

    const { pokemon } = data;

    const slicedPokemons = pokemon.slice(
      Number(offset),
      Number(limit) + Number(offset)
    );

    const getDetailsPromises = slicedPokemons.map(({ pokemon: poke }) => {
      return axios.get<PokemonDetailsResponse>(poke.url);
    });

    const pokemonDetails = await Promise.all(getDetailsPromises);

    const sprites = pokemonDetails.map(
      ({ data }) => data.sprites.front_default
    );

    return res.status(status).json({
      pokemon: slicedPokemons.map((poke, index) => ({
        ...poke,
        image: sprites[index],
      })),
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error);
      return res
        .status(error.response?.status || 500)
        .json(error.response?.data);
    }

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};

export default handler;

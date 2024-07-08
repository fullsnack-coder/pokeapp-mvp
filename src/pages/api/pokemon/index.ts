import { DEFAULT_PAGE_SIZE } from "@/modules/shared/constants";
import { PokemonResponse } from "@/modules/pokemon/services/PokeAPIService";
import axios, { AxiosError } from "axios";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  try {
    const { limit = DEFAULT_PAGE_SIZE, offset = 0 } = req.query;

    const { data, status } = await axios.get<PokemonResponse>(
      "https://pokeapi.co/api/v2/pokemon?limit=" + limit + "&offset=" + offset
    );

    const spritesPromises = data.results.map((poke) => {
      return axios.get(poke.url);
    });

    const sprites = await Promise.all(spritesPromises);

    return res.status(status).json({
      pokemons: data.results.map((poke, index) => ({
        ...poke,
        image: sprites[index].data.sprites.front_default,
      })),
    });
  } catch (error) {
    if (error instanceof AxiosError) {
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

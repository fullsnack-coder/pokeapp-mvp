import { DEFAULT_PAGE_SIZE } from "@/modules/shared/constants";
import axios from "axios";

export type Pokemon = {
  name: string;
  url: string;
  sprites?: {
    front: string;
  };
};

export type PokemonDetailsResponse = {
  id: number;
  weight: number;
  height: number;
  types: Array<{
    type: {
      name: string;
      url: string;
    };
  }>;
  name: string;
  sprites: {
    front_default: string;
    other: {
      "official-artwork": {
        front_default: string;
        front_shiny: string;
      };
      showdown: {
        front_default: string;
        front_shiny: string;
      };
    };
  };
  moves: Array<{ move: { name: string; url: string } }>;
  cries: {
    latest: string;
    legacy: string;
  };
};

export type PokemonDetails = {
  name: string;
  pokedexId: number;
  cries: string;
  height: number;
  weight: number;
  types: Array<{ name: string; url: string }>;
  moves: Array<{ name: string }>;
  sprites: {
    artwork: string;
    default: { front: string };
    shiny: { front: string };
  };
};

export type PokemonResponse = {
  results: {
    name: string;
    url: string;
    image: string;
  }[];
};

type PokemonByTypeResponse = {
  pokemon: Array<{ pokemon: { name: string; url: string }; image: string }>;
};

type TypesResponse = {
  results: {
    name: string;
    url: string;
  }[];
};

class PokeAPIService {
  private baseURL: URL;
  constructor() {
    if (typeof window === "undefined") {
      this.baseURL = new URL("http://127.0.0.1:3000/api/pokemon");
    } else {
      this.baseURL = new URL("http://localhost:3000/api/pokemon");
    }
    this.getPokemons = this.getPokemons.bind(this);
    this.getPokemonTypes = this.getPokemonTypes.bind(this);
    this.getPokemonDetails = this.getPokemonDetails.bind(this);
    this.getPokemonByType = this.getPokemonByType.bind(this);
  }

  async getByName(name: string): Promise<PokemonDetails> {
    const details = await this.getPokemonDetails(name);
    return details;
  }

  async getPokemons(page = 1, size = 10): Promise<Pokemon[]> {
    const url = new URL(`${this.baseURL}/`);
    if (!!page) url.searchParams.append("offset", `${(page - 1) * size}`);
    if (!!size) url.searchParams.append("limit", `${size}`);
    const { data: { pokemons = [] } = {} } = await axios.get<{
      pokemons: PokemonResponse["results"];
    }>(url.toString());

    return pokemons.map((pokemon) => {
      return {
        name: pokemon.name,
        url: pokemon.url,
        sprites: {
          front: pokemon.image,
        },
      };
    });
  }

  async getPokemonTypes(): Promise<string[]> {
    const url = new URL(`${this.baseURL}/types`);

    const { data } = await axios.get<TypesResponse>(url.toString());
    return data.results.map((type) => type.name);
  }

  async getPokemonDetails(name: string): Promise<PokemonDetails> {
    const { data } = await axios.get<PokemonDetailsResponse>(
      `${this.baseURL}/${name}`
    );

    return {
      name: data.name,
      pokedexId: data.id,
      cries: data.cries.latest,
      types: data.types.map((type) => type.type),
      moves: data.moves.map((move) => move.move),
      height: data.height,
      weight: data.weight,
      sprites: {
        artwork: data.sprites.other["official-artwork"].front_default,
        default: { front: data.sprites.other.showdown.front_default },
        shiny: { front: data.sprites.other.showdown.front_shiny },
      },
    };
  }

  async getPokemonByType(
    type: string,
    page = 1,
    size = DEFAULT_PAGE_SIZE
  ): Promise<Pokemon[]> {
    const url = new URL(`${this.baseURL}/by-type?type=${type}`);
    if (!!page) url.searchParams.append("offset", `${(page - 1) * size}`);
    if (!!size) url.searchParams.append("limit", `${size}`);
    const { data } = await axios.get<PokemonByTypeResponse>(url.toString());
    return data.pokemon.map(({ pokemon, image }) => {
      return {
        name: pokemon.name,
        url: pokemon.url,
        sprites: {
          front: image,
        },
      };
    });
  }
}

export default PokeAPIService;

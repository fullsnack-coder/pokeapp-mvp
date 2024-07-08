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

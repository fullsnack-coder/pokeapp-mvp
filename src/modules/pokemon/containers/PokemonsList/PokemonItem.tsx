import { Pokemon } from "@/modules/pokemon/services/PokeAPIService";
import { memo, NamedExoticComponent } from "react";

type Props = {
  pokemonInfo: Pokemon;
};

const PokemonItem: NamedExoticComponent<Props> = memo(
  ({ pokemonInfo }) => {
    return (
      <div className="border p-3 rounded-xl md:hover:-translate-y-1 transition-transform">
        <p className="font-weight text-sm text-center w-full">
          {pokemonInfo.name}
        </p>
        <picture>
          <img
            src={pokemonInfo.sprites?.front}
            alt={pokemonInfo.name}
            className="w-full h-[200px] object-contain"
          />
        </picture>
      </div>
    );
  },
  (prevProps, nextProps) =>
    prevProps.pokemonInfo.name === nextProps.pokemonInfo.name
);

PokemonItem.displayName = "PokemonItem";

export default PokemonItem;

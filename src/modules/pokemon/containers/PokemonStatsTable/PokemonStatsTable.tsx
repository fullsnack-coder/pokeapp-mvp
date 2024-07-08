import { PokemonDetails } from "../../domain/models";

type Props = {
  pokemonInfo: PokemonDetails;
};

const PokemonStatsTable: React.FC<Props> = ({ pokemonInfo: pokemon }) => {
  const moves = pokemon.moves.map((move) => move.name).join(", ");
  const types = pokemon.types.map((type) => type.name).join(", ");

  return (
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
              <td scope="row" className="px-6 py-4 font-medium text-gray-900">
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
                        <source src={value as string} type="audio/ogg" />
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
  );
};

export default PokemonStatsTable;

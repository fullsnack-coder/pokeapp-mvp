import usePokemonDetails from "@/modules/pokemon/hooks/usePokemonDetails";
import Icon from "@/modules/shared/components/Icon";
import { useCallback, useRef, useState } from "react";
import SearchResult from "./SearchResult";

const PokemonSearch: React.FC = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [nameFilter, setNameFilter] = useState<string>("");
  const { isLoadingPokemonDetails, pokemonDetails, isError } =
    usePokemonDetails(nameFilter);

  const handleSubmitSearch = useCallback((event: React.FormEvent) => {
    event.preventDefault();
    setNameFilter(searchInputRef.current?.value || "");
  }, []);

  const handleChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value === "") {
        setNameFilter("");
      }
    },
    []
  );

  const isPending = isLoadingPokemonDetails && !!nameFilter;
  const hasError = isError && !!nameFilter;

  return (
    <div className="flex flex-col mb-5 w-[90%] mx-auto gap-5">
      <form
        onSubmit={handleSubmitSearch}
        className="flex gap-2 justify-center px-3 w-full"
      >
        <input
          className="flex-1 p-3 rounded-2xl w-full min-w-[200px] md:min-w-[500px] lg:min-w-[700px] max-w-[400px] border border-gray-400 bg-transparent"
          ref={searchInputRef}
          type="text"
          placeholder="Type the pokemon name"
          onChange={handleChangeInput}
        />
        <button
          role="button"
          type="submit"
          className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 font-semibold"
        >
          Search
          <Icon name="magnify" />
        </button>
      </form>
      <div>
        {isPending ? (
          <div className="w-fit animate-spin mx-auto" data-testid="loader">
            <Icon name="loader" />
          </div>
        ) : hasError ? (
          <div>
            <p className="font-semibold">Pokemon not found</p>
          </div>
        ) : pokemonDetails ? (
          <div className="bg-white w-fit mx-auto">
            <SearchResult
              name={pokemonDetails.name}
              sprite={pokemonDetails.sprites.default.front}
              types={pokemonDetails.types.map((type) => type.name)}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PokemonSearch;

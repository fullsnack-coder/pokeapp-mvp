import usePokemonDetails from "@/hooks/usePokemonDetails";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import SearchResult from "./SearchResult";
import Icon from "../Icon";

const SearchBar: React.FC = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [nameFilter, setNameFilter] = useState<string>("");
  const { isLoadingPokemonDetails, pokemonDetails, isError } =
    usePokemonDetails(nameFilter);

  const handleSubmitSearch = useCallback((event: React.FormEvent) => {
    event.preventDefault();
    setNameFilter(searchInputRef.current?.value || "");
  }, []);

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
          onChange={(e) => {
            if (e.target.value === "") {
              setNameFilter("");
            }
          }}
        />
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 font-semibold"
        >
          Search
          <Icon name="magnify" />
        </button>
      </form>
      <div>
        {isLoadingPokemonDetails && !!nameFilter ? (
          <div className="w-fit animate-spin mx-auto">
            <Icon name="loader" />
          </div>
        ) : isError && !!nameFilter ? (
          <div>
            <p>Pokemon not found</p>
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

export default SearchBar;

import { renderHook, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { fakePokemons } from "./fixtures";
import usePokemonsByType from "../usePokemonsByType";

const mock = new MockAdapter(axios);

mock.onGet("http://localhost:3000/api/pokemon/by-type/rock").reply(200, {
  pokemons: fakePokemons,
});

const wrapper = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      {children}
    </QueryClientProvider>
  );
};

describe("UsePokemonsByType Hook", () => {
  it("should return isLoadingPokemons as true, next to false and pokemons as an array of pokemons", () => {
    const { result } = renderHook(() => usePokemonsByType("rock"), { wrapper });

    expect(result.current.isLoadingPokemonsByType).toBe(true);
    waitFor(() => expect(result.current.isLoadingPokemonsByType).toBe(false));
    waitFor(() => expect(result.current.pokemonsByType).toEqual(fakePokemons));
  });
});

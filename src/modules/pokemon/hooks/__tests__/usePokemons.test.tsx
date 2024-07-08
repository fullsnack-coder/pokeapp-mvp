import { renderHook, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import usePokemons from "../usePokemons";
import { fakePokemons } from "./fixtures";

const mock = new MockAdapter(axios);

mock.onGet("http://localhost:3000/api/pokemon").reply(200, {
  pokemons: fakePokemons,
});

const wrapper = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      {children}
    </QueryClientProvider>
  );
};

describe("UsePokemons Hook", () => {
  it("should return isLoadingPokemons as true, next to false and pokemons as an array of pokemons", () => {
    const { result } = renderHook(() => usePokemons({}), { wrapper });

    expect(result.current.isLoadingPokemons).toBe(true);
    waitFor(() => expect(result.current.isLoadingPokemons).toBe(false));
    waitFor(() => expect(result.current.pokemons).toEqual(fakePokemons));
  });
});

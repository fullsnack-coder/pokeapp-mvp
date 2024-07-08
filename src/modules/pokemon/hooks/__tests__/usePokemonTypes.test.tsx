import { renderHook, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import usePokemonTypes from "../usePokemonTypes";

const mock = new MockAdapter(axios);

mock.onGet("http://localhost:3000/api/pokemon/types").reply(200, {
  results: [{ name: "grass" }, { name: "fire" }, { name: "water" }],
});

const wrapper = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      {children}
    </QueryClientProvider>
  );
};

describe("UsePokemonTypes Hook", () => {
  it("should return isLoadingTypes as false and pokemonTypes as an array of strings", () => {
    const { result } = renderHook(() => usePokemonTypes(), { wrapper });

    expect(result.current.isLoadingTypes).toBe(true);
    waitFor(() => expect(result.current.isLoadingTypes).toBe(false));
    waitFor(() =>
      expect(result.current.pokemonTypes).toEqual(["grass", "fire", "water"])
    );
  });
});

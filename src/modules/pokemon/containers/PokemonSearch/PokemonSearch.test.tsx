import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PokemonSearch from "./PokemonSearch";
import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import * as ReactQuery from "react-query";

const wrapper = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      {children}
    </QueryClientProvider>
  );
};

describe("PokemonSearch Component", () => {
  test("renders input and search button", () => {
    render(<PokemonSearch />, { wrapper });
    expect(
      screen.getByPlaceholderText("Type the pokemon name")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });

  test("handles input change correctly", () => {
    render(<PokemonSearch />, { wrapper });
    const input = screen.getByPlaceholderText("Type the pokemon name");
    fireEvent.change(input, { target: { value: "Pikachu" } });
    expect(input).toHaveValue("Pikachu");
  });

  test("submits search correctly", async () => {
    jest.spyOn(ReactQuery, "useQuery").mockImplementation(
      jest.fn().mockReturnValue({
        data: {
          name: "Pikachu",
          pokedexId: 32,
          cries: "cries/url.mp3",
          height: 12,
          weight: 12,
          types: [{ name: "Electric" }],
          moves: [{ name: "Thunderbolt" }],
          sprites: {
            artwork: "artwork/url.png",
            default: { front: "default/url.png" },
            shiny: { front: "shiny/url.png" },
          },
        },
        isLoading: false,
        isSuccess: true,
      })
    );

    render(<PokemonSearch />, { wrapper });
    const input = screen.getByPlaceholderText("Type the pokemon name");
    const searchButton = screen.getByRole("button", { name: /search/i });

    fireEvent.change(input, { target: { value: "Pikachu" } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByLabelText("Pikachu")).toBeInTheDocument();
      expect(screen.getByLabelText("Types: Electric")).toBeInTheDocument();
    });
  });

  test("displays loader while loading", async () => {
    jest.spyOn(ReactQuery, "useQuery").mockImplementation(
      jest.fn().mockReturnValue({
        data: undefined,
        isLoading: true,
      })
    );

    render(<PokemonSearch />, { wrapper });
    fireEvent.change(screen.getByPlaceholderText("Type the pokemon name"), {
      target: { value: "Pikachu" },
    });

    fireEvent.click(screen.getByRole("button", { name: /search/i }));
    await waitFor(() =>
      expect(screen.getByTestId("loader")).toBeInTheDocument()
    );
  });

  test("displays error message when pokemon is not found", async () => {
    jest.spyOn(ReactQuery, "useQuery").mockImplementation(
      jest.fn().mockReturnValue({
        data: undefined,
        isLoading: false,
        isSuccess: false,
        isError: true,
      })
    );

    render(<PokemonSearch />, { wrapper });
    fireEvent.change(screen.getByPlaceholderText("Type the pokemon name"), {
      target: { value: "random-pokemon" },
    });

    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    await waitFor(() =>
      expect(screen.getByText("Pokemon not found")).toBeInTheDocument()
    );
  });
});

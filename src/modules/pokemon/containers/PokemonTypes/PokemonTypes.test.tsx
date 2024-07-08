import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import PokemonTypesList from "./TypeList";

jest.mock("@/modules/pokemon/hooks/usePokemonTypes", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    isLoadingTypes: false,
    pokemonTypes: ["grass", "fire", "water"],
  })),
}));

describe("PokemonTypesList Component", () => {
  test("renders header with correct title and instructions", () => {
    render(<PokemonTypesList onTapPokemonType={() => {}} />);
    expect(screen.getByText("Pokemon Types")).toBeInTheDocument();
    expect(
      screen.getByText("Click on a type to see all the pokemons of that type")
    ).toBeInTheDocument();
  });

  test("renders pokemon types chips correctly", () => {
    render(<PokemonTypesList onTapPokemonType={() => {}} />);
    const grassChip = screen.getByText("grass");
    const fireChip = screen.getByText("fire");
    const waterChip = screen.getByText("water");
    expect(grassChip).toBeInTheDocument();
    expect(fireChip).toBeInTheDocument();
    expect(waterChip).toBeInTheDocument();
  });

  test("calls onTapPokemonType when a type chip is clicked", () => {
    const mockOnTapPokemonType = jest.fn();
    render(<PokemonTypesList onTapPokemonType={mockOnTapPokemonType} />);
    const grassChip = screen.getByText("grass");
    fireEvent.click(grassChip);
    expect(mockOnTapPokemonType).toHaveBeenCalledWith("grass");
  });
});

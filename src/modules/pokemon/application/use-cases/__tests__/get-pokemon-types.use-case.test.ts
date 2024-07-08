import { GetPokemonTypes } from "../get-pokemon-types.use-case";

describe("GetPokemonTypesUseCase", () => {
  it("should return a list of pokemon types", async () => {
    const pokemonTypes = ["grass", "fire", "water"];

    const pokemonTypeRepository = {
      getPokemonTypes: jest.fn().mockResolvedValue(pokemonTypes),
    };

    const getPokemonTypes = GetPokemonTypes(pokemonTypeRepository);
    const result = await getPokemonTypes.run();

    expect(result).toEqual(pokemonTypes);
  });
});

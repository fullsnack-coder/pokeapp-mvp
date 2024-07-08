import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { fakeTypesReply } from "./fixtures";
import createPokemonTypeAPIRepository from "../PokemonTypeAPIRepository.infraestructure";

const mock = new MockAdapter(axios);

describe("PokemonTypeRepository__integration", () => {
  test("should return the pokemon types", async () => {
    mock
      .onGet("http://localhost:3000/api/pokemon/types")
      .reply(200, fakeTypesReply);

    const repository = createPokemonTypeAPIRepository();
    const types = await repository.getPokemonTypes();
    expect(types).toHaveLength(fakeTypesReply.results.length);
  });
});

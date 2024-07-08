import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { fakeReply } from "./fixtures";
import createPokemonDetailsAPIRepository from "../PokemonDetailsAPIRepository.infraestructure";

const mock = new MockAdapter(axios);

describe("PokemonDetailsAPIRepository__integration", () => {
  test("should return the pokemon details", async () => {
    mock
      .onGet("http://localhost:3000/api/pokemon/pikachu")
      .reply(200, fakeReply);

    const repository = createPokemonDetailsAPIRepository();
    const pokemon = await repository.getPokemonDetails(fakeReply.name);
    expect(pokemon).toHaveProperty("name", fakeReply.name);
  });
});

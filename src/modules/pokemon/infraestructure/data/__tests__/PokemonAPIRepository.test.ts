import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import createPokemonAPIRepository from "../PokemonAPIRepository.infraestructure";
import { fakeReply } from "./fixtures";

const mock = new MockAdapter(axios);

describe("PokemonAPIRepository__integration", () => {
  test("should return a pokemon", async () => {
    mock
      .onGet("http://localhost:3000/api/pokemon/pikachu")
      .reply(200, fakeReply);

    const repository = createPokemonAPIRepository();
    const pokemon = await repository.getByName(fakeReply.name);
    expect(pokemon).toHaveProperty("name", fakeReply.name);
  });
});

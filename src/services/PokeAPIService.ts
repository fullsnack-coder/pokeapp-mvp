import axios from "axios"

type Pokemon = {
  name: string
  url: string
  sprites?: {
    front: string
  }
}

type PokemonDetailsResponse = {
  name: string
  sprites: {
    other: {
      showdown: {
        front_default: string
      }
    }
    front_default: string
  }
}

type PokemonResponse = {
  results: {
    name: string
    url: string
  }[]
}

type TypesResponse = {
  results: {
    name: string
    url: string
  }[]
}

class PokeAPIService {
  private baseURL: URL
  constructor() {
    this.baseURL = new URL("https://pokeapi.co/api/v2")
    this.getPokemons = this.getPokemons.bind(this)
    this.getPokemonTypes = this.getPokemonTypes.bind(this)
    this.getPokemonDetails = this.getPokemonDetails.bind(this)
    this.getPokemonByType = this.getPokemonByType.bind(this)
  }

  async getPokemons(page = 1, size = 3): Promise<Pokemon[]> {
    const url = new URL(`${this.baseURL}/pokemon`)
    if (!!page) url.searchParams.append("offset", `${(page - 1) * size}`)
    if (!!size) url.searchParams.append("limit", `${size}`)
    const { data } = await axios.get<PokemonResponse>(url.toString())
    return data.results
  }

  async getPokemonTypes(): Promise<string[]> {
    const url = new URL(`${this.baseURL}/type`)

    const { data } = await axios.get<TypesResponse>(url.toString())
    return data.results.map((type) => type.name)
  }

  async getPokemonDetails(name: string): Promise<Pokemon> {
    const { data } = await axios.get<PokemonDetailsResponse>(
      `${this.baseURL}/pokemon/${name}`
    )
    return {
      name: data.name,
      url: "",
      sprites: {
        front: data.sprites.other.showdown.front_default,
      },
    }
  }

  async getPokemonByType(type: string, page = 1, size = 4): Promise<Pokemon[]> {
    const url = new URL(`${this.baseURL}/type`)
    if (!!page) url.searchParams.append("page", page + "")
    if (!!size) url.searchParams.append("size", size + "")
    const { data } = await axios.get<PokemonResponse>(
      `${this.baseURL}/type/${type}`
    )
    return data.results.map((pokemon) => pokemon)
  }
}

export default PokeAPIService

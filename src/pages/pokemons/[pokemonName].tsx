import PokeAPIService from "@/services/PokeAPIService"
import { GetStaticProps, NextPage } from "next"

type Props = {
  pokemon: {
    name: string
    sprites: {
      frontDefault?: string
    }
  }
}

export const getStaticPaths = async () => {
  const pokeAPIService = new PokeAPIService()
  const pokemons = await pokeAPIService.getPokemons()

  return {
    paths: [],
    fallback: "blocking",
  }
}

export const getStaticProps: GetStaticProps<Props> = async ({
  params = {},
}) => {
  try {
    const pokeAPIService = new PokeAPIService()

    if (!params.pokemonName || Array.isArray(params.pokemonName))
      throw new Error("Pokemon not found")
    const details = await pokeAPIService.getPokemonDetails(params.pokemonName)

    return {
      props: {
        pokemon: {
          name: details.name,
          sprites: {
            frontDefault: details.sprites?.front,
          },
        },
      },
      revalidate: 60,
    }
  } catch (error) {
    console.error(error)
    return {
      notFound: true,
    }
  }
}

const PokemonDetailsPage: NextPage<Props> = ({ pokemon }) => {
  return (
    <div>
      <h1>{pokemon.name}</h1>
      <picture>
        <img src={pokemon.sprites.frontDefault} alt={pokemon.name} />
      </picture>
    </div>
  )
}

export default PokemonDetailsPage

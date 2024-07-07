import TypeList from "@/components/PokemonTypes/TypeList"
import usePokemons from "@/hooks/usePokemons"
import { NextPage } from "next"
import { Inter } from "next/font/google"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

const inter = Inter({ subsets: ["latin"] })

const HomePage: NextPage = () => {
  const endOfContent = useRef<HTMLDivElement | null>(null)
  const [page, setPage] = useState<number>(1)
  const [currentType, setCurrentType] = useState("")
  const { isLoadingPokemons, pokemons, fetchNextPage } = usePokemons({
    typeName: currentType,
  })

  const flattedPokemons = pokemons?.pages?.flatMap((page) => page)

  const observer = useRef<IntersectionObserver | null>(
    typeof window === "undefined"
      ? null
      : new IntersectionObserver(
          (entries) => {
            const entry = entries[0]
            console.log(entry)

            if (entry.isIntersecting) {
              console.log("Intersecting!")
              setPage((page) => page + 1)
              fetchNextPage({ pageParam: page + 1 })
            }
          },
          {
            threshold: 0.5,
          }
        )
  )

  useEffect(() => {
    const currentObserver = observer.current
    if (currentObserver) {
      if (!isLoadingPokemons)
        currentObserver.observe(endOfContent.current as Element)
      return () => {
        currentObserver.disconnect()
      }
    }
  }, [isLoadingPokemons])

  return (
    <section className={`${inter.className}`}>
      <h1>Hello, pokimon!</h1>
      <TypeList
        onTapPokemonType={(type) => {
          setCurrentType(type)
        }}
      />
      {isLoadingPokemons ? (
        <p>Loading...</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {flattedPokemons?.map((pokemon) => (
            <Link
              key={pokemon.name}
              className="p-10"
              href={`/pokemons/${pokemon.name}`}
            >
              {pokemon.name}
            </Link>
          ))}
        </ul>
      )}
      <div ref={endOfContent} className="min-h-[40vh] w-full"></div>
    </section>
  )
}

export default HomePage

import TypeItem from "@/components/PokemonTypes/TypeItem"
import usePokemonTypes from "@/hooks/usePokemonTypes"
import { useCallback, useState } from "react"

type Props = {
  onTapPokemonType: (type: string) => void
}

const TypeList: React.FC<Props> = ({ onTapPokemonType }) => {
  const { isLoadingTypes, pokemonTypes } = usePokemonTypes()
  const [selectedType, setSelectedType] = useState<string | null>(null)

  const handleTapPokemonType = useCallback(
    (pokemonType: string) => () => {
      onTapPokemonType(pokemonType)
      setSelectedType((prevType) => {
        return pokemonType === prevType ? null : pokemonType
      })
    },
    [onTapPokemonType]
  )

  return (
    <div
      className="grid overflow-x-auto gap-4 no-scrollbar"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto, minmax(300px, 1fr))",
        gridTemplateRows: "repeat(2, 1fr)",
        gap: "1rem",
        gridAutoFlow: "column",
      }}
    >
      {isLoadingTypes ? (
        <p>Loading...</p>
      ) : (
        pokemonTypes.map((type) => (
          <button
            key={type}
            className={`p-2 border rounded-lg ${
              type === selectedType
                ? "bg-white text-black"
                : "bg-transparent text-white"
            }`}
            onClick={handleTapPokemonType(type)}
          >
            {type}
          </button>
        ))
      )}
    </div>
  )
}

export default TypeList

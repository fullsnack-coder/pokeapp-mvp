import usePokemonTypes from "@/modules/pokemon/hooks/usePokemonTypes";
import ItemList from "@/modules/shared/components/ItemList";
import ActivableChip from "@/modules/shared/components/ActivableChip";
import CollapsiblePanel from "@/modules/shared/components/CollapsiblePanel";
import { colorByType } from "@/modules/shared/utils/tools";
import { useCallback, useState } from "react";

type Props = {
  onTapPokemonType: (type: string) => void;
};

const PokemonTypesList: React.FC<Props> = ({ onTapPokemonType }) => {
  const { isLoadingTypes, pokemonTypes } = usePokemonTypes();
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleTapPokemonType = useCallback(
    (pokemonType: string) => () => {
      onTapPokemonType(pokemonType);
      setSelectedType((prevType) => {
        return pokemonType === prevType ? null : pokemonType;
      });
    },
    [onTapPokemonType]
  );

  return (
    <CollapsiblePanel title="Pokemon types">
      <ItemList
        items={pokemonTypes}
        isLoading={isLoadingTypes}
        direction="row"
        header={
          <div className="text-center px-4 mb-4">
            <h1 className="font-bold text-xl underline mb-2">Pokemon Types</h1>
            <h3 className="font-light">
              Click on a type to see all the pokemons of that type
            </h3>
          </div>
        }
        renderItem={(type: string) => (
          <ActivableChip
            key={type}
            isActive={type === selectedType}
            noSelected={!!selectedType && type !== selectedType}
            type={type}
            _buttonProps={{
              onClick: handleTapPokemonType(type),
              style: {
                backgroundColor:
                  type === selectedType
                    ? colorByType[type as keyof typeof colorByType] ||
                      colorByType["normal"]
                    : "transparent",
              },
            }}
          />
        )}
        wrapperProps={{
          style: {
            justifyContent: "center",
            gap: "1rem",
            flexWrap: "wrap",
          },
        }}
      />
    </CollapsiblePanel>
  );
};

export default PokemonTypesList;

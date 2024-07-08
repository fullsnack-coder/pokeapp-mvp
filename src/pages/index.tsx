import PokemonList from "@/modules/pokemon/components/PokemonsList";
import TypeList from "@/modules/pokemon/components/PokemonTypes";
import { useBackgroundTypeColorContext } from "@/modules/shared/context/background-type-color";
import AppLayout from "@/modules/shared/layouts/AppLayout";
import { NextPage } from "next";
import { useState } from "react";

const HomePage: NextPage = () => {
  const [currentType, setCurrentType] = useState("");
  const { setTypeColor } = useBackgroundTypeColorContext();

  return (
    <AppLayout title="Home | Pokemon App">
      <TypeList
        onTapPokemonType={(type) => {
          setTypeColor(type === currentType ? "" : type);
          setCurrentType((prevCurrentType) =>
            prevCurrentType === type ? "" : type
          );
        }}
      />
      <PokemonList pokemonType={currentType} />
    </AppLayout>
  );
};

export default HomePage;

import PokemonList from "@/components/Pokemons/PokemonList";
import TypeList from "@/components/PokemonTypes/TypeList";
import { useBackgroundTypeColorContext } from "@/context/background-type-color";
import AppLayout from "@/layouts/AppLayout";
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
